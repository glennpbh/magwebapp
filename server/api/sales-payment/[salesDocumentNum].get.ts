import type { SalesPayment } from '~/types/sales-payment'

import { queryMultiple } from '../../db/query'

export default defineEventHandler(async (event) => {
  const salesDocumentNum = getRouterParam(event, 'salesDocumentNum')

  if (!salesDocumentNum) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Sales document number parameter is required'
    })
  }

  // Validate that salesDocumentNum is numeric
  const numericSalesDocumentNum = parseInt(salesDocumentNum)
  if (isNaN(numericSalesDocumentNum)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Sales document number must be a valid number'
    })
  }

  try {
    const salesPayments = await queryMultiple<SalesPayment>(
      `SELECT 
        SALES_DOCUMENT_NUM as salesDocumentNum,
        SO_INVOICE_NUM as soInvoiceNum,
        PAYMENT_METHOD as paymentMethod,
        CARD_NUMBER as cardNumber,
        EXPIRY_DATE as expiryDate,
        ISSUE_NUMBER as issueNumber,
        ISSUE_BANK as issueBank,
        CARDHOLDER as cardholder,
        ADDRESS1 as address1,
        ADDRESS2 as address2,
        ADDRESS3 as address3,
        ADDRESS4 as address4,
        ADDRESS5 as address5,
        ADDRESS6 as address6,
        POSTCODE as postcode,
        COUNTRY_CODE as countryCode,
        PAYMENT_VALUE as paymentValue,
        PAYMENT_DATE as paymentDate,
        AUTHORISATION as authorisation,
        CHANGE_USER as changeUser,
        CHANGE_DATE as changeDate,
        ORDER_TYPE as orderType,
        STATUS as status,
        CHARGING_USER as chargingUser,
        INTERFACE_STATUS as interfaceStatus,
        DREAM_DOCNUM as dreamDocnum,
        CUSTOMER_ACCOUNT as customerAccount,
        INTERFACE_REF as interfaceRef,
        CARD_START_DATE as cardStartDate,
        AUTHORISE_DATE as authoriseDate,
        AUTHORISE_MESSAGE as authoriseMessage,
        FIN_TRANSACTION_TYPE as finTransactionType,
        STUGAD as stugad,
        IMMEDIATE_CHARGE as immediateCharge,
        LEDGER_DOCNUM as ledgerDocnum,
        AUTOMATIC_REFUND as automaticRefund,
        PRINT_COUNT as printCount,
        REFUND_SOURCE as refundSource,
        REFUND_REASON as refundReason,
        REFUND_USER as refundUser,
        REFUND_DOCUMENT_NUM as refundDocumentNum,
        ORIGINAL_USER as originalUser,
        CARD_NUMBER_LOOKUP as cardNumberLookup,
        PAYMENT_NUM as paymentNum,
        REFUND_CHEQUE_NUM as refundChequeNum,
        REFERENCE as reference,
        SIGNATURE_ID as signatureId,
        VOUCHER_NUM as voucherNum,
        CURRENCY_CODE as currencyCode,
        BASE_PAYMENT_VALUE as basePaymentValue,
        SALES_OFFICE as salesOffice,
        CARD_ID as cardId,
        REFUND_STATUS as refundStatus,
        MERGE_ACCOUNT as mergeAccount,
        PAYMENT_VERIFIED as paymentVerified,
        CARD_ECI_ID as cardEciId,
        CARD_SID_ID as cardSidId,
        CARD_VAV_ID as cardVavId,
        CARD_VTS_ID as cardVtsId,
        CARD_VSC_ID as cardVscId,
        CARD_VSA_ID as cardVsaId,
        CARD_VSH_ID as cardVshId,
        REQUEST_REFERENCE as requestReference,
        STORAGE_REFERENCE as storageReference,
        OBFUSCATION_SCHEME as obfuscationScheme,
        AUTH_EXPIRY as authExpiry
       FROM MAGINUS.SALES_PAYMENT 
       WHERE SALES_DOCUMENT_NUM = :salesDocumentNum
       ORDER BY PAYMENT_NUM`,
      { salesDocumentNum: numericSalesDocumentNum }
    )

    return {
      success: true,
      data: salesPayments
    }
  } catch (err) {
    console.error('Sales payments lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve sales payments'
    })
  }
})
