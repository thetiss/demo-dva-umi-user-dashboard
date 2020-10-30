export default {
    "publicPath": "/static/",
    "proxy": {
        "/api": {
           "target": "http://jsonplaceholder.typicode.com/",
         // "target": "https://ghibliapi.herokuapp.com/",
          "changeOrigin": true, // 开启跨域代理
          "pathRewrite": { "^/api" : "" }
        },
        "/save": {
         // "target": "http://jsonplaceholder.typicode.com/",
         "target": "https://ghibliapi.herokuapp.com/",
         "changeOrigin": true, // 开启跨域代理
         "pathRewrite": { "^/save" : "" }
       }
      },
      
        "extraBabelPlugins": [
          ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
        ]
      
}