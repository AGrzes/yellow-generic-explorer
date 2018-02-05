import _ from 'lodash'

function label(entity) {
  if (entity) {
    return entity.label || entity.name || _.startCase(entity.key)
  }
}


export {
  label
}
