import { FormContainer, TextareaAutosizeElement, SelectElement, TextFieldElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import postData from '../utilities/postData.js';
import buildVC from '../templates/buildVC.js';

const exchangeHost = process.env.REACT_APP_PUBLIC_EXCHANGE_HOST

const textAreaStyle = {
    bgcolor: (theme) =>
        theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
    color: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
    border: '1px solid',
    borderColor: (theme) =>
        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
    borderRadius: 2,
    width: '75%',
    p: 5,
    my: 1,
    fontSize: '0.875rem',
    fontWeight: '700',
    textAlign: 'center'
}

const options = [
    {
        "id": "600000",
        "label": "Ten Minutes"
    },
    {
        "id": "3600000",
        "label": "One Hour"
    },
    {
        "id": "86400000",
        "label": "One Day"
    },
    {
        "id": "604800000",
        "label": "One Week"
    },
    {
        "id": "2419200000",
        "label": "One Month"
    },
    {
        "id": "14515200000",
        "label": "Six Months"
    }
]

export default function VCForm({ setResult }) {

    const onSubmit = data => {
        console.log("Submitted data:")
        console.log(data);
        const vc = buildVC(data)
        console.log("the vc: ")
        console.log(vc)
        // NEXT: construct the VC here, before submitting
        postData(`${exchangeHost}/exchange/setup`, vc).then((response) => {
            console.log("Server Response:");
            console.log(response);
            setResult(response)
        });
    }

    return (
        <FormContainer
            defaultValues={{
                issuerName: "a test issuer",
                issuerURL: "http://dcconsortium.org",
                credentialName: "A test credential",
                tenantName: 'test',
                expirationDate: '2024-10-23'
            }}
            onSuccess={onSubmit}
        >
            <Paper
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px",
                    margin: "10px 50px",
                }}
            >
                <Divider><Chip label="Issuer" /></Divider>

                <TextFieldElement name="issuerName" label="Issuer Name" required />
                <TextFieldElement name="issuerDescription" label="Issuer Description" />
                <TextFieldElement name="issuerImage" label="Issuer Image URL" helperText="A URL that returns the image. " />
                <TextFieldElement name="issuerURL" label="Issuer URL" required />


                <Divider><Chip label="Recipient" /></Divider>

                <TextFieldElement name="recipientName" label="Credential Recipient Name" />

                <Divider><Chip label="Credential" /></Divider>

                <TextFieldElement name="credentialName" label="Credential Name" required />
                <TextFieldElement name="credentialImage" label="Credential Image" />
                <TextareaAutosizeElement sx={textAreaStyle} name="credentialDescription" label="Credential Description" rows={3} />
                <TextareaAutosizeElement sx={textAreaStyle} name="credentialCriteria" label="Credential Criteria" rows={5} />

                <Divider><Chip label="Dates" /></Divider>

                <TextFieldElement name="issuanceDate" label="Issuance Date" helperText="e.g., 2023-10-23" />
                <TextFieldElement name="expirationDate" label="Expiration Date" helperText="e.g., 2024-10-23" />

                <Divider><Chip label="Signing Tenant" /></Divider>

                <TextFieldElement name="tenantName" label="Tenant Name" helperText="The default is 'test'." />
                <TextFieldElement name="tenantToken" label="Tenant Token" helperText="Requires a token if this is a private tenant." />

                <Divider><Chip label="Link" /></Divider>

                <SelectElement name="timeToLive" label="Link availability" options={options} sx={{ minWidth: "150px" }} helperText="How long to keep the link available." />
                <br />
                <Button type="submit" label="Submit" variant="outlined" sx={{ m: 6 }}>Generate DeepLink</Button>
            </Paper>
        </FormContainer>
    )
}