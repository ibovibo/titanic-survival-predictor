export type PassengerClass = 1 | 2 | 3
export type Sex = 'male' | 'female'
export type Embarked = 'S' | 'C' | 'Q'

export interface PassengerProfile {
  pclass: PassengerClass
  sex: Sex
  age: number
  sibsp: number
  parch: number
  fare: number
  embarked: Embarked
}

export interface PassengerFormState {
  pclass: PassengerClass
  sex: Sex
  age: number
  hasSpouse: boolean
  siblings: number
  parents: number
  children: number
  fare: number
  embarked: Embarked
}

export interface PredictResponse {
  survival_probability: number
}

export type Language = 'tr' | 'en'
