const fs = require('fs')
const path = require('path')
const { argv } = require('yargs')

const PkgGenerator = require('./generators/PkgGenerator')

const br = `
`
if (!argv.name) {
  console.log('请使用 --name=XXX 参数提供模块名')
  process.exit(0)
}

const cwd = process.cwd()
const names = argv.name.split(',')
const template = argv.template || 'micro-react-vite'

async function create(name) {
  if (argv.force || !fs.existsSync(path.join(cwd, `./modules/${name}`))) {
    await new PkgGenerator({
      name,
      cwd,
      template,
    }).run()
  } else {
    console.log(`/modules/${name} 已存在，取消创建源码`)
  }
}

async function run() {
  await Promise.all(names.map(create))
}

run()
