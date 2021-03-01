import { MongoClient } from 'mongodb';

const { MONGODB_URI, MONGODB_DB } = process.env

let cached = global.mongo

if (!cached) {
    cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            useNewParser: true,
            useUnifiedTopology: true
        }

        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                database: client.db(MONGODB_DB)
            }
        })
    }

    cached.conn = await cached.promise;

    return cached.conn;
}