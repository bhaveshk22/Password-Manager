const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017/';

app.use(bodyParser.json())
app.use(cors())

const client = new MongoClient(url);
client.connect();

const dbName = 'passManager';

// Get the Password
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save the Passwords
app.post('/', async (req, res)=>{
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.insertOne(password)
  res.send({success: true, result: findResult})
})

// Delete password by id
app.delete('/', async (req, res)=>{
  const password = req.body
  const db = client.db(dbName)
  const collection = db.collection('passwords')
  const findResult = await collection.deleteOne(password)
  res.send({success: true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
