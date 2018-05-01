const http = require("http");
const express = require("express");
const app = express();
const chalk = require('chalk');
const sender = require('./sender.js')




//sender.startbrowser('start')


app.get("/", function(req, res) {
  res.send("<h1>routes</h1>");
sender.startbrowser()
});

app.get('/send/:phone/:message', async function(req, res){
  var number = req.params.phone
  var message = req.params.message
  res.send(await sender.send(number,message))
})

app.get('/qrcode', async function(req, res){
res.send('<img src="Users/FelipeTiozo/Documents/Projetos/WhatsApp-sender/WhatsApp-Sender/example.png" />')
})

app.get('/history', function(req, res){
res.send('starting')
})

app.get('/instructions', function(req, res){

})

http.createServer(app).listen(3000, () => console.log(chalk.bgWhite.black.bold(' Server running on localhost:3000 ')));