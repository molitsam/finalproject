const express = require('express')
const path = require('path')
const router = express.Router()

const root = path.join(__dirname, '..', 'public')

router.get('/', (_, response) => {
    response.sendFile('home.html', { root })
})

router.get('/api/menu', (_, response) => {
    response.sendFile('menu.html')
})

router.get('/api/menu', (_, response) => {
    response.sendFile('menu.html')
})

//anything that gets to this point that hasn't already been handled
router.get('*', (request, response) => {
    console.log(request.url)
    response.sendFile('404.html', { root })
})

//export the router
module.exports = router