import { querySingle } from '../../db/query'
import type { Customer } from '~/types/customer'

export default defineEventHandler(async (event) => {
  const account = getRouterParam(event, 'account')

  if (!account) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Account parameter is required'
    })
  }

  try {
    const customer = await querySingle<Customer>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        CUSTOMER_NAME as customerName,
        EXPORT_CUSTOMER as exportCustomer,
        COUNTRY_CODE as countryCode,
        LANGUAGE_CODE as languageCode,
        CURRENCY_CODE as currencyCode,
        SALES_OFFICE as salesOffice,
        VAT_APPLICABLE as vatApplicable,
        VAT_REG_NUM as vatRegNum,
        ACCOUNT_TYPE as accountType,
        INVOICE_METHOD as invoiceMethod,
        ACKNOWL_METHOD as acknowlMethod,
        REP_CODE as repCode,
        INVOICE_ACCOUNT as invoiceAccount,
        STATEMENT_ACCOUNT as statementAccount,
        PRIME_ADDRESS_LINE as primeAddressLine,
        CREDIT_LIMIT as creditLimit,
        PAYMENT_TERM as paymentTerm,
        UNPAID_BALANCE as unpaidBalance,
        UNINVOICED_BALANCE as uninvoicedBalance,
        CHANGE_USER as changeUser,
        CHANGE_DATE as changeDate,
        WITHDRAWN as withdrawn,
        WITHDRAWN_DATE as withdrawnDate,
        LAST_USED as lastUsed,
        PRIORITY as priority,
        MAIN_CONTACT as mainContact,
        CUSTOMER_KEY1 as customerKey1,
        CUSTOMER_KEY2 as customerKey2,
        CUSTOMER_KEY3 as customerKey3,
        CUSTOMER_KEY4 as customerKey4,
        INTER_COMPANY as interCompany,
        CREATION_DATE as creationDate,
        DRAFT_LIMIT as draftLimit,
        DELIVERY_TERM as deliveryTerm,
        EXCHANGE_RATE_ID as exchangeRateId,
        TEXT_NUMBER as textNumber,
        AUTO_SUBSTITUTION as autoSubstitution,
        ADDRESS_ID as addressId,
        LEDGER as ledger,
        NOMINAL as nominal,
        FACTOR_LEDGER as factorLedger,
        FACTOR_ACCOUNT as factorAccount,
        UNINVOICED_VAT as uninvoicedVat,
        STATUS as status,
        MAIN_CONTACT_ID as mainContactId,
        DEFINED_KEY1 as definedKey1,
        DEFINED_KEY2 as definedKey2,
        DEFINED_KEY3 as definedKey3,
        DEFINED_KEY4 as definedKey4,
        DEFINED_KEY5 as definedKey5,
        DEFINED_KEY6 as definedKey6,
        PROFORMA as proforma,
        PROSPECT_CUST_TYPE as prospectCustType,
        PROSPECT_STATUS as prospectStatus,
        PROSPECT_SOURCE as prospectSource,
        UNFORMATTED_NAME as unformattedName,
        SALES_TEXT as salesText,
        INCLUDE_EXCLUDE as includeExclude,
        WAREHOUSE_BALANCE as warehouseBalance,
        WAREHOUSE_VAT as warehouseVat,
        PRODUCT_DISCOUNT as productDiscount,
        EDI_LOCATION_REF as ediLocationRef,
        EDI_TRANS_PASSWD as ediTransPasswd,
        EDI_OUR_ID as ediOurId,
        EDI_CUST_ID as ediCustId,
        RETRO_REBATE as retroRebate,
        EDI_TRANS_PASSWORD as ediTransPassword,
        EDI_INVOICE_GEN_NUM as ediInvoiceGenNum,
        EDI_PRICE_GEN_NUM as ediPriceGenNum,
        STATEMENT_PRINT_TYPE as statementPrintType,
        INVOICE_CONSOLIDATION as invoiceConsolidation,
        INVOICE_FREQUENCY as invoiceFrequency,
        MAILSORT_CODE as mailsortCode,
        VAT_INCLUSIVE as vatInclusive,
        DEFINED_KEY7 as definedKey7,
        DEFINED_KEY8 as definedKey8,
        DEFINED_KEY9 as definedKey9,
        DEFINED_KEY10 as definedKey10,
        DEFINED_KEY11 as definedKey11,
        DEFINED_KEY12 as definedKey12,
        DEFINED_KEY13 as definedKey13,
        DEFINED_KEY14 as definedKey14,
        DEFINED_KEY15 as definedKey15,
        DEFINED_KEY16 as definedKey16,
        SINGLE_BATCH_ALLOC as singleBatchAlloc,
        EDI_ACK_FLGN as ediAckFlgn,
        TOTAL_DELIVERY as totalDelivery,
        PICK_LIST_TEXT as pickListText,
        PRINT_RRP as printRrp,
        PRINT_DESPATCH_VALUES as printDespatchValues,
        COMPANY_REG_NUM as companyRegNum,
        MIN_MARGIN_DEFAULT as minMarginDefault,
        CREATION_USER as creationUser,
        VOUCHER_VALUE_BONUS as voucherValueBonus,
        BONUS_POINTS as bonusPoints,
        MESSAGE_TYPE as messageType,
        MESSAGE_START_DATE as messageStartDate,
        MESSAGE_END_DATE as messageEndDate,
        FIRST_ORDER_DATE as firstOrderDate,
        FIRST_ORDER_NUMBER as firstOrderNumber,
        LAST_ORDER_DATE as lastOrderDate,
        LAST_ORDER_NUMBER as lastOrderNumber,
        FIRST_MEDIA_CODE as firstMediaCode,
        CONTRACTS as contracts,
        PRICE_LIST as priceList,
        LESSOR_ACCOUNT as lessorAccount,
        ORDER_NUMBER_UNIQUE as orderNumberUnique,
        ORIG_PROSPECT as origProspect,
        MAXIMUM_ORDER_VALUE as maximumOrderValue,
        SUPPRESS_WELCOME_PACK as suppressWelcomePack,
        MERGE_ACCOUNT as mergeAccount,
        STATEMENT_EMAIL as statementEmail,
        CREDIT_EMAIL as creditEmail,
        INVOICE_EMAIL as invoiceEmail,
        RETURN_METHOD as returnMethod,
        STATEMENT_METHOD as statementMethod,
        FIN_ADDRESS_ID as finAddressId,
        DEFAULT_DELIVERY_ADDRESS_ID as defaultDeliveryAddressId,
        LAST_ADVERTISING_PACK as lastAdvertisingPack,
        SUPPRESS_ADVERTISING_PACK as suppressAdvertisingPack,
        LAST_EXTERNAL_CHANGE as lastExternalChange,
        DP_STATEMENT_DATE as dpStatementDate,
        ANONYMISE_STATUS as anonymiseStatus,
        ANONYMISE_REQUEST_DATE as anonymiseRequestDate,
        ANONYMISE_REQUEST_USER as anonymiseRequestUser,
        ANONYMISE_COMPLETION_DATE as anonymiseCompletionDate,
        TEAM_NAME as teamName,
        HORIZON_DAYS as horizonDays,
        HORIZON_DATE as horizonDate,
        HORIZON_UPDATE as horizonUpdate
       FROM MAGINUS.CUSTOMER 
       WHERE CUSTOMER_ACCOUNT = :account`,
      { account }
    )

    if (!customer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Customer not found'
      })
    }

    return {
      success: true,
      customer
    }
  } catch (err) {
    console.error('Customer lookup error:', err)
    
    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve customer'
    })
  }
})