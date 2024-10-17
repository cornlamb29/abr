import { autoinject } from 'aurelia-framework'
import { DataService } from '../../services/data-service'

@autoinject
export class Home {
  public title: string = 'Home Page'
  public data: any

  constructor(private dataService: DataService) { }

  public async activate(): Promise<void> {
    try {
      // Getting data to populate table with region info.
      this.data = await this.dataService.getData('gofish')
    } catch (e) {
      console.log('Error:', e)
      throw e
    }
  }
}
