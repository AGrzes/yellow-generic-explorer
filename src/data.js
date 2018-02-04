const axios = require('axios')
const _ = require('lodash')
module.exports = axios.get('/data').then(_.property('data'))
