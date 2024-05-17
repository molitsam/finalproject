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
router.delete('/api/menu/:id', async (request, response) => {
     const { id } = request.params
     const collection = await getCollection('FoodTruck-API', 'menu')
     const result = await collection.deleteOne({ _id: new Object(id) })
    response.json(result)
})
//get all events (GET /api/events)
router.get('/api/events', async (request, response) => {
    const collection = await getCollection('FoodTruck-API', 'events')
    const events = await collection.find({}).toArray()
    response.json({ events })
})
//get event by id (GET /api/events/:id)
router.get('/events/:id', async (request, response) => {
    const { id } = request.params
    const collection = await getCollection('FoodTruck-API', 'events')
    const event = await collection.findOne({ "_id": new ObjectId(id) })
    //const findItem = items.filter(({ _id }) => _id.toString == id )
    response.json(event)
})

//add new event (POST /events)
router.post('/events', async (request,response) =>{
    const {body} = request
    const {name, location, dates, hours} = body
    const event = {name, location, dates, hours}

    const collection = await getCollection('FoodTruck-API', 'events')
    const eventresult = await collection.insertOne(event)
    response.send(eventresult)
})

//update event by id (PUT /events/:id)
router.put('/events/:id', async (request,response)=>{
    const { body, params } = request /*ensure we call the param and id of the DB object to specify */
    const { id } = params
    const {name, location, dates, hours} = body
    const event = {name, location, dates, hours}

    const collection = await getCollection('FoodTruck-API', 'events')
    const eventresult = collection.updateOne({ _id: new ObjectId(id) }, { $set: event})
    response.send(eventresult)
})
//delete event by id (DELETE /events/:id)
router.delete('/events/:id', async (request,response)=>{
    const { id } = request.params
    const collection = await getCollection('FoodTruck-API', 'events')
    const eventresult = await collection.deleteOne({ _id: new ObjectId(id) })
    response.send(eventresult)
})

module.exports = router