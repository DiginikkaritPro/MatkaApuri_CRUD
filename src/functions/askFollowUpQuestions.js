import CreateQuestion from '../components/createQuestion'

export const askFollowUpQuestions = (followUpAmount) => {
    

    CreateQuestion.hidden = true
    do{
    FollowUpQuestion()
    } while(followUpAmount.length > 0)
    
}