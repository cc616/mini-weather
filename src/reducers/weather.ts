import { LOCATION, WEEK_WEATHER, CURRENT_WEATHER, CURRENT_AIR, HOURLY_WEATHER } from '../constants/weather'

const INITIAL_STATE = {
  location: {
    address: null,
    district: null,
  },
  weekWeather: [],
  air: {
    status: 0,
    aqi: '',
    color: '#00cf9a',
    name: '',
  },
  current: {
    tmp: '',  // 温度
    wind: '', // 风向
    windLevel: '', // 风力
    weather: '', // 天气描述
    humidity: '', // 湿度
  },
  hourlyWeather: [],
}

export default (state = INITIAL_STATE, action) => {
  const { type = '', data = '' } = action

  switch (type) {
    case LOCATION:
      return {
        ...state,
        location: Object.assign({}, state.location, data),
      }
    case WEEK_WEATHER:
      return {
        ...state,
        weekWeather: data,
      }
    case CURRENT_WEATHER:
      return {
        ...state,
        current: data,
      }
    case CURRENT_AIR:
      return {
        ...state,
        air: data,
      }
    case HOURLY_WEATHER:
      return {
        ...state,
        hourlyWeather: data,
      }
    default:
      return state
  }
}
