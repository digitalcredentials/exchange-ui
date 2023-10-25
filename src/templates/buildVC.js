import Handlebars from "handlebars";


Handlebars.registerHelper('formatDate', function (date) {
    const issuanceDate =  date?new Date(date):new Date()
    const dateString = issuanceDate.toISOString()
    return dateString
})

const template = Handlebars.compile(`{
    "tenantName": "test",
    "data": [
        {
            "vc": {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json"
    ],
    "id": "urn:uuid:951b475e-b795-43bc-ba8f-a2d01efd2eb1",
    "type": [
        "VerifiableCredential",
        "OpenBadgeCredential"
    ],
    "issuer": {
        "id": "THIS IS SET FROM THE TENANT OR SEED AT SIGNING TIME",
        "type": "Profile",
        "name": "{{issuerName}}",
        {{#if issuerDescription}}
        "description": "{{issuerDescription}}",
        {{/if}}
        "url": "{{issuerURL}}"
        {{#if issuerImage}}
        ,"image": {
            "id": "{{issuerImage}}",
            "type": "Image"
        }
        {{/if}}
    },
    "issuanceDate": "{{formatDate issuanceDate}}",
    {{#if expirationDate}}
    "expirationDate": "{{formatDate expirationDate}}",
    {{/if}}
    "name": "{{credentialName}}",
    "credentialSubject": {
        {{#if recipientName}}
        "name":"{{recipientName}}",
        {{/if}}
        "type": "AchievementSubject",
        "achievement": {
            "id": "urn:uuid:9947325e-b795-43bc-ba8f-a2d01efd2f8r",
            "type": "Achievement",
            {{#if credentialCriteria}}
            "criteria": {
                "narrative": "{{credentialCriteria}}"
            },
            {{/if}}
            {{#if credentialDescription}}
            "description": "{{credentialDescription}}",
            {{/if}}
            "name": "{{credentialName}}"
        } 
    }  
},
            "retrievalId": "single",
            "timeToLive": {{#if timeToLive}}{{timeToLive}}{{else}}600000{{/if}}
        }
    ]
}
`)

export default data => JSON.parse(template(data))


