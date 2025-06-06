/**
 * Prospect/Customer contact job functions
 */
export interface JobFunction {
  /** Job function code from job_function table */
  jobFunction: string
  /** Description */
  description: string
  /** Date record was last updated */
  changeDate?: number
  /** The user entering or last updating the record */
  changeUser?: string
}
