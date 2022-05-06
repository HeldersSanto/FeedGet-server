import { SubmitFeedbackService } from "./submitFeedbackService"

const createFeedbackSpt = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
    { create: createFeedbackSpt},
    {sendMail: sendMailSpy}
)

describe("Submit feedback", ()=>{
    
    it("should be able to submit a feedback", async ()=>{
        await expect(submitFeedback.execute({type:"BUG", comment: "Teste de teste"}))
        .resolves.not.toThrow();

        expect(createFeedbackSpt).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    
    
    it("should not be able to submit a feedback without type", async ()=>{
        await expect(submitFeedback.execute({
            type:"", 
            comment: "Teste de teste",
            screenshot: "image.png"
        })).rejects.toThrow();
    })
   
    it("should not be able to submit a feedback without comment", async ()=>{
        await expect(submitFeedback.execute({
            type:"BUG", 
            comment: "",
            screenshot: "image.png"
        })).rejects.toThrow();
    })
    
    it("should not be able to submit a feedback with an invalid screenshot", async ()=>{
        await expect(submitFeedback.execute({
            type:"BUG", 
            comment: "Bug encontrado",
            screenshot: "teste"
        })).rejects.toThrow();
    })
})