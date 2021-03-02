import type { NextApiRequest, NextApiResponse } from 'next'
import { useSession } from 'next-auth/client';
import { connectToDatabase } from '../../util/mongodb';

export default async function (request: NextApiRequest, response: NextApiResponse) {

    const { database } = await connectToDatabase()
    const collection = database.collection('stats')

    if (request.method === 'POST') {
        const { email, level, currentExperience, challengesCompleted } = request.body;

        const userUpdated = await collection.findOneAndUpdate(
            {
                email
            },
            {
                $set:
                {
                    level,
                    currentExperience,
                    challengesCompleted
                }
            })

        return response.status(200).json(userUpdated)
    } else {
        const { email } = request.query
        console.log(email);
        let userStats = await collection.findOne({
            email
        })

        if (!userStats) {
            userStats = await collection.insertOne({
                email,
                level: 0,
                currentExperience: 0,
                challengesCompleted: 0
            })
        }

        console.log(userStats);

        return response.status(200).json(userStats)
    }
}

