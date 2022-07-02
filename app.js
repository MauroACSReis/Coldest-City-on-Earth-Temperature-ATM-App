// require modules
const express = require('express')
const https = require('https') //require https native

// initialize express
const app = express()

// GET
app.get('/', function (req, res) {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=Yakutsk&appid=fd280f662c8045f1ae5794e7148ab277&units=metric' //API URL constant

  // https module to transfer the data from Weather API as JSON object
  https.get(url, function (res2) {
    // console log status codes
    console.log(res2.statusCode) // get API and send response with https.get

    // send response back to client using response.on("data")
    res2.on('data', function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
      res.write('<h1>The coldest city on earth<h1>')
      res.write('<p>The weather is currently ' + weatherDescription + '</p>')
      res.write('<img src="' + imageURL + '">')
      res.write(
        '<h2>The temperature in Yakutsk is ' + temp + ' degrees celsius</h2>'
      )

      res.send()
    })
  })
})

// listen to port
const port = 3000
app.listen(port, function () {
  console.log(`Server started at port ${port}.`)
})
