import { autoinject } from 'aurelia-framework'
import { DataService } from '../../services/data-service'

@autoinject
export class RegionPage {
  public title: string
  public data

  constructor(private dataService: DataService) { }

  async activate(params) {
    try {
      const { name } = params
      const apiData = await this.dataService.getData('gofish')

      // from the array of data from api make sure to get the row we want based on :region param in url
      this.data = apiData.find(f =>
        f.NOAAFisheriesRegion.toLowerCase().replace(' ', '-') === name
      )

      if (this.data) {
        this.title = this.data.NOAAFisheriesRegion
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
