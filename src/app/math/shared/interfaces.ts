export interface Items {
  text: string
  right: boolean
  answer: number
  studentAnswer: number
}

export interface Exercise {
  items?: Items[]
  endTimeOfSolving?: Date | null
  quantityAnswers?: number
  correctAnswer?: number
  wrongAnswer?: number
  operation?: string
  id?: any
}
