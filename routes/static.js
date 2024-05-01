const express = require('express')
const path = require('path')
const router = express.Router()

const root = path.join(__dirname, '..', 'public')

router.get('/', (_, response) => {
    response.sendFile('index.html', { root })
})

//anything that gets to this point that hasn't already been handled
router.get('*', (request, response) => {
    console.log(request.url)
    response.sendFile('404.html', { root })
})

//export the router
module.exports = router