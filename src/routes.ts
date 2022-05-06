import express from "express";
import { PrismaFeedback } from "./database/prisma/prismaFeedbacks";
import { NodeMailerMailFunction } from "./functions/nodeMailer/nodeMailerMailFunction";
import { SubmitFeedbackService } from "./services/submitFeedbackService";

export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
    const {type, comment, screenshot} = req.body;
    try {
        const feedbackRepository = new PrismaFeedback()
        const fodeMailerMailFunction = new NodeMailerMailFunction();

        const SubmitFeedback = new SubmitFeedbackService(feedbackRepository, fodeMailerMailFunction)

        await SubmitFeedback.execute({type, comment, screenshot})
        
        return res.status(201).send();
    } catch (error) {
        console.log(error)
    }
})