const express = require('express')
const config = require('../config')
const fs = require('fs');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port

const app = express()

// 使用中间件创建静态文件访问
app.use(express.static('./dist'))

// app.all('*', function(req, res, next) {
//   res.sendfile('./dist/index.html');
// })

app.listen(port, function (err) {
  if (err) return console.error(err)
  console.log('Listening at http://localhost:' + port + '\n')
})
