const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')

const router = express.Router()

const { url } = require('../secrets/mongodb.json')
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

module.exports = router