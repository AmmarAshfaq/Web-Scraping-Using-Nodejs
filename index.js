var express = require('express')
var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')
var app = express()


app.get('/getCityData', function (req, res) {
  request(
    'http://www.amis.pk/ViewPrices.aspx?searchType=1&commodityId=99',
    function (error, response, html) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html)
        var arr = []
        $('tr').each(function (i, element) {
          var a = $(this)
          var cropName = a
            .children()
            .first('.listItem')
            .children()
            .text().trim()

          var cropMin = a
            .children()
            .eq(2)
            .text().trim()
          var cropMax = a
            .children()
            .eq(3)
            .text().trim()

          console.log(cropName, 'Price', cropMin, 'Max', cropMax)

          metadata = {
            cropName: cropName,
            cropMax: cropMax,
            cropMin: cropMin
          }

          arr.push(metadata)
        })
        res.json(arr)
      } else {
        console.log(error)
      }
    }
  )
})

app.get('/getAllCity', function (req, res) {
  request('http://www.amis.pk/DistrictCities.aspx', function (
    error,
    response,
    html
  ) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html)
      var arr = []
      $('font[face="Microsoft Sans Serif"]>a').each(function (i, element) {
        var a = $(this)
        var cityMarketList = a.text().trim()
        var urlLink = a.attr('href')
        console.log('City List', cityMarketList, 'link', urlLink)

        metadata = {
          cityName: cityMarketList,
          url: urlLink
        }

        arr.push(metadata)
      })
      res.json(arr)
    } else {
      console.log(error)
    }
  })
})
// fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

//     console.log('File successfully written! - Check your project directory for the output.json file');

// })

app.listen('8082')

console.log('Magic happens on port 8081')

exports = module.exports = app
//   request(url, function (error, response, html) {
//     if (!error) {
//       var $ = cheerio.load(html)
//       console.log($)
//       var title, release, rating
//       //   var json = { title: '', release: '', rating: '' }
//       var json = {
//         cities: []
//       }

//       // We'll use the unique header class as a starting point.

//       $('font[face="Microsoft Sans Serif"]').filter(function () {
//         // Let's store the data we filter into a variable so we can easily see what's going on.

//         var data = $(this)
//         // console.log(data)
// cities = data.children().first().text()
//         // release = data
//         //   .children()
//         //   .first()
//         //   .children()
//         //   .last()
//         //   .text()
//         // // In examining the DOM we notice that the title rests within the first child element of the header tag.
//         // // Utilizing jQuery we can easily navigate and get the text by writing the following code:

//         // title = data
//         //   .children()
//         //   .first()
//         //   .text()

//         // // Once we have our title, we'll store it to the our json object.
// json.cities = cities
//         // json.title = title
//         // json.release = release
//       })
//       // $('.star-box-giga-star').filter(function(){
//       //     var data = $(this);

//       //     // The .star-box-giga-star class was exactly where we wanted it to be.
//       //     // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

//       //     rating = data.text();

//       //     json.rating = rating;
//       // })
//     }

//     fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {
//       console.log(
//         'File successfully written! - Check your project directory for the output.json file'
//       )
//     })

//     // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
//     res.send('Check your console!')
//   })

// const rp = require('request-promise')
// const cheerio = require('cheerio') // using easier to use jquery in node
// const Table = require('cli-table')

// let users = []
// let table = new Table({
//   heading: ['username', '$', 'challenges'],
//   colWidths: [15, 5, 10]
// })
// const options = {
//   url: `https://www.freecodecamp.org/forum/directory_items?period=weekly&order=likes_received&_=1547054828837`,
//   json: true
// }

// rp(options)
//   .then(data => {
//     let userData = []
//     for (let user of data.directory_items) {
//       userData.push({
//         name: user.user.username,
//         likes_received: user.likes_received
//       })
//       process.stdout.write('loading')
//       getChallengesCompletedAndPushToUserArray(userData)
//     }
//   })
//   .catch(err => console.log(err))

// function getChallengesCompletedAndPushToUserArray (userData) {
//     // console.log(userData)
//   var i = 0
//   function next () {
//     if (i < userData.length) {
//       var options = {
//         url: `https://www.freecodecamp.org/${userData[i].name}`,
//         transform: body => cheerio.load(body)
//       }
//       rp(options).then(function ($) {
//         process.stdout.write('.')
//         const fccAccount = $('h1.landing-heading').length === 0
//         // console.log(fccAccount)
//         const challengesPass = fccAccount ? $('tbody tr').length : 'unknown'
//         // console.log(challengesPass)
//         table.push([
//           userData[i].name,
//           userData[i].likes_received,
//           challengesPass
//         ])
//         ++i
//         return next()
//       })
//     }else{
//         printData()
//     }
//   }
//   return next()
// }

// function printData(){
//     console.log("v")
//     console.log(table.toString())
// }
