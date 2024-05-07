
//Back end Data Base information //LADIES: Dont Forget Notes S

// Expess File requiremnet 
const express = require('express')
const path = require('path')
const mongo = require('./mongo')

const app = express()

const root = path.join(__dirname, 'public')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))

app.get('/', (_, response) => {
    response.sendFile('home.html', { root })
})

