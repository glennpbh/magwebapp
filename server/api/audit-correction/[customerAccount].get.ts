import type { AuditCorrection } from '~/types/audit-correction'

import { queryMultiple } from '../../db/query'

export default defineEventHandler(async (event) => {
  const customerAccount = getRouterParam(event, 'customerAccount')

  if (!customerAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer account parameter is required'
    })
  }

  try {
    const auditCorrections = await queryMultiple<AuditCorrection>(
      `SELECT 
        CORRECTION_TYPE as correctionType,
        CUSTOMER_ACCOUNT as customerAccount,
        DOCUMENT_NUMBER as documentNumber,
        ITEM_NUMBER as itemNumber,
        ORDER_TYPE as orderType,
        SO_INVOICE_NUM as soInvoiceNum,
        OLD_UNIT_COST as oldUnitCost,
        NEW_UNIT_COST as newUnitCost,
        OLD_LINE_WEIGHT as oldLineWeight,
        NEW_LINE_WEIGHT as newLineWeight,
        AUDIT_TEXT as auditText,
        CHANGE_USER as changeUser,
        CHANGE_DATE as changeDate
       FROM MAGINUS.AUDIT_CORRECTION 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY CHANGE_DATE DESC, DOCUMENT_NUMBER, ITEM_NUMBER`,
      { customerAccount }
    )

    return {
      success: true,
      data: auditCorrections
    }
  } catch (err) {
    console.error('Audit corrections lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve audit corrections'
    })
  }
})