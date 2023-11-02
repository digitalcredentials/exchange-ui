import { useEffect, useRef } from 'react'
import { JSONEditor } from 'vanilla-jsoneditor'
import createAjvValidator from '../utilities/createAjvValidator.js'
import submissionSchema from '../schemas/submission.js'
import { parse, stringify } from 'lossless-json'

const parser = { parse, stringify }

const testSchema = {
  title: 'Credentials',
  description: 'Object containing credentials for collection.',
  type: 'object',
  required: ['tenantName'],
  properties: {
    tenantName: {
      title: 'Tenant',
      description: 'The tenant with which to sign.',
      type: 'string'
    }
  }
}


const JSONInput = (props) => {
  const refContainer = useRef(null)
  const refEditor = useRef(null)

  useEffect(() => {

     const addValidator = async () => {
      const validator = await createAjvValidator(submissionSchema)
      refEditor.current.updateProps({validator})
    } 
    
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      
      props: {
        parser,
        mode: 'text',
        onRenderMenu: (items, context) => {
          return items.filter(item=>item.text!=='table' && !['jse-transform', 'jse-sort'].includes(item.className))
        }
      }
    })

    addValidator()

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy()
        refEditor.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props)
    }
  }, [props])

  return <div ref={refContainer} />
}

export default JSONInput