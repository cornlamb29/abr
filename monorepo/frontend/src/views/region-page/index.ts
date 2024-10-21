import { autoinject } from 'aurelia-framework'
import { DataService } from '../../services/data-service'

@autoinject
export class RegionPage {
  public title: string
  public data
  public totalCaloriesAvg // Grand total calories average of all fish.
  public caloriesAvgDelta // Difference from average
  public totalFatAvg // Grand total fat average of all fish
  public fatAvgDelta // Difference from average


  constructor(private dataService: DataService) { }

  async activate(params): Promise<void> {
    try {
      const { name } = params
      const apiData = await this.dataService.getData('gofish')

      // From the array of data from api make sure to get the row we want based on :region param in url.
      this.data = apiData.find(f =>
        f.NOAAFisheriesRegion.toLowerCase().replace(' ', '-') === name
      )

      const totalAvg = apiData.reduce((acc, row) => {
        acc.calAvg += Number(row.CaloriesAvg)
        acc.fatAvg += Number(row.FatAvg)
        return acc
      }, {calAvg:0, fatAvg:0})

      this.totalCaloriesAvg = parseFloat(
        (totalAvg.calAvg / apiData.length).toFixed(2)
      )
      this.totalFatAvg = parseFloat(
        (totalAvg.fatAvg / apiData.length).toFixed(2)
      )

      this.caloriesAvgDelta = parseFloat(
        (this.totalCaloriesAvg - this.data.CaloriesAvg).toFixed(2)
      )
      this.fatAvgDelta = parseFloat(
        (this.totalFatAvg - this.data.FatAvg).toFixed(2)
      )

      if (this.data) {
        this.title = this.data.NOAAFisheriesRegion
      }
    } catch (e) {
      console.error('Error:',e)
      throw e
    }
  }
}
