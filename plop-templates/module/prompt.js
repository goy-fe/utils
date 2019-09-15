const { resolve } = require('path')
const { noEmpty } = require('../utils')

module.exports = {
  description: 'Generate a new Module',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Module name please',
      validate: noEmpty('name'),
    },
  ],

  actions: data => {
    const name = data.name
    const camelName = `{{camelCase name}}`
    const actions = [
      { path: `src/${camelName}/index.js`, template: `index` },
      { path: `src/${camelName}/__test__/index.test.js`, template: `test` },
    ].map(({ path, template }) => ({
      type: 'add',
      path,
      templateFile: resolve(__dirname, `${template}.hbs`),
      data: { name },
    }))

    return actions
  },
}
