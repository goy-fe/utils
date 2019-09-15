const generators = [
  'module',
]

module.exports = plop => {
  generators.map(v => plop.setGenerator(v, require(`./plop-templates/${v}/prompt`)))
}
