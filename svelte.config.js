const path = require('path')
const sass = require('sass')
const fiber = require('fibers')

const style_dir = path.join(__dirname, 'scss')
const prepend_content = '@import "helpers";\n'

module.exports = {
  preprocess: {
    style: async ({ content, attributes, filename }) => {
      const { type, lang } = attributes
      if (type !== 'text/scss' && lang !== 'scss') return
      content = prepend_content + content

      return new Promise((resolve, reject) => {
        sass.render(
          {
            data: content,
            sourceMap: true,
            includePaths: [path.dirname(filename), style_dir, 'node_modules'],
            outFile: 'x', // this is necessary, but is ignored
            fiber,
          },
          (err, result) => {
            if (err) return reject(err)

            resolve({
              code: result.css.toString(),
              map: result.map.toString(),
            })
          }
        )
      })
    },
  },
}
