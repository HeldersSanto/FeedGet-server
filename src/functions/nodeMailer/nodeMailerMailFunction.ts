import { MailFuntions, SendMailData } from "../mailFunction";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6d6049d0ef682a",
        pass: "f06bf396164f3a"
    }
});

export class NodeMailerMailFunction implements MailFuntions{
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: "Helder - Equipe FeedGet <helder@feedget.com>",
            to: "Helder <helder2903.ds@gmail.com>",
            subject,
            html: body

        })
    }
}