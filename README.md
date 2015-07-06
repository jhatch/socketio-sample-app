Example of a multi-process real time data streaming app with socket.io / redis.
===============================================================================

Lets install and run redis:
`brew install redis`
`npm run redis`

Lets build the app:
`npm i`

And spin up two nodes:
`NODE_PORT=3000 node index`
`NODE_PORT=3001 node index`

Now you can connect to either port with a browser and all data will be pushed to all relevant connections.
