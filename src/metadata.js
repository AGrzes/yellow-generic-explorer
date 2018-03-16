import _ from 'lodash'

function label(entity) {
  if (entity) {
    return entity.label || entity.name || _.startCase(entity.key)
  }
}

function identity(entity){
  if (entity) {
    return entity.key || _.kebabCase(label(entity))
  }
}

function isRelation(entity,property){
  return _.startsWith(property, '@')
}

function isInternal(entity,property){
  return _.startsWith(property, '$')
}

function reversedRelation(entity,property){
  return `@reversed-${property}`
}

function attributes(entity){
  if (entity){
    return _(Object.getOwnPropertyNames(entity)).filter((name) => !isRelation(entity,name) && name !== '__ob__' && !isInternal(entity,name)).map((name) => ({
      name,
      label: _.startCase(name),
      array: _.isArray(entity[name]),
      value: entity[name]
    })).value()
  }
}

function relations(entity){
  if (entity){
    return _(Object.getOwnPropertyNames(entity)).filter((name) => isRelation(entity,name) && name !== '__ob__' && !isInternal(entity,name)).map((name) => ({
      name,
      label: _.startCase(name),
      array: _.isArray(entity[name]),
      entity: entity[name]
    })).value()
  }
}

export {
  label,
  identity,
  attributes,
  relations,
  isRelation,
  isInternal,
  reversedRelation
}
