import { queryMultiple } from '../../db/query'
import type { CustomerContact } from '~/types/customer-contact'

export default defineEventHandler(async (event) => {
  const customerAccount = getRouterParam(event, 'customerAccount')

  if (!customerAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Customer account parameter is required'
    })
  }

  try {
    const contacts = await queryMultiple<CustomerContact>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        CONTACT_NAME as contactName,
        JOB_TITLE as jobTitle,
        DEPARTMENT as department,
        FAX as fax,
        TELEPHONE as telephone,
        CHANGE_USER as changeUser,
        CHANGE_DATE as changeDate,
        EXTENSION as extension,
        ADDRESS_ID as addressId,
        PICTURE as picture,
        JOB_FUNCTION as jobFunction,
        CONTACT_ID as contactId,
        CONTACT_TITLE as contactTitle,
        CONTACT_INITIALS as contactInitials,
        CONTACT_FIRSTNAME as contactFirstname,
        EMAIL as email,
        CONTACT_DEAR as contactDear,
        TEXT_NUMBER as textNumber,
        PROSPECT_CUST_TYPE as prospectCustType,
        CONTACT_UNKNOWN as contactUnknown,
        NUMERIC_PHONE_NO as numericPhoneNo,
        TELEPHONE_NUMBER2 as telephoneNumber2,
        MOBILE_TELEPHONE as mobileTelephone,
        NUMERIC_TELEPHONE2 as numericTelephone2,
        NUMERIC_MOBILE as numericMobile,
        CONTACT_KEY as contactKey,
        NUMERIC_FAX as numericFax,
        CONTACT_FULL_NAME as contactFullName,
        CONTACT_MIDDLE_NAMES as contactMiddleNames,
        EMAIL_DESPATCH_CONFIRM as emailDespatchConfirm,
        PREFERRED_CONTACT_METHOD as preferredContactMethod,
        URL_DESPATCH_CONFIRM as urlDespatchConfirm,
        MERGE_CONTACT_ID as mergeContactId
       FROM MAGINUS.CUSTOMER_CONTACT 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY CONTACT_ID ASC`,
      { customerAccount }
    )

    return {
      success: true,
      data: contacts,
      count: contacts.length
    }
  } catch (err) {
    console.error('Customer contact lookup error:', err)
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve customer contacts'
    })
  }
})