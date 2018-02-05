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

export {
  label,
  identity
}
