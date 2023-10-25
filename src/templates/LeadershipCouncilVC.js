export default `{
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
        "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
        "type": "Profile",
        "name": "Digital Credentials Consortium",
        "description": "Building infrastructure for digital academic credentialing.",
        "url": "https://dcconsortium.org",
        "image": {
            "id": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png",
            "type": "Image"
        }
    },
    "issuanceDate": "2023-01-01T00:00:00Z",
    "name": "DCC Leadership Council Member 2023",
    "credentialSubject": {
        "type": "AchievementSubject",
        "achievement": {
            "id": "urn:uuid:9947325e-b795-43bc-ba8f-a2d01efd2f8r",
            "type": "Achievement",
            "criteria": {
                "narrative": "Helping build an infrastructure for digital academic credentials that can support the education systems of the future.  Our mission is to create a trusted, distributed, and shared infrastructure that will become the standard for issuing, storing, displaying, and verifying academic credentials, digitally."
            },
            "description": "Member of the Digital Credentials Consortium Leadership Council - 2023",
            "name": "DCC Leadership Council Member 2023"
        }
    }
}
`
