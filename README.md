# Monolith and "Microlith"

Here are two examples of an extremely basic chat application one being a
"monolith" that doesn't scale horizontally and one taking a page from some
microservices inspired architecture. (The second one isn't truly, authentically,
organically, artisinal microservices but it gets the point across).

Check out [my blog](http://jkaufman.io/dismantling-the-monolith-talk/) page for
this example for more information.

## Monolith

To run:

    cd monolithic
    npm install
    npm start

This'll kick off a server listening on port 3000. Because this implementation
stores all long polling client requests in memory, this WILL NOT work when
scaled horizontally (which is the point of this demo).

To push to Bluemix:

  1. Create a [Bluemix](https://bluemix.net) account
  1. Provision and run a Node.js runtime
  1. In your terminal log in (`cf login`)
  1. In your terminal push this code from the monolithic directory `cf push <name of app>`

## "Microlith"

This app uses the
[MQ Light](https://console.ng.bluemix.net/docs/?cm_mc_uid=19073043234114400184441&cm_mc_sid_50200000=1456432609#services/MQLight/index.html#mqlight010)
service as a message bus between different clients. While this isn't a "true"
microservice architecture (perhaps for that there should be a separate service
maintaining client requests, etc), it is certainly "microservice inspired."

The idea is to have a nice compare/contrast for cloud deployment vs non-cloud
ready chat applications.

To run locally:

  1. Provision a Node.js runtime
  1. Create and bind an instance of the "MQ Light" service to it
  1. Copy the environment variables from your runtime into a `VCAP_SERVICES.json`
     file that is a sibling of `app.js`
  1. `cd microservices`
  1. `npm install`
  1. `npm start`

Note that this only works with your node engine at most 4.x.x (as required by
the mq light library).

To push to bluemix:

  1. follow the steps above
  1. `cf push <name of app>`
