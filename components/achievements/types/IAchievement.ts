export interface IAchievement {
  title: string
  range: number
  completionStatus: number
  unlocked: boolean
  previousOpponents?: string[] | null
}
