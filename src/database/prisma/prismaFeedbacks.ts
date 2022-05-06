import { prisma } from "../../prisma";
import { FeedbacksDatabaseMethods, FeedbacksCreator } from "../feedbacks";

export class PrismaFeedback implements FeedbacksDatabaseMethods {
    async create({type, comment, screenshot}: FeedbacksCreator) {
        await prisma.feedBack.create({
            data:{
                type,
                comment,
                screenshot
            }
        })
    }
}