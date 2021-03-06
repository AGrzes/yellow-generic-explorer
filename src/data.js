const axios = require('axios')
const _ = require('lodash')
const {identity,isRelation,reversedRelation} = require('./metadata')

function setProperty(target,property,value){
  if (target){
    if (target[property]){
      target[property] = _.flattenDeep([target[property],value])
    } else {
      target[property] = value
    }

  }
}

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
  const itemMap =_(data.items).flatMapDeep(extractEntities).filter(identity).keyBy(identity).value()
  _.forEach(itemMap,(item)=>{
    _.forEach(item,(target,name)=>{
      if (isRelation(item,name)){
        const reverse = reversedRelation(item,name)
        if (_.isString(target)){
          item[name] = itemMap[target] || target
          if (reverse && itemMap[target]){
            setProperty(itemMap[target],reverse,item)
          }
        } else if (_.isArray(target)){
          item[name] = _.map(target,(targetItem)=> itemMap[targetItem] || targetItem)
          if (reverse){
            _.forEach(target,(targetItem)=>setProperty(itemMap[targetItem],reverse,item))
          }
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
