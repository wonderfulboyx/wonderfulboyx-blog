// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMdx = require('@next/mdx')

module.exports = withMdx({
  extension: /\.(md|mdx)$/,
})
