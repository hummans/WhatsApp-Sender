const http = require("http");
const express = require("express");
const app = express();
const chalk = require('chalk');
const sender = require('./sender.js')


app.get("/", async function(req, res) {
var response = await sender.startbrowser() 
res.send(response)
});

app.get('/send/:phone/:message', async function(req, res){
  var number = req.params.phone
  var message = req.params.message
  var response = await sender.send(number,message)

  res.send(response)
})

app.get('/qrcode', async function(req, res){
res.sendFile('./example.png',{root: __dirname })
})

app.get('/history', function(req, res){

})

app.get('/instructions', function(req, res){

})

http.createServer(app).listen(3000, () => console.log(chalk.bgWhite.black.bold(' Server running on localhost:3000 ')));