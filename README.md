## Boilerplate to use Ruby on Rails + Webpack + React + Material-ui


Webpack is keeping working together with sprokets

## To create bundle locally

```npm run dev```

It's pointed to script

```"dev": "webpack-dev-server --progress --colors --watch",```
   
## To deploy 

```npm run deploy```

It's pointed to
    
```"deploy": "NODE_ENV=production webpack -p --config webpack.production.config.js",```

## To create bundle in c9.io
 
```npm run devcloud``` 

It's pointed to
 
```"devcloud": "webpack --config webpack.devcloud.config.js --progress --colors",```