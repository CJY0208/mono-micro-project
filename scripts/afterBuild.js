const rimraf = require('rimraf')
const fs = require('fs-extra')

rimraf.sync('./dist')

try {
  fs.copySync('./modules/app/dist', './dist', {
    overwrite: true,
  })
} catch (err) {
  console.error(err)
}

// const legacyModules = {
//   vue: 'dist',
//   react: 'build',
// }

// Object.entries(legacyModules).forEach(([name, distDir]) => {
//   try {
//     fs.copySync(`./legacies/${name}/${distDir}`, `./dist/${name}`, {
//       overwrite: true,
//     })
//   } catch (err) {
//     console.error(err)
//   }
// })

const microModules = {
  'demo-react-1': 'dist',
  'demo-react-2': 'dist',
  'demo-vue-1': 'dist',
  'demo-vue-2': 'dist',
}

Object.entries(microModules).forEach(([name, distDir]) => {
  try {
    fs.copySync(`./modules/${name}/${distDir}`, `./dist/${name}`, {
      overwrite: true,
    })
  } catch (err) {
    console.error(err)
  }
})
