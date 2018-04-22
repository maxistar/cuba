const buildUrl = require('../build-url')
const defaultQuery = require('../default-query')
const googleApiClient = require('./google-api-client')
const identity = require('../identity')
const parse = require('./parse')

module.exports = async function (spreadsheetId, serviceAccountCredentials) {
  if (spreadsheetId == null) {
    throw new Error('Need a spreadsheet ID')
  }
  const request = googleApiClient(serviceAccountCredentials)
  return async function (query, options) {
    const url = buildUrl(spreadsheetId, query || defaultQuery, options)
    const json = await request(url)
    return parse(json.table, (options && options.transform) || identity)
  }
}
