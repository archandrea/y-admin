const viewGenerator = require('./plop-templates/view/prompt')
const viewTableGenerator = require('./plop-templates/view-table/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt.js')

module.exports = function(plop) {
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('view-table', viewTableGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
