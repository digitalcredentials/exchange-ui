import { IconButton, Button, Snackbar, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react'

const CopyButton = ({text, buttonText, handleClick}) => {
  return buttonText?
  <Button sx={{width:300}} onClick={handleClick} variant="outlined" endIcon={<ContentCopyIcon />} > {buttonText} </Button>
  :
    <IconButton onClick={handleClick}><ContentCopyIcon/></IconButton>
    
    
}
const CopyToClipboard = ({text, buttonText}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(text)
    }
    
    return (
        <>
          <Tooltip title="Copy to Clipboard " sx={{p:1}}><CopyButton text={text} buttonText={buttonText} handleClick={handleClick}/></Tooltip>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2500}
            message="Copied to clipboard"
          />
        </>
    )
}

export default CopyToClipboard