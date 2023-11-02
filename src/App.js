
import './App.css';
import { useState, useRef, useEffect } from 'react'

import Typography from '@mui/material/Typography'
import ExpandableCard from './components/ExpandableCard.js';
import { Paper } from '@mui/material'; 
import VCForm from './components/VCForm';
import VCBuilderForm from './components/VCBuilderForm';
import DeepLinkResults from './components/DeepLinkResults';



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
        Temporarily stores credentials for collection from a wallet. To use, either:
      </Typography>

     
      <ExpandableCard title="Submit your own preconstructed Verifiable Credentials">
        <VCForm setResult={setResult} />
      </ExpandableCard>

      <ExpandableCard title="Use a form to submit data for a Verifiable Credential">
        <VCBuilderForm setResult={setResult} />
      </ExpandableCard>

     <DeepLinkResults result={result}/>

      <Typography gutterBottom >
        This service stores the credentials temporarily and gives you an http link for each credential. 
      </Typography>

      <Typography gutterBottom >
        Email or otherwise give the link to the recipient. When clicked, the link will open the wallet and add the credential.
      </Typography>  

      <Typography gutterBottom>
        You may specify how long the service should keep the deep links active. By default they are kept for 10 minutes. No data is kept beyond the life of the link.
      </Typography>

      <div ref={messagesEndRef} />
     
      </Paper>
    </div>
  );
}

export default App;
