const axios = require('axios')
const _ = require('lodash')
const {identity,isRelation} = require('./metadata')
module.exports = axios.get('/data').then(_.property('data')).then((data)=>{
  const extractEntities = (entity)=>{
    if (entity && _.isObject(entity)){
      return [entity,..._(entity).flatMap((target,name)=>{
        if (isRelation(entity,name)){
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
      if (isRelation(item,name)){
        if (_.isString(target)){
          item[name] = itemMap[target] || target
        } else if (_.isArray(target)){
          item[name] = _.map(target,(targetItem)=> itemMap[targetItem] || targetItem)
        }
      }
    })
  })
  return {
    items: _.values(itemMap),
    find(key){
      return itemMap[key]
    }
  }
})
