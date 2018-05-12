const http = require("http");
const express = require("express");
const app = express();
const chalk = require('chalk');
const sender = require('./sender.js')
var history = []
var objhistory = {history}
var completehistory = []
var objcompletehistory = {completehistory}
var check
var already = {"browserStatus":"running","qrcodeStatus":"ready"}

async function searchById(id){
    var count = -1
    for(var i = 0;i < completehistory.length;i++){
      count++
      if(history[i].messageId==id){
        break
      }
      if(i==completehistory.length-1){
        var error = {messageId:id,idStatus:'notFound'}
        return error      
      }  
    }
     return completehistory[count]
  }

app.get("/", async function(req, res) {
  if(check!=1){
    var response = await sender.startbrowser() 
    res.send(response)
    check = 1
  }else{
    res.send(already)
  }
  
});

app.get('/send/:phone/:message', async function(req, res){
  var number = req.params.phone
  var message = req.params.message
  var response = await sender.send(number,message)
  history.push(response[0])
  completehistory.push(response[1])
  res.send(response[1])
})

app.get('/qrcode', async function(req, res){
res.sendFile('./qrcode.png',{root: __dirname })
})

app.get('/history', function(req, res){
res.send(objhistory)
})

app.get('/messageId/:id', async function(req, res){
var messageid = req.params.id
res.send(await searchById(messageid))
})

http.createServer(app).listen(3000, () => console.log(chalk.bgWhite.black.bold(' Server running on localhost:3000 ')));