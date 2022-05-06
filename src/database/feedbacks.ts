export interface FeedbacksCreator{
    type: string,
    comment: string,
    screenshot?: string
}

export interface FeedbacksDatabaseMethods {
    create: (data: FeedbacksCreator) => Promise<void>;
}