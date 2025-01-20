import { NextApiRequest, NextApiResponse } from "next";
import { ProductFeedback } from "@/models/models";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userId, productName, feedback, sentiment, score }: any = req.body;

        try {
            const newFeedback: any = new ProductFeedback({
                userId,
                productName,
                feedback: { text: feedback, sentiment, score },
            });

            await newFeedback.save();

            res.status(200).json({ success: true, data: newFeedback });
        } catch (error: any) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(405).json({ success: false, message: "Method not allowed" });
    }
}
