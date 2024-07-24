import mongoose from "mongoose"

if (!process.env.MONGO_URI) {
  throw new Error(
    "Please define the process.env.MONGO_URI environment variable inside .env.local",
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then(mongoose => {
      return mongoose
    })

    console.log('mongo is connected news...');
  }

  console.log('lastest connected...');
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB