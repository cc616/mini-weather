import { locationApi, mapApi, weatherApi } from '../api'
import { LOCATION, WEEK_WEATHER, CURRENT_WEATHER, CURRENT_AIR, HOURLY_WEATHER } from '../constants/weather'

export const fetchLocation = () => {
  return async (dispatch) => {
    try {
      const res = await locationApi.getLocation()
      const { latitude: lat, longitude: lon, address = '' } = res
      dispatch({
        type: LOCATION,
        data: { lat, lon, address },
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchGeocoder = (lat, lon) => {
  return async (dispatch) => {
    try {
      const res = await mapApi.getGeocoder(lat, lon)
      const { data, statusCode } = res
      console.log(res)
      if (statusCode === 200) {
        const { result: { address } } = data
        dispatch({
          type: LOCATION,
          data: { address },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCurrentAir = (lat, lon) => {
  return async (dispatch) => {
    try {
      const res = await weatherApi.getCurrentAir(lat, lon)
      const { data, statusCode } = res
      if (statusCode === 200) {
        const { HeWeather6 } = data
        const { air_now_city: air } = HeWeather6[0]
        dispatch({
          type: CURRENT_AIR,
          data: {
            aqi: air.aqi,
            color: '#00cf9a',
            name: air.qlty,
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCurrentWeather = (lat, lon) => {
  return async (dispatch) => {
    try {
      const res = await weatherApi.getCurrentWeather(lat, lon)
      const { data, statusCode } = res
      if (statusCode === 200) {
        const { HeWeather6 } = data
        const { now } = HeWeather6[0]
        dispatch({
          type: CURRENT_WEATHER,
          data: {
            tmp: now.tmp,
            wind: now.wind_dir, // 风向
            windLevel: now.wind_sc, // 风力
            weather: now.cond_txt, // 天气描述
            humidity: now.hum, // 湿度
          },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchWeekWeather = (lat, lon) => {
  return async (dispatch) => {
    try {
      const res = await weatherApi.getWeekWeather(lat, lon)
      const { data, statusCode } = res
      if (statusCode === 200) {
        const { HeWeather6 } = data
        const { daily_forecast } = HeWeather6[0]
        const weekWeather = daily_forecast.map(item => ({
          tmpMax: item.tmp_max,
          tmpMin: item.tmp_min,
          weather: item.cond_txt_d,
        }))
        dispatch({
          type: WEEK_WEATHER,
          data: weekWeather,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchHourlyWeather = (lat, lon) => {
  return async (dispatch) => {
    try {
      const res = await weatherApi.getHourlyWeather(lat, lon)
      const { data, statusCode } = res
      if (statusCode === 200) {
        const { HeWeather6 } = data
        const { hourly } = HeWeather6[0]
        const hourlyWeather = hourly.map(item => ({
          time: item.time,
          tmp: item.tmp,
          weather: item.cond_txt,
        }))
        dispatch({
          type: HOURLY_WEATHER,
          data: hourlyWeather,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}