/** 
 * this is a customization of the createAjvValidator 
 * utility in the JSONEditor distribution so as to:
 * - support async remote loading of schemas from urls
 * - use the draft-2019-09 version of JSON schema
 * - add JSON Schema formats for Ajv 
*/
import AjvDist from 'ajv/dist/2019'
import addFormats from "ajv-formats"
import { parsePath } from 'immutable-json-patch'

/**
 * Creates a JSON Schema validator using Ajv.
 * @param schema The JSON schema to validate (required).
 * @return Returns a function - validate - specific to JSONEditor
 */
export default async function createAjvValidator(schema) {

    const ajv = new AjvDist({
        allErrors: true,
        verbose: true,
        $data: true,
        loadSchema
    })
    addFormats(ajv)

    const validateAjv = await ajv.compileAsync(schema)

    if (validateAjv.errors) {
        throw validateAjv.errors[0]
    }

    return function validate(json) {
        validateAjv(json)
        const ajvErrors = validateAjv.errors || []
        return ajvErrors.map(improveAjvError).map((error) => normalizeAjvError(json, error))
    }
}

const loadSchema = async (uri) => {
    const response = await fetch(uri);
    const theSchema = await response.json();
    return theSchema 
}

function normalizeAjvError(json, ajvError) {
    return {
        path: parsePath(json, ajvError.instancePath),
        message: ajvError.message || 'Unknown error',
        severity: 'warning'
    }
}

/**
 * Improve the error message of a JSON schema error,
 * for example list the available values of an enum.
 *
 * @param {Object} ajvError
 * @return {Object} Returns the error with improved message
 */
function improveAjvError(ajvError) {
    if (ajvError.keyword === 'enum' && Array.isArray(ajvError.schema)) {
        let enums = ajvError.schema
        if (enums) {
            enums = enums.map((value) => JSON.stringify(value))

            if (enums.length > 5) {
                const more = ['(' + (enums.length - 5) + ' more...)']
                enums = enums.slice(0, 5)
                enums.push(more)
            }
            ajvError.message = 'should be equal to one of: ' + enums.join(', ')
        }
    }

    if (ajvError.keyword === 'additionalProperties') {
        ajvError.message = 'should NOT have additional property: ' + ajvError.params.additionalProperty
    }

    return ajvError
}