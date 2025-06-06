/**
 * List of period end days and non-working days defined within the Maginus calendar.
 */
export interface Calendar {
  /** Descriptive name for a year */
  yearName?: string
  /** Day represented as a number */
  day?: number
  /** A calendar period */
  period?: number
  /** 0=Wrk day;1=end period wrk day;2=non-wrk day;3=non-wrk end period4 = Period closed working day, 5 = Period closed non-working day */
  dayType?: number
  stugad?: string
}
