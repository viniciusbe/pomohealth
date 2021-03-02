import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '../../util/mongodb';

interface User {
    email: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default async function (request: NextApiRequest, response: NextApiResponse): Promise<User[] | void> {

    const { database } = await connectToDatabase()

    const users = await database
        .collection('stats')
        .find({})
        .sort({ level: -1 })
        .toArray()

    response.json(users)

}