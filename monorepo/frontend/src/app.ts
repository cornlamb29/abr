import { autoinject } from 'aurelia-framework'
import { PLATFORM } from 'aurelia-pal'
import { EventAggregator } from 'aurelia-event-aggregator'
import { DataService } from './services/data-service'

@autoinject
export class App {
  public title = 'NOAA Fisheries Region'
  public activePage = window.location.pathname
    .replace('/region/', '').replace('-', ' ')
  public navItems
  public router

  constructor(private dataService: DataService, private ea: EventAggregator) { }

  // Handling navigation and routing.
  public async configureRouter(config, router) {
    config.title = 'NOAA Fisheries Region'

    config.options.pushState = true
    config.options.root = '/'
    config.map([
      {
        route: 'region/:name',
        moduleId: PLATFORM.moduleName('views/region-page/index'),
        isActive: window.location.pathname.replace('/region', '') === ':name'
      },
      {
        route: '',
        name: 'home',
        moduleId: PLATFORM.moduleName('views/home/index'),
        isActive: ['','/'].includes(window.location.pathname.replace('/region', ''))
      }
    ])

    // Catch all not found.
    config.mapUnknownRoutes({
      moduleId: PLATFORM.moduleName('views/not-found/index'),
      name: 'not-found'
    })

    this.router = router
  }

  //https://stackoverflow.com/questions/40765848/detect-change-to-router-isnavigating
  // When router is changing need to update what is new active page.
  attached () {
    this.activePage = window.location.pathname.replace('/region/', '').replace('-', ' ')
    this.ea.subscribe('router:navigation:processing', () => {
      this.activePage = window.location.pathname.replace('/region/', '').replace('-', ' ')
    });
  }

  async activate () {
    // Needed to set navigation by iterating through dat from gofish api call.
    try {
      return new Promise(async (resolve) => {
        this.navItems = await this.dataService.getData('gofish')
        resolve(this.navItems)
      })
    } catch (e) {
      console.error(e)
    }
  }
}
