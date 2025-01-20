import { NextApiRequest, NextApiResponse } from "next";
import { UserConversation } from "@/models/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userId, text, sentiment, score } = req.body;

        try {
            let userConversation = await UserConversation.findOne({ userId });

            if (!userConversation) {
                userConversation = new UserConversation({ userId, messages: [] });
            }

            userConversation.messages.push({ text, sentiment, score });
            await userConversation.save();

            res.status(200).json({ success: true, data: userConversation });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
