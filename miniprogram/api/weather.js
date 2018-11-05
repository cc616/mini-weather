const API_URL = 'https://free-api.heweather.com/s6/weather'

const username = 'HE1811041804531572'

const getWeather = (lat, lon, success = () => {}, fail = () => {}) => {
  const url = `${API_URL}/forecast?location=chengdu&key=${username}`
  return wx.request({
    url,
    success,
    fail
  })
}

module.exports = {
  getWeather,
}