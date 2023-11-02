export default {
    title: 'Credentials',
    description: 'Object containing credentials for collection.',
    type: 'object',
    required: ['tenantName', 'data'],
    properties: {
      tenantName: {
        title: 'Tenant',
        description: 'The tenant with which to sign.',
        type: 'string'
      },
      data: {
        title: 'Array of VCs',
        description: 'The Verifiable Credentials to queue up.',
        type: 'array',
        items: {
          type: 'object',
          required: ['vc', 'retrievalId', 'timeToLive'],
          properties: {
            vc: {
              description: 'the imsglobal OBv3 achievement credential schema',
              $ref: 'https://purl.imsglobal.org/spec/ob/v3p0/schema/json/ob_v3p0_achievementcredential_schema.json'
            },
            timeToLive: {
              description: 'how many milliseconds to keep the credential',
              type: 'integer',
            },
            retrievalId: {
              description: 'An identifier with which to distinguish amongst returned deeplinks.',
              type: 'string'
            }
          }
        }  
      }
    } 
  }
  