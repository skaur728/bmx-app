import { connectToDatabase } from '@/utils/connectDB'
import { hash, compare } from 'bcrypt';

async function handler(req, res) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;

    const { email, password } = data;

    if (
        !email ||
        !email.includes('@') ||
        !password ||
        password.trim().length < 7
    ) {
        res.status(422).json({
            message:
                'Invalid input - password should also be at least 7 characters long.',
        });
        return;
    }

    const client = await connectToDatabase();

    const db = client.db();

    const existingUser = await client.db().collection('users').findOne({ email: email });

    if (existingUser) {
        //console.log("Existing User")
        res.status(422).json({ message: 'User exists already!' });
        client.close();
        return;
    }

    const hashedPassword = await hash(password, 12);

    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!' });
    client.close();
}

export default handler;