/* eslint @typescript-eslint/no-var-requires: 0 */
const withMdx = require('@next/mdx')
require('dotenv').config()

module.exports = withMdx({
  extension: /\.(md|mdx)$/,
})({
  env: {
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID
  }
})
