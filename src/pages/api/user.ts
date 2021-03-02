import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../util/mongodb';

export default async function (request: NextApiRequest, response: NextApiResponse) {

    const { database } = await connectToDatabase()
    const collection = database.collection('stats')

    if (request.method === 'POST') {
        const { name, email, image, level, currentExperience, challengesCompleted } = request.body;

        const userUpdated = await collection.findOneAndUpdate(
            {
                email
            },
            {
                $set:
                {
                    name,
                    image,
                    level,
                    currentExperience,
                    challengesCompleted
                }
            })

        return response.status(200).json(userUpdated)
    } else {
        const { name, email, image } = request.query;

        let userStats = await collection.findOne({
            email
        })

        if (!userStats) {
            userStats = await collection.insertOne({
                name,
                email,
                image,
                level: 1,
                currentExperience: 0,
                challengesCompleted: 0
            })
        }


        return response.status(200).json(userStats)
    }
}

