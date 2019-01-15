import Taro from '@tarojs/taro'

const MAP_KEY = '24HBZ-NFURI-GRHGO-5PMUH-IYNF5-PKFSJ'

const getGeocoder = (lat, lon) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${lat},${lon}`,
        key: MAP_KEY,
        get_poi: 0
      },
      success: res => resolve(res),
      fail: (error) => reject(error)
    })
  })
}

export default ({
  getGeocoder
})
