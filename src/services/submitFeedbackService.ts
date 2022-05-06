import { PrismaFeedback } from "../database/prisma/prismaFeedbacks";
import { MailFuntions } from "../functions/mailFunction";

interface SubmitFeedbackData{
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackService{
    constructor(
        private feedbackRepository: PrismaFeedback,
        private mailAdapter: MailFuntions
    ){}
    async execute(req: SubmitFeedbackData){
        const {type, comment, screenshot} = req;

        if(!comment){
            throw new Error("comment is required");            
        }
        if(!type){
            throw new Error("type is required");            
        }
        if(screenshot && !screenshot.startsWith("data:image/png;base64")){
            throw new Error("screenshot invalid format");            
        }

        await this.feedbackRepository.create({
            type, 
            comment, 
            screenshot
        })
        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: 'Inter', sans-serif; font-size: 16px; color: #111111">`,
                `<p>Tipo do feedBack: ${type}</p>`,
                `<p>comentário: ${comment}</p>`,
                `</div>`
            ].join("\n")
        })
    }
}