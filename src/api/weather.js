import Taro from '@tarojs/taro'

const API_URL = 'https://free-api.heweather.com/s6'

const username = 'HE1811041804531572'

const getWeekWeather = (lat, lon) => {
  const url = `${API_URL}/weather/forecast?location=${lat},${lon}&key=${username}`
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      success: (res) => resolve(res),
      fail: (error) => reject(error),
    })
  })
}

const getCurrentWeather = (lat, lon) => {
  const url = `${API_URL}/weather/now?location=${lat},${lon}&key=${username}`
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      success: (res) => resolve(res),
      fail: (error) => reject(error),
    })
  })
}

const getCurrentAir = (/*lat, lon*/) => {
  const url = `${API_URL}/air/now?location=30.65946198,104.06573486&key=${username}`
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      success: (res) => resolve(res),
      fail: (error) => reject(error),
    })
  })
}

const getHourlyWeather = (lat, lon) => {
  const url = `${API_URL}/weather/hourly?location=${lat},${lon}&key=${username}`
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      success: (res) => resolve(res),
      fail: (error) => reject(error),
    })
  })
}

export default ({
  getWeekWeather,
  getCurrentWeather,
  getCurrentAir,
  getHourlyWeather,
})
