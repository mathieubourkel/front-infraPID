import { ChangeEvent } from "react"

export type InputEvent = ChangeEvent<HTMLInputElement>
export type FormEvent = React.FormEvent<HTMLFormElement>;
export type intStatus = string[]
export type intSelects = intSelect[]

export interface intRangeDate {
    startDate: Date,
    endDate: Date
}

export type intSelect = {
    value: number | null | string
    label: string | undefined
  };

  export type intSafeSelect = {
    value: number
    label:string
  }
