import { useEffect, useRef } from 'react'
import { JSONEditor, createAjvValidator } from 'vanilla-jsoneditor'


const schema = {
  title: 'Employee',
  description: 'Object containing employee details',
  type: 'object',
  properties: {
    firstName: {
      title: 'First Name',
      description: 'The given name.',
      examples: ['John'],
      type: 'string'
    },
    lastName: {
      title: 'Last Name',
      description: 'The family name.',
      examples: ['Smith'],
      type: 'string'
    },
    gender: {
      title: 'Gender',
      enum: ['male', 'female']
    },
    availableToHire: {
      type: 'boolean',
      default: false
    },
    age: {
      description: 'Age in years',
      type: 'integer',
      minimum: 0,
      examples: [28, 32]
    },
    job: {
      $ref: 'job'
    }
  },
  required: ['firstName', 'lastName']
}

const schemaDefinitions = {
  job: {
    title: 'Job description',
    type: 'object',
    required: ['address'],
    properties: {
      company: {
        type: 'string',
        examples: ['ACME', 'Dexter Industries']
      },
      role: {
        description: 'Job title.',
        type: 'string',
        examples: ['Human Resources Coordinator', 'Software Developer'],
        default: 'Software Developer'
      },
      address: {
        type: 'string'
      },
      salary: {
        type: 'number',
        minimum: 120,
        examples: [100, 110, 120]
      }
    }
  }
}
//const validator = createAjvValidator({ schema, schemaDefinitions })

const JSONInput = (props) => {
  const refContainer = useRef(null)
  const refEditor = useRef(null)

  useEffect(() => {
    refEditor.current = new JSONEditor({
      target: refContainer.current,
      props: {
      //  validator,
        mode: 'text',
        onRenderMenu: (items, context) => {
          return items.filter(item=>item.text!=='table' && !['jse-transform', 'jse-sort'].includes(item.className))
        }
      }
    })
    
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