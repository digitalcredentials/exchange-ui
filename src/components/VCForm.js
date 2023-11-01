import { FormContainer, TextareaAutosizeElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import {useState, useCallback} from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import defaultValues from '../templates/defaultValues.js'
import postData from '../utilities/postData.js';
import JSONInput from './JSONInput.js';

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
    p: 5,
    my: 1,
    mx: 5,
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

const initialContent = {
    hello: 'world',
    count: 1,
    foo: ['bar', 'car']
  }


export default function VCForm({ setResult }) {

    const [jsonContent, setJsonContent] = useState({ json: defaultValues })
  const handler = useCallback(
    (content, previousContent, status) => {
      setJsonContent(content)
    },
    [jsonContent]
  )

    const handleSubmit = () => {
        postData(`${exchangeHost}/exchange/setup`, jsonContent.json).then((response) => {
            setResult(response)
        });
    }

    return (
        
            <Paper
                style={{
                    display: "grid",
                    gridRowGap: "20px",
                    padding: "20px",
                    margin: "10px 50px",
                }}
            >
                <Typography gutterBottom sx={{ px:8, pt:2 }}>
                    Add your unsigned verifiable credentials here, modifying the example below or replacing with your own verifiable credentials, then submit.
                    The system will store your data and generate deeplinks that you can email or otherwise distribute to recipients.
                </Typography>

                <Typography sx={{ px:8, pt:1 }}>
                    This is the basic structure of the data that is submitted:
                </Typography>
                <Box sx={{
                    textAlign: 'left',
                    border: '1px solid',
                    p: 5,
                    mx: 5,
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
            "timeToLive": 600000 
        },
      {
            "vc": {another vc},
            "retrievalId": "anotherId"
        }
    ]
}`}
                    </pre>
                    </Box>
                    <Typography sx={{ px:8, pt:2 }}>The `timeToLive` property indicates how long the server should keep the deeplink active. 60000 (sixty thousand) milliseconds is one minute, so adjust accordingly. For example, multiply by ten to get 600000 (six hundred thousand) which is ten minutes.</Typography>
                
                    <Typography  sx={{ px:8, pt:2 }}>
                    Note that you can submit data for more than one credential at a time, as we show in the example below.
                    Use the retrievalId to identify each specific deeplink in the returned deeplinks.
                </Typography>

                <Typography sx={{ px:8, pt:2 }}>
                    Add your data in the field below (we've prepopulated it with a working example that you can change as you like):
                </Typography>
                
                <JSONInput content={jsonContent} onChange={handler} />

               
                <br />
                <Button onClick={handleSubmit} label="Submit" variant="outlined" sx={{ m: 6 }}>Generate DeepLinks</Button>
            </Paper>
     
    )
}

/*

<FormContainer
            defaultValues={{ cred_data: defaultValues }}
            onSuccess={onSubmit}
        >

 <TextareaAutosizeElement sx={textAreaStyle} name="cred_data" label="Credential Data" rows={5} required />

   </FormContainer>
 */