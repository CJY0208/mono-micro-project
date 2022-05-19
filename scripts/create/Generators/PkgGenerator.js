const { Generator } = require('@umijs/utils')
const path = require('path')

class PkgGenerator extends Generator {
  constructor({ name, template, ...prop }) {
    super(prop)
    this.name = name
    this.template = template
  }

  async writing() {
    this.copyDirectory({
      context: {
        name: this.name,
        template: this.template,
      },
      path: path.join(this.cwd, `./templates/${this.template}`),
      target: path.join(this.cwd, `./modules/${this.name}`),
    })
  }
}

module.exports = PkgGenerator
