// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req,res) {
    if(req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://dhavalladani:N6E4SHShxid2EqIG@meetups.8x5rn0o.mongodb.net/test');
        const db = client.db();
        const meetupsCollection = db.collection('meetups'); 

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();
        res.status(201).json({message: 'Meetup inserted'});
    }
}

export default handler;