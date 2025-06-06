import type { ContactSource } from '~/types/contact-source'

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
    const contactSources = await queryMultiple<ContactSource>(
      `SELECT 
        CUSTOMER_ACCOUNT as customerAccount,
        PROSPECT_CUST_TYPE as prospectCustType,
        CONTACT_ID as contactId,
        PROSPECT_SOURCE as prospectSource,
        CONTACT_DATE as contactDate,
        CHANGE_DATE as changeDate,
        CHANGE_USER as changeUser,
        CAMPAIGN_CODE as campaignCode,
        MEDIA_CODE as mediaCode,
        STATUS as status,
        CONTACT_KEY as contactKey,
        MERGE_ACCOUNT as mergeAccount
       FROM MAGINUS.CONTACT_SOURCE 
       WHERE CUSTOMER_ACCOUNT = :customerAccount
       ORDER BY CONTACT_DATE DESC, CONTACT_ID`,
      { customerAccount }
    )

    return {
      success: true,
      data: contactSources
    }
  } catch (err) {
    console.error('Contact sources lookup error:', err)

    if (err instanceof Error && err.message.includes('statusCode')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to retrieve contact sources'
    })
  }
})