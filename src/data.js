const axios = require('axios')
const _ = require('lodash')
const {identity} = require('./metadata')
module.exports = axios.get('/data').then(_.property('data')).then((data)=>{
  const extractEntities = (entity)=>{
    if (entity && _.isObject(entity)){
      return [entity,..._(entity).flatMap((target,name)=>{
        if (_.startsWith(name,'@')){
          return extractEntities(target)
        } else {
          return []
        }
      })]
    } else {
      return []
    }
  }
  const itemMap =_(data.items).flatMapDeep(extractEntities).keyBy(identity).value()
  _.forEach(itemMap,(item)=>{
    _.forEach(item,(target,name)=>{
      if (_.startsWith(name,'@') &&_.isString(target) && itemMap[target]){
        item[name] = itemMap[target]
      }
    })
  })
  return {
    items: _.values(itemMap)
  }
})
