const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = process.env.MONGODB_URL || require('../secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}


router.get('/menu', async (_, response) => {
    const collection = await getCollection('FoodTruck-API', 'menu')
    const items = await collection.find({}).toArray()
	response.json({ items })
    //console.log(items)
})

router.post('/menu', async (request, response) => {
    const { name, description, price } = request.body
    const collection = await getCollection('FoodTruck-API', 'menu')
    await collection.insertOne({ name, description, price })
    response.json({ message: 'New menu item added!' })
})

module.exports = router