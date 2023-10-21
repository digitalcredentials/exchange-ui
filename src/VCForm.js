import { FormContainer, TextareaAutosizeElement, SelectElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
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
        "label": "10 minutes"
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
        "label": "One week"
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
        >


            <Typography gutterBottom sx={{ p: 2 }}>
                Add your unsigned verifiable credentials here, modifying the example below or replacing with your own verifiable credentials, then submit.
                The system will store your data and generate deeplinks that you can email or otherwise distribute to recipients.
            </Typography>

            <Typography sx={{ pt: 2 }}>
                This is the basic structure of the data that is submitted:
            </Typography>
            <Box sx={{
                textAlign: 'left',
                border: '1px solid',
                p: 5,
                m: 5,
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                borderRadius: 2,
            }}>
                <pre >
                    {`{
    "tenantName": "test",
    "data": [
        {
            "vc": {your vc goes here},
            "retrievalId": "someId",
            "timeToLive": 600000 // milliseconds - optional to override default 
        },
      {
            "vc": {another vc},
            "retrievalId": "anotherId"
        }
    ]
}`}
                </pre>

                <Typography>The `timeToLive` property indicates how long the server should keep the deeplink active. 60000 (sixty thousand) milliseconds is one minute, so adjust accordingly. For example, multiply by ten to get 600000 (six hundred thousand) which is ten minutes.</Typography>
            </Box>
            <Typography variant="h6" gutterBottom sx={{ m: 5 }}>
                Add your data here (we've prepopulated the field with a working example that you can odify as you like):
            </Typography>
            <Typography gutterBottom>
                Note that you can submit data for more than one credential at a time.
                Use the linkName to identify each specific deeplink in the returned deeplinks.
            </Typography>

            <TextareaAutosizeElement sx={textAreaStyle} name="cred_data" label="some label" rows={5} required />

            <br />
            <Button type="submit" label="Submit" variant="outlined" sx={{ m: 6 }}>Generate DeepLinks</Button>

        </FormContainer>
    )
}