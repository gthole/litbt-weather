# Litbt Weather
A weather app written in React, backed by the National Weather Service API and
OpenStreetMap.

This app borrows heavily from the DarkSky web UI, which was bought by Apple and
decommissioned.

### Running Locally
```
# Using docker:
$ docker-compose up

# With npm:
$ npm start
```

### Running in Production

```yaml
version: '3'

services:
    web:
        image: 'gthole/litbt-weather'
        restart: 'always'
```
