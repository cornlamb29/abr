import { HttpClient } from 'aurelia-fetch-client'
import { autoinject } from 'aurelia-framework'

@autoinject
export class DataService {
  public data
  protected usedUri = {} // The key value pair that stores data by uri so we don't re-query.
  private apiKey: string = 'abrradiology'

  constructor(private httpClient: HttpClient) {
    this.httpClient.configure(config => {
      config
        .withBaseUrl('http://localhost:5001')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
          }
        })
    })
  }

  // function that takes array and groups regions and sets averages for calories and fat per serving
  private filterData(data: any) {
    return data.reduce((acc, row) => {
      // logic for grouping regions and calculating average for fat per serving and calories
      if (!acc.some(a => a.NOAAFisheriesRegion === row.NOAAFisheriesRegion)) {
        // initializing region object
        row.fishes = [row]
        row.total = 1
        row.CaloriesTotal = Number(row.Calories)
        row.CaloriesAvg = Number(row.Calories)
        row.FatGrandTotal = row.FatTotal ? Number(row.FatTotal.replace(' g', '')) : 0
        row.FatAvg = Number(row.FatTotal.replace(' g', ''))

        acc.push(row)
      } else {
        acc = acc.map(a => {
          if (row && a.NOAAFisheriesRegion === row.NOAAFisheriesRegion) {
            a.fishes.push(row)
            a.total += 1
            a.CaloriesTotal += Number(row.Calories)
            a.FatGrandTotal += row.FatTotal ? Number(row.FatTotal.replace(' g', '')) : 0

            a.FatAvg = parseFloat((a.FatGrandTotal / a.total).toFixed(2))
            a.CaloriesAvg = parseFloat((a.CaloriesTotal / a.total).toFixed(2))

          }
          return a
        })
      }

      return acc
    }, [])
  }

  // has singleton functionality would need to bust cache probably by appending timestamp to endpoint
  // ex: this.dataService.getData('endpoint?' + Math.floor(Date.now() / 1000))
  public async getData(endpoint: string): Promise<any> {
    try {
      // singleton functionality to stop unnecessary re-fetching of data
      if (this.usedUri[endpoint]) {
        return this.usedUri[endpoint]
      }
      const urlParams = new URLSearchParams()
      urlParams.append('apikey', this.apiKey)

      // if endpoint already has a query string need to use & instead
      const operator = endpoint.includes('?') ? '&' : '?'
      const uri = `/${endpoint}${operator}${urlParams.toString()}`
      const response = await this.httpClient.get(uri)

      this.usedUri[endpoint] = this.filterData(await response.json())
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return this.usedUri[endpoint]
    } catch (e) {
      console.error('Error fetching data:', e)
      throw e
    }
  }
}
//class="${window.location.pathname === `/region/${nav.NOAAFisheriesRegion.toLowerCase().replace(' ', '-')}`}"
