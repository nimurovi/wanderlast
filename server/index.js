import express from 'express'
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from 'cors'
import { createRemoteJWKSet, jwtVerify } from 'jose';
const app = express()
app.use(cors())
app.use(express.json())
const port = 8000




const client = new MongoClient(process.env.MONGODB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient = await connectToMongoDB();

const db = mongoClient.db('wanderlust1');
const destinationCollection = db.collection('destinations');
const bookingCollection = db.collection('bookings');


const varifyApi = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1]; 
  console.log("Token:", token);  
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
  const JWKS = createRemoteJWKSet(
    new URL(`${process.env.CLIENT_URI}/api/auth/jwks`)
  );
  try {
    const { payload } = await jwtVerify(token, JWKS);
    console.log("Payload:", payload); // Log the payload for debugging
    next();
  }
  catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  
}


app.post('/add-destination',varifyApi, async (req, res) => {
  const data = req.body;
  const result = await destinationCollection.insertOne(data);
  console.log(result);

  res.send(result);
})

app.get('/destinations', async (req, res) => {
  const destinations = await destinationCollection.find().toArray();
  res.send(destinations);
})

app.get('/destinations/:id', varifyApi, async (req, res) => {
  const { id } = req.params;
  const destination = await destinationCollection.findOne({ _id: new ObjectId(id) });
  res.send(destination);
})

app.patch('/destinations/:id',varifyApi, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const result = await destinationCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updateData }

  )
  res.send(result);
})

app.delete('/destinations/:id',varifyApi, async (req, res) => {
  const { id } = req.params;
  const result = await destinationCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
})

app.post('/bookings',varifyApi, async (req, res) => {
  const data = req.body;
  const result = await bookingCollection.insertOne(data);
  res.send(result);
})

app.get('/my-bookings/:email' , async (req, res) => {
  const { email } = req.params;
  const bookings = await bookingCollection.find({ email }).toArray();
  res.send(bookings);
})

app.delete('/my-bookings/:id',varifyApi, async (req, res) => {
  const { id } = req.params;
  const result = await bookingCollection.deleteOne({ _id: id });
  res.send(result);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;