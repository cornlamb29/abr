# ABR Project

This project contains in monorepo `coding-challenge-server` and `frontend` directories that contain backend and frontend services for this application.  

The backend service is an api with one single endpoint `gofish` that returns information about fish nutritional facts and regions these fish reside.  To successfully receive a response the api expects an api key of `abrradiology` to be passed to query string (ex http://localhost:5001/gofish?apikey=abrradiology)

The frontend service is using Aurelia with Typescript.  When executed the page should be served up at this location `http://localhost:8080/`

## Start project

To start project execute the base script below (after starting services make sure to go http://localhost:8080/)
```bash
bash start-services.sh
```
_Also take not the script assumes that ports 5001 and 8080 are not in use if they are the script will fail_

## Notes

* if ports 5001 or 8080 are in use on your machine the following command can kill those processes
```bash
lsof -t -i:5001 | xargs kill -9
```
```bash
lsof -t -i:8080 | xargs kill -9
```
* This project was only tested using current stable version of node `18.19.0`. `nvm use stable` assuming nvm is installed on machine

## Follow up Questions and Comments
- Better cache busting logic for data-service I am using a singleton to not repeat api calls.  Maybe a global data store in Aurelia ecosystem is a better route.
- Is there away to catch errors and redirect to server error (oops page)
- How to use navigation class.active bind attribute to determine active page
- Not the best commenting could have adopted JSDoc syntax
- due to time constraint best practice would be to have wrote unit test
- due to time constraint not all variables and methods are not set with public, protected, private and interfaces or types could have been used for fish api call response

- what are generators and tasks in aurelia_project?
- what are some best practice use of aurelia I may be missing in my project
- what is a good source of use for resources configure function in src/resources/index.ts


- Need to understand full the lifecyle events in Aurelia.  I know activate is for before page render and when you return a promise it will suspend next step to lifecyle until finished.
  Attached gets called when view is already rendered
- Adding `coding-challenge-server` with submodules was not working for me.

