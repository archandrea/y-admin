const fs = require('node:fs/promises')

let src, dest
// TODO: 请配置好src和dest再使用
// start()

async function start() {
  if (['--portal', '--login'].includes(process.argv[2])) {

    if (process.argv[2] === '--portal') {
      src = './dist/portal'
      dest = '/path/to/destination'
    } else {
      src = './dist/login'
      dest = '/path/to/destination'
    }

    try {
      let res = await fs.access('../dg-portal/src/main/webapp/pages', fs.constants.W_OK)
      await updateDist(process.argv[2])
      console.log('dist已更新至：' + dest + '\n可以直接提交！')
    } catch (err) {
      console.log(err)
    }
  } else {
    console.log('no target')
  }
}

async function updateDist() {
  try {
    await deleteFormerDist()
    await copyNewDist()
  } catch (err) {
    console.log(err)
  }
}

function deleteFormerDist() {
  return fs.rm(dest, { recursive: true })
}

function copyNewDist() {
  return fs.cp(src, dest, { recursive: true })
}