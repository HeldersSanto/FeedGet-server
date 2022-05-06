export interface SendMailData{
    subject: string,
    body: string
}

export interface MailFuntions{
    sendMail: (data:SendMailData) => Promise<void>;
}