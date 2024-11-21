export default {
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
                    "id": "did:key:z6MkhVTX9BF3NGYX6cc7jWpbNnR7cAjH8LUffabZP8Qu4ysC",
                    "type": "Profile",
                    "name": "University of Wonderful",
                    "description": "The most wonderful university",
                    "url": "https://wonderful.edu/",
                    "image": {
                        "id": "https://user-images.githubusercontent.com/947005/133544904-29d6139d-2e7b-4fe2-b6e9-7d1022bb6a45.png",
                        "type": "Image"
                    }
                },
                "issuanceDate": "2020-01-01T00:00:00Z",
                "name": "A Simply Wonderful Course",
                "credentialSubject": {
                    "name": "Sam Smith",
                    "type": "AchievementSubject",
                    "achievement": {
                        "id": "http://wonderful.wonderful",
                        "type": "Achievement",
                        "criteria": {
                            "narrative": "Completion of the Wonderful Course - well done you!"
                        },
                        "description": "Wonderful.",
                        "name": "Introduction to Wonderfullness"
                    }
                }
            },
            "retrievalId": "SamSmithCertificate",
            "timeToLive": 600000
        },
        {
            "vc": {
                "@context": [
                    "https://www.w3.org/ns/credentials/v2",
                    "https://purl.imsglobal.org/spec/ob/v3p0/context-3.0.3.json",
                    "https://w3id.org/security/suites/ed25519-2020/v1"
                ],
                "id": "http://example.com/credentials/3527",
                "type": [
                    "VerifiableCredential",
                    "OpenBadgeCredential"
                ],
                "issuer": {
                    "id": "did:key:z6MkkymVMacFp8AiVkGnMfovuiGwRY3m9XNWJ7H9PYZaRidR",
                    "type": [
                        "Profile"
                    ],
                    "name": "Example Corp"
                },
                "validFrom": "2010-01-01T00:00:00Z",
                "name": "Teamwork Badge",
                "credentialSubject": {
                    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
                    "type": [
                        "AchievementSubject"
                    ],
                    "achievement": {
                        "id": "https://example.com/achievements/21st-century-skills/teamwork",
                        "type": [
                            "Achievement"
                        ],
                        "criteria": {
                            "narrative": "Team members are nominated for this badge by their peers and recognized upon review by Example Corp management."
                        },
                        "description": "This badge recognizes the development of the capacity to collaborate within a group environment.",
                        "name": "Teamwork"
                    }
                }
            },
            "retrievalId": "ExampleCorpCertificate",
            "timeToLive": 600000
        }
        
    ]
}