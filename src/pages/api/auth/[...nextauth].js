import NextAuth from 'next-auth';
import Providers from 'next-auth/providers'
// import { NextApiRequest, NextApiResponse } from 'next-auth/_utils'

// interface NextApi {
//     request: NextApiRequest;
//     response: NextApiResponse
// }

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    secret: process.env.SECRET,

})