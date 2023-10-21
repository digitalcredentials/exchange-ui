
import './App.css';
import { useState, useRef, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import ExpandableCard from './ExpandableCard.js';
import VCForm from './VCForm';
import VCBuilderForm from './VCBuilderForm';

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
          Credential Collector
        </p>
      </header>

      <Typography gutterBottom sx={{ p: 2 }}>
        Temporarily stores credentials for collection from a wallet.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        1. Submit preconstructed, but unsigned, verifiable credentials.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        2. This service stores the credentials temporarily and gives you an http link for each credential that can be used to add the credential to a wallet.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        3. Email or otherwise give the link to the recipient.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        4. When the recipient clicks the link, the wallet opens and requests the credential from this service.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        5. The wallet provides the recipient's DID, which we add to the credential before signing and returning the credential.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        You also have the option of using the form below to have the system build a verifiable credential for you from data you provide in the form.
      </Typography>

      <Typography gutterBottom sx={{ p: 2 }}>
        You may specify how long the service should keep the deep link active. By default it is kept for 10 minutes. No data is kept beyond the life of the link.
      </Typography>

      <ExpandableCard title="Submit your own preconstructed Verifiable Credentials">
        <VCForm setResult={setResult} />
      </ExpandableCard>

      <ExpandableCard title="Use a form to submit data for a Verifiable Credential">
        <VCBuilderForm setResult={setResult} />
      </ExpandableCard>

      {result ? <div>

        <Typography variant="h5" gutterBottom sx={{ m: 5 }}>
          Here are your deep links. You can email or otherwise distribute them to recipients. Each link is identified by the linkName you provided when submitting the credentials.
        </Typography>

        {result.map(link => (<p><Typography> {link.linkName}:</Typography> <Typography sx={deepLinkStyle}> {link.directDeepLink}</Typography></p>))}
      </div>
        : ""
      }

      <div ref={messagesEndRef} />

    </div>
  );
}

export default App;
