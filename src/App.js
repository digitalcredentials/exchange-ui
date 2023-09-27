
import './App.css';
import defaultValues from './defaultValues.js'
import { useState, useRef, useEffect } from 'react'
import { FormContainer, TextareaAutosizeElement } from 'react-hook-form-mui'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const exchangeHost = process.env.REACT_APP_PUBLIC_EXCHANGE_HOST

const deepLinkStyle = {
  bgcolor: (theme) =>
    theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
  color: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
  border: '1px solid',
  borderColor: (theme) =>
    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
  borderRadius: 2,
  p: 2,
  m: 3,
  fontSize: '0.7rem',
  fontWeight: '100'
}

async function postData(url = "", data = {}) {

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: data
  });
  return response.json();
}



function Form({ setResult }) {
  return (
    <FormContainer
      defaultValues={{ cred_data: defaultValues }}
      onSuccess={data => {
        //console.log(data);
        postData(`${exchangeHost}/exchange/setup`, data.cred_data).then((response) => {
          console.log(response);
          setResult(response)

        });
      }}
    >
      <TextareaAutosizeElement sx={{
        width: '75%',
        p: 5,
        my: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
        color: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        textAlign: 'center'


      }} name="cred_data" label="" rows={5} required />

      <br />
      <div>
        <Button
          type="submit"
          label="Submit"
          variant="outlined"
          sx={{ m: 6 }}
        >Generate DeepLinks</Button>
      </div>
    </FormContainer>
  )
}

function App() {
  const [result, setResult] = useState();

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [result]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Wallet exchanger
        </p>
      </header>

      <Typography gutterBottom sx={{ p: 2 }}>
        Add your unsigned verifiable credentials here, modifying the example below or replacing with your own verifiable credential, then submit.
        The system will store your data and generate deeplinks that you can email, or otherwise distribute to recipients.
      </Typography>
      <Typography>
        Note that you can submit data for more than one credential at a time.
        Use the retrievalId to identify each specific deeplink in the returned deeplinks.
      </Typography>
      <Typography>
        The example below might be a bit hard to read because of the verifiable credential - to make it a bit clearer,
        this is the basic structure of the data that is submitted:
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
            "timeToLive": 60000 // milliseconds - optional to override default 
        },
      {
            "vc": {another vc},
            "retrievalId": "anotherId"
        }
    ]
}`}
        </pre>

      </Box>

      <Form setResult={setResult} />
      {result ? <div>

        <Typography variant="h5" gutterBottom sx={{ m: 5 }}>
          Here are your deep links. You can email or otherwise distribute them to recipients.
        </Typography>

        {result.map(link => (<p><Typography> {link.retrievalId}:</Typography> <Typography sx={deepLinkStyle}> {link.directDeepLink}</Typography></p>))}
      </div>
        : ""
      }

      <div ref={messagesEndRef} />

    </div>
  );
}

export default App;
