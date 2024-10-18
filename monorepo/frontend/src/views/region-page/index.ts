import { autoinject } from 'aurelia-framework'
import { DataService } from '../../services/data-service'

@autoinject
export class RegionPage {
  public title: string
  public data

  constructor(private dataService: DataService) { }

  async activate(params): Promise<void> {
    try {
      const { name } = params
      const apiData = await this.dataService.getData('gofish')

      // From the array of data from api make sure to get the row we want based on :region param in url.
      this.data = apiData.find(f =>
        f.NOAAFisheriesRegion.toLowerCase().replace(' ', '-') === name
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
