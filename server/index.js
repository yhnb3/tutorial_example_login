const path = require('path')
const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const { v4 } = require('uuid')
const axios = require('axios')
const app = express();

app.use(express.static('dist'))
app.use(morgan('dev'))
app.use(urlencoded({ extended: false }))
app.use(json())


app.get('/api/user/:id', (req, res) => {
  if (!req.header['token']) {
    return res.status(403).send( {
      status: 'error'
    })
  }

  axios.get('https://randomuser.me/api')
    .then(result => {
      const [userProfile] = result.data.results
      const { name, picture, phone, emial, country } = userProfile

      res.status(200).send( {
        status: 'OK',
        result: {
          name, picture, phone, emial, country
        }
      })
    })
    .catch(e => {
      res.status(400).send({
        status: 'Error'
      })
    })
})

app.get('/api/user/:id/posts', (res, req) => {
  if (!req.header['token']) {
    return res.status(403).send({
      status: 'Error'
    })
  }
  
  axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${req.params.id}`)
    .then(result => {
      res.status(200).send({
        status: 'OK',
        result: result.data
      })
    })
    .catch(e => {
      res.status(400).send({
        status: 'Error'
      })
    })
})

app.post('/api/authentications', (req, res) => {
  if (Math.floor(Math.random() * 10) % 2 === 0) {
    res.status(200).send({
      status: 'OK',
      result: {
        id: Math.floor(Math.random() * 10),
        token: v4(),
      }
    })
  } else {
    res.status(403).send({
      status: 'Error'
    })
  }
})

app.listen(8080, () => {
  console.log('ready to dumy signup server')
})

