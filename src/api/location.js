import Taro from '@tarojs/taro'

const getLocation = () => {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export default ({
  getLocation
})