import { FormContainer, TextareaAutosizeElement, SelectElement, TextFieldElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import defaultValues from './defaultValues.js'
import postData from './postData.js';

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
       // NEXT: construct the VC here, before submitting
        postData(`${exchangeHost}/exchange/setup`, data.cred_data).then((response) => {
            console.log("Server Response:");
            console.log(response);
            setResult(response)
        });
    }

    return (
        <FormContainer
            defaultValues={{ cred_data: defaultValues }}
            onSuccess={onSubmit}
        >    <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 300px",
        }}
      >
            <TextFieldElement name="recipient_name" label="Credential Recipient Name" required />
            <TextFieldElement name="issuer_name" label="Issuer Name" required />
            <TextFieldElement name="issuer_image" label="Issuer Image (URL)" required />
            <TextFieldElement name="cred_name" label="Credential Name" required />
            <TextFieldElement name="cred_image" label="Credential Image" required />
            /* expiration date and issuance date */
            <TextareaAutosizeElement sx={textAreaStyle} name="cred_description" label="Credential Description" rows={3} required />
            <TextareaAutosizeElement sx={textAreaStyle} name="cred_criteria" label="Credential Criteria" rows={5} required />


            <br />
            <SelectElement name="ttl" label="Time To Live" options={options} sx={{ minWidth: "150px" }} />
            <br />
            <Button type="submit" label="Submit" variant="outlined" sx={{ m: 6 }}>Generate DeepLinks</Button>
</Paper>
        </FormContainer>
    )
}