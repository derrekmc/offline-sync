# Angular 2 - sails offline - online mobile sync
##### Sails-offline mode for mobile devices
#
#
---
#
### Install & Launch
```
npm install
npm start
```

### Test
```
npm test
```

### Environmental Variables

`MONGO_URL` - Mongo database host url. Used for the primary data storage.

`REDIS_URL` - Redis server host url. Used for socket clustering and clustered session support

`db` - database namespace

`prefix` - Session prefix

`maxAge` - Max cookie age

`secret` - Your applications secret identifier

```
MONGO_URL="mongodb://credentials:password@yourmongodbserver.com:port/db" npm start
```
