const MAP_KEY = '24HBZ-NFURI-GRHGO-5PMUH-IYNF5-PKFSJ'

module.exports = (latitude, longitude, success = () => {}, fail = () => {}) => {
  return wx.request({
    url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    data: {
      location: `${latitude},${longitude}`,
      key: MAP_KEY,
      get_poi: 0
    },
    success,
    fail
  })
}
