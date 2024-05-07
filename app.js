
//Back-end Database information //LADIES: Don't Forget Notes

// express file requirement 
const express = require('express')
const path = require('path')

const { getCollection, ObjectId } = require('./routes/api.js')

const app = express()
const port = process.env.PORT || 3000

const root = path.join(__dirname, 'public')

//middleware
app.use(express.json())
app.use(express.static('public'))
app.use('/api', require('./routes/api'))
app.use('/', require('./routes/static'))

//index page
app.get('/', (_, response) => {
    response.sendFile('home.html', { root })
})

/* all menu items
    id, name, description, and price*/ 
app.get('/api/menu', async (_, response) => {
    const collection = await getCollection('FoodTruck-API', 'menu')
    const items = await collection.find({}).toArray()
	response.json({ items })
    //console.log(items)
})

// app.post('api/menu', async (_, response) => {
//     const { name, description, price } = request.body
//     const collection = await getCollection('FoodTruck-API', 'menu')
//     await collection.insertOne({ name, description, price })
//     response.json({ message: 'New menu item added!' })
// })

app.listen(port, () => console.log(`Server running: http://localhost:${port}`))
