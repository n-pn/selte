const sass = require('node-sass')
const preprocess = require('@nipin/melte/configs/preprocess')

return preprocess(__dirname, sass)
