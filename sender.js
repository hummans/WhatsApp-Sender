;(async() => {
  module.exports = {
    startbrowser: async function () {
      return await open()
    },

    send: async function (tel,message){
      return await sendmessage(tel,message)
    }
  }

  const puppeteer = require('puppeteer')
  sendbutton = '._2lkdt'
  voicebutton = '_2SbJ1'
  const chalk = require('chalk')

  var ID = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  function delay(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
  }

  async function open(){
    console.log(chalk.bgGreen.bold.black(' WhatsApp-Sender '))
    console.log()
    console.log(chalk.green('Opening browser ...'))
    browser = await puppeteer.launch({headless: true}); // default is true
    console.log()
    console.log(chalk.green('Browser ✅ '))
    page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36')
    console.log()
    console.log(chalk.green('Opening WhatsApp ...'))
    await page.setViewport({ width: 1024, height: 768 })
    await page.goto('https://web.whatsapp.com')
    console.log()
    console.log(chalk.green('Loaded page ✅'))
    await page.screenshot({path: 'qrcode.png'});
    console.log()
    console.log(chalk.bgGreen.black.bold(' QRCode is ready to scan 𝌉 '))
    console.log()
    console.log(chalk.bgRed.black.bold(' You have 30 seconds to scan QRCode in localhost:3000/qrcode '))
    console.log()
    console.log(chalk.black.bold.bgGreen(' WhatsApp is ready for send message! '))
    console.log()
    await page.close()
    var response = {browserStatus:'running',qrcodeStatus:'ready'}
    return response 
  }

  async function sendmessage(tel,message){
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36')
    var messageid = ID()
    var status
    await page.goto('https://web.whatsapp.com/send?phone='+tel+'&text='+message)
    try{
      await page.waitForSelector(sendbutton);  
    }
    catch (error) {
      await console.log(chalk.whiteBright.bgRed(' ')+chalk.whiteBright.bgRed(tel)+chalk.whiteBright.bgRed(' is a invalid number 📵  '));
      await page.close();
      status = 'error'
      var messagedata = {number:tel,messageId:messageid,messageStatus:status}
      console.log(messagedata)
      return messagedata

    }
    await page.click(sendbutton,{sendbutton: 'left'})
    console.log(chalk.whiteBright.bgGreenBright(' Message sent to '+tel)+chalk.whiteBright.bgGreenBright(' ✅  ')) 
    await delay(1000)
    status = 'success'
    var messagedata = {number:tel,messageId:messageid,messageStatus:status}            
    console.log(messagedata)
    await page.close()
    return messagedata
  }

})()







