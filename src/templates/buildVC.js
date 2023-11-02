export default (credentialRecord) => {

    const credential = {
        "@context": [
            "https://www.w3.org/2018/credentials/v1",
            "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.2.json"
        ],
        "id": "urn:uuid:c9ae1c60-5b8b-463c-bf0a-0bf26deca25e",
        "type": [
            "VerifiableCredential",
            "OpenBadgeCredential"
        ],
        "name": credentialRecord.credentialName,
        "issuer": {
            "id": "THIS IS SET FROM THJE TENANT OR SEED AT SIGNING TIME",
            "type": ["Profile"],
            "name": credentialRecord.issuerName,
            "url": credentialRecord.issuerURL
        },
        "issuanceDate": (credentialRecord.issuanceDate ? new Date(credentialRecord.issuanceDate) : new Date()).toISOString(),//"2023-04-06T23:22:34.772810+00:00", //(new Date()).toISOString(),  //
        "credentialSubject": {
            "type": ["AchievementSubject"],
            "achievement": {
                "id": "urn:uuid:bd6d9316-f7ae-4073-a1e5-2f7f5bd22922",
                "type": ["Achievement"],
                "name": credentialRecord.credentialName,

            }
        }
    }

    if (credentialRecord.credentialDescription) {
        credential.credentialSubject.achievement.description = credentialRecord.credentialDescription
    }
    if (credentialRecord.credentialCriteria) {
        credential.credentialSubject.achievement.criteria = { "type": "Criteria", "narrative": credentialRecord.credentialCriteria }
    }

    if (credentialRecord.expirationDate) {
        credential.expirationDate = (new Date(credentialRecord.expirationDate)).toISOString()
    }

    if (credentialRecord.credentialImage) {
        credential.credentialSubject.achievement.image = {
            id: credentialRecord.credentialImage,
            type: "Image"
        }
    }

    if (credentialRecord.recipientName) {
        credential.credentialSubject.name = credentialRecord.recipientName
    }

    if (credentialRecord.issuerImage) {
        credential.issuer.image = { type: "Image", id: credentialRecord.issuerImage }
    }

    if (credentialRecord.issuerDescription) {
        credential.issuer.description = credentialRecord.issuerDescription;
    }

    return {
        "tenantName": credentialRecord.tenantName,
        "data": [
            {
                "retrievalId": "single",
                "timeToLive": credentialRecord.timeToLive ? credentialRecord.timeToLive : 600000,
                "vc": credential
            }]
    }
}