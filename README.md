# PHOTO GALLERY MADE USING FLICKR API

## Project setup

### Make a config folder in the root containing config.js file which will store api keys for flickr and google api.

```javascript
{
  "flickrApiKey": {
    "Key": "YOUR API KEY",
    "Secret": "YOUR SECRET" // not required
  },
  "googleMapsApi":{
    "key":"YOUR API KEY"
  }
}
```
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```
 
 -----
 
#### Parts Left and how I would have solved them:
- filter based on parameters: date, color (?), licence, and more. This part though time consuming but is not very hard to implement. I would use date selectors, drop down menus for different parameters. The selected values from these components would then be used to make a request to the flickr api using the selected query parameters.
