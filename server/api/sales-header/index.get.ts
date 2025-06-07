import type { SalesHeader } from '~/types/sales-header'
import type { BindParameters } from 'oracledb'

import { queryMultiple } from '../../db/query'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = query.search as string
  const status = query.status as string
  const limit = parseInt(query.limit as string) || 50
  const offset = parseInt(query.offset as string) || 0

  try {
    let whereClause = '1=1'
    const params: BindParameters = {}

    // Add search filter
    if (search) {
      whereClause +=
        ' AND (UPPER(SALES_DOCUMENT_NUM) LIKE UPPER(:search) OR UPPER(CUSTOMER_NAME) LIKE UPPER(:search) OR UPPER(CUSTOMER_ACCOUNT) LIKE UPPER(:search))'
      params.search = `%${search}%`
    }

    // Add status filter
    if (status && status !== '') {
      whereClause += ' AND STATUS = :status'
      params.status = parseInt(status)
    }

    const salesHeaders = await queryMultiple<SalesHeader>(
      `SELECT 
        CHANGE_USER as changeUser,
        SALES_DOCUMENT_NUM as salesDocumentNum,
        CUSTOMER_ACCOUNT as customerAccount,
        CUSTOMER_NAME as customerName,
        SALES_OFFICE as salesOffice,
        ORDER_TYPE as orderType,
        USERNAME as username,
        STATUS as status,
        TOTAL_DELIVERY as totalDelivery,
        REFERENCE as reference,
        CURRENCY_CODE as currencyCode,
        TEXT_NUMBER as textNumber,
        PRIME_ADDRESS_LINE as primeAddressLine,
        ADDRESS1 as address1,
        ADDRESS2 as address2,
        ADDRESS3 as address3,
        ADDRESS4 as address4,
        ADDRESS5 as address5,
        ADDRESS6 as address6,
        POSTCODE as postcode,
        FAX as fax,
        MARKETING_REF as marketingRef,
        SOURCE as source,
        ACKNOWL_METHOD as acknowlMethod,
        ACKNOWL_REQUIRED as acknowlRequired,
        EXPORT as export,
        PROFORMA as proforma,
        CHANGE_DATE as changeDate,
        ORDER_DATE as orderDate,
        CONTACT_NAME as contactName,
        JOB_TITLE as jobTitle,
        DEPARTMENT as department,
        TELEPHONE as telephone,
        EXTENSION as extension,
        EXPIRY_DATE as expiryDate,
        SOURCE_REFERENCE as sourceReference,
        ORDER_VALUE as orderValue,
        PRINT_COUNT as printCount,
        SEND_REQUIRED as sendRequired,
        COUNTRY_CODE as countryCode,
        COMPLETION_DATE as completionDate,
        PAYMENT_TYPE as paymentType,
        REP_CODE as repCode,
        REASON_CODE as reasonCode,
        VAT_VALUE as vatValue,
        CUST_SALES_OFFICE as custSalesOffice,
        ACKNOWL_TEXT as acknowlText,
        DESPATCH_TEXT as despatchText,
        INVOICE_TEXT as invoiceText,
        PREP_SHEET_REQUIRED as prepSheetRequired,
        PREP_SHEET_COUNT as prepSheetCount,
        PREP_SHEET_SENT as prepSheetSent,
        SALES_DIVISION as salesDivision,
        PROFORMA_METHOD as proformaMethod,
        PROFORMA_COUNT as proformaCount,
        PROFORMA_SENT as proformaSent,
        EMAIL as email,
        DEFINED_ANALYSIS_1 as definedAnalysis1,
        DEFINED_ANALYSIS_2 as definedAnalysis2,
        DEFINED_ANALYSIS_3 as definedAnalysis3,
        DEFINED_ANALYSIS_4 as definedAnalysis4,
        DEFINED_ANALYSIS_5 as definedAnalysis5,
        DEFINED_ANALYSIS_6 as definedAnalysis6,
        PROSPECT_CUST_TYPE as prospectCustType,
        LOCATION_REF as locationRef,
        LOST_REASON as lostReason,
        CARRIER_DELIVERY as carrierDelivery,
        LOST_REASON_TEXT as lostReasonText,
        RELEASED as released,
        SAMPLE_REQUEST as sampleRequest,
        LOCAL_WAREHOUSE as localWarehouse,
        EDI_ACK_FLGN as ediAckFlgn,
        ISSUE_TYPE as issueType,
        OPENING_OFFER as openingOffer,
        ADVICE_NOTE_DATE as adviceNoteDate,
        FINAL_AUTHORISATION as finalAuthorisation,
        LEASE_CUSTOMER as leaseCustomer,
        LEASE_AUTH_AMOUNT as leaseAuthAmount,
        LEASE_REPAY_AMOUNT as leaseRepayAmount,
        STUGAD as stugad,
        TWS_GIFT_ORDER as twsGiftOrder,
        CONTACT_ID as contactId,
        QUOTE_PROBABILITY as quoteProbability,
        ORDER_COST as orderCost,
        BONUS_REDEEMED as bonusRedeemed,
        FIRST_ORDER as firstOrder,
        REFUND_REQUIRED as refundRequired,
        REFUND_REASON as refundReason,
        REFUND_ISSUED as refundIssued,
        REFUND_COMMENT as refundComment,
        AUTH_NUM as authNum,
        DELIVERY_NAME as deliveryName,
        BONUS_POINTS_ADJ as bonusPointsAdj,
        MANUAL_DISC_PERC as manualDiscPerc,
        MEDIA_CODE as mediaCode,
        PROMOTION_CODE as promotionCode,
        CONTRACT_NUM as contractNum,
        SAVING_VALUE as savingValue,
        SALES_ORDER_TYPE as salesOrderType,
        TOTAL_BONUS_POINTS as totalBonusPoints,
        UDF_GROUP_HEADER as udfGroupHeader,
        INV_ADDRESS_1 as invAddress1,
        INV_ADDRESS_2 as invAddress2,
        INV_ADDRESS_3 as invAddress3,
        INV_ADDRESS_4 as invAddress4,
        INV_ADDRESS_5 as invAddress5,
        INV_ADDRESS_6 as invAddress6,
        INV_POSTCODE as invPostcode,
        INV_COUNTRY_CODE as invCountryCode,
        INV_CONTACT_ID as invContactId,
        INV_CONTACT_NAME as invContactName,
        INV_CONTACT_FAX as invContactFax,
        INV_CONTACT_EMAIL as invContactEmail,
        INV_CONTACT_JOB_TITLE as invContactJobTitle,
        INV_CONTACT_DEPARTMENT as invContactDepartment,
        INV_CONTACT_TELEPHONE_1 as invContactTelephone1,
        INV_CONTACT_TELEPHONE_2 as invContactTelephone2,
        INV_CONTACT_MOBILE as invContactMobile,
        INV_CONTACT_EXTENSION as invContactExtension,
        TELEPHONE_2 as telephone2,
        MOBILE_TELEPHONE as mobileTelephone,
        ASSOCIATE_ALL_LINES as associateAllLines,
        QUOTE_USER as quoteUser,
        PAYMENT_TERM as paymentTerm,
        SHIPMENT_OPTION as shipmentOption,
        MULTI_SHIPMENT_DAYS as multiShipmentDays,
        SHIPMENT_DEADLINE_DATE as shipmentDeadlineDate,
        MERGE_ACCOUNT as mergeAccount,
        SALES_TAX as salesTax,
        BBEDI as bbedi,
        ORIG_DESPATCH_TYPE as origDespatchType
       FROM MAGINUS.SALES_HEADER 
       WHERE ${whereClause}
       ORDER BY ORDER_DATE DESC, SALES_DOCUMENT_NUM DESC
       OFFSET :offset ROWS FETCH NEXT :limit ROWS ONLY`,
      { ...params, offset, limit }
    )

    // Get total count for pagination
    const totalCount = await queryMultiple<{ count: number }>(
      `SELECT COUNT(*) as count FROM MAGINUS.SALES_HEADER WHERE ${whereClause}`,
      params
    )

    return {
      success: true,
      data: salesHeaders,
      pagination: {
        total: totalCount[0]?.count || 0,
        limit,
        offset,
        hasMore: (totalCount[0]?.count || 0) > offset + salesHeaders.length
      }
    }
  } catch (err) {
    console.error('Sales header lookup error:', err)

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve sales headers'
    })
  }
})