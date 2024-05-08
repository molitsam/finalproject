const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = process.env.MONGODB_URL || require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

//get all menu items
router.get('/menu', async (_, response) => {
    const collection = await getCollection('FoodTruck-API', 'menu')
    const items = await collection.find({}).toArray()
	response.json({ items })
    //console.log(items)
})

//add a menu item
router.post('/menu', async (request, response) => {
    const { name, description, price } = request.body
    const collection = await getCollection('FoodTruck-API', 'menu')
    await collection.insertOne({ name, description, price })
    response.json({ message: 'New menu item added!' })
})

//update menu item by id (PUT /api/menu/:id)
router.put('/menu/:id', async (request, response) => {
    const { body, params } = request
    const { id } = params
    const { name, description, price } = body
    const item = { name, description, price }

    const collection = await getCollection('FoodTruck-API', 'menu')
    const update = await collection.updateOne({ _id: new Object(id) }, { $set: item })
    //const findItem = items.filter(({ _id }) => _id.toString == id )
    response.json(update)
})

//delete menu item by id (DELETE /api/menu/:id)

//get all events (GET /api/events)

//get event by id (GET /api/events/:id)
router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruck-API', 'events')
    const event = await collection.findOne({ "_id": new ObjectId(id) })
    //const findItem = items.filter(({ _id }) => _id.toString == id )
    response.json(event)
})

//add new event (POST /api/events)

//update event by id (PUT /api/events/:id)

//delete event by id (DELETE /api/events/:id)

module.exports = router