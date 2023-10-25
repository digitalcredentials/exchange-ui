
import './App.css';
import { useState, useRef, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import ExpandableCard from './components/ExpandableCard.js';
import { Paper, Box } from '@mui/material'; 
import VCForm from './components/VCForm';
import VCBuilderForm from './components/VCBuilderForm';
import DeepLinkResults from './components/DeepLinkResults';
import { AlignHorizontalLeft } from '@mui/icons-material';



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
    <div >
      <header className="App-header">
        <p>
          Credential Collector
        </p>
      </header>
      <Paper
        style={{
          display: "grid",
          gridRowGap: "20px",
          padding: "20px",
          margin: "10px 50px",
        }}
      >
      <Typography gutterBottom sx={{ p: 2 }}>
        Temporarily stores credentials for collection from a wallet. To use:
      </Typography>

      <Typography gutterBottom >
        1. Submit preconstructed unsigned verifiable credentials, or use the form to generate an unsigned verifiable credential.
      </Typography>

      <Typography gutterBottom >
        2. This service stores the credentials temporarily and gives you an http link for each credential. The link can be used to add the credential to a wallet.
      </Typography>

      <Typography gutterBottom >
        3. Email or otherwise give the link to the recipient.
      </Typography>

      <Typography gutterBottom >
        4. When the recipient clicks the link, the wallet opens and requests the credential from this service.
      </Typography>

      <Typography gutterBottom >
        5. The wallet provides the recipient's DID, which we add to the credential before signing and returning the credential.
      </Typography>
    

      <Typography gutterBottom sx={{ p: 1 }}>
        You may specify how long the service should keep the deep links active. By default they are kept for 10 minutes. No data is kept beyond the life of the link.
      </Typography>

      <ExpandableCard title="Submit your own preconstructed Verifiable Credentials">
        <VCForm setResult={setResult} />
      </ExpandableCard>

      <ExpandableCard title="Use a form to submit data for a Verifiable Credential">
        <VCBuilderForm setResult={setResult} />
      </ExpandableCard>

     <DeepLinkResults result={result}/>

      <div ref={messagesEndRef} />
     
      </Paper>
    </div>
  );
}

export default App;
