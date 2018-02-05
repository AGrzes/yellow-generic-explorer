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

function attributes(entity){
  if (entity){
    return _(Object.getOwnPropertyNames(entity)).filter((name) => !_.startsWith(name, '@') && name !== '__ob__').map((name) => ({
      name,
      label: _.startCase(name),
      value: entity[name]
    })).value()
  }
}

export {
  label,
  identity,
  attributes
}
