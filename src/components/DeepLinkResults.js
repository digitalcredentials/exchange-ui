import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CopyToClipboard from './CopyToClipboard'

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

export default function DeepLinkResults({ result }) {

    if (result && result.length > 1) {
        return (
            <>
                <Typography variant="h5"  sx={{ mt: 5 }}>
                    Here are your deep links. You can email or otherwise distribute them to recipients. Each link is identified by the 'linkId' you provided when submitting the credentials.
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                    }}>
                <CopyToClipboard buttonText={"Copy All Links To Clipboard"} text={result.map(link => `${link.retrievalId}:  ${link.directDeepLink}`).join(' \n')} />
                </Box>
                {result.map(link => (<p><Typography> {link.retrievalId}:</Typography> <Typography sx={deepLinkStyle}> {link.directDeepLink}<CopyToClipboard text={link.directDeepLink} /></Typography></p>))}
            </>
        )
    }

    if (result && result.length === 1) {
        return (
            <>
                <Typography variant="h5" sx={{ mt: 5 }}>
                    Here is your deep link. You can email or otherwise give it to the intended recipient.
                </Typography>
                <p> <Typography sx={deepLinkStyle}> {result[0].directDeepLink}<CopyToClipboard text={result[0].directDeepLink} /></Typography></p>
            </>
        )
    }
}