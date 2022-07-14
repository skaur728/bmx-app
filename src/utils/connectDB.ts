import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	const client = await MongoClient.connect((process.env.MONGODB_URI), {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	return client;
}