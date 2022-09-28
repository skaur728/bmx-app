import { getUser, getUserByEmail } from "@/controllers/user";
import { IUser } from "@/models/User";
import dbConnect from "@/utils/store/dbConnect";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export type NextApiRequestWithUser = NextApiRequest & {
    user: IUser
};

export const withAuthenticatedUser = (handler: (req: NextApiRequestWithUser, res: NextApiResponse) => unknown | Promise<unknown>) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const token = await getToken({ req })
        if (token) {
            // Signed in
            console.log("JSON Web Token", JSON.stringify(token, null, 2))
        } else {
            // Not Signed in
            res.status(401).end()
            return
        }

        await dbConnect()

        // If token is valid, check that it corresponds to a user in our db
        const id = token?.sub ?? ''
        const existingUser = await getUser({ id })
        if (existingUser) {

            const newRequest = { ...req, user: existingUser } as NextApiRequestWithUser

            // call down the original handler
            await handler(newRequest, res)
        } else {
            // Not Signed in
            res.status(401).end()
            return
        }
    };
}