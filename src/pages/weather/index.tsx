import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import {
  fetchLocation,
  fetchGeocoder,
  fetchCurrentAir,
  fetchCurrentWeather,
  fetchWeekWeather,
  fetchHourlyWeather,
} from '../../actions/weather'

import './style.scss'
import { IWeather } from 'src/typing/weather';

type PageStateProps = {
  location: IWeather.ILocation,
  weekWeather: IWeather.IWeekWeather,
  air: IWeather.IAir,
  current: IWeather.ICurrent,
  hourlyWeather: IWeather.IHourlyWeather,
}

interface PageDispatchProps {
  fetchLocation: () => any,
  fetchGeocoder: (lat: number, lon: number) => any,
  fetchWeekWeather: (lat: number, lon: number) => any,
  fetchCurrentWeather: (lat: number, lon: number) => any,
  fetchCurrentAir: (lat: number, lon: number) => any,
  fetchHourlyWeather: (lat: number, lon: number) => any,
}

type IProps = PageDispatchProps & PageStateProps

interface Weather {
  props: IProps,
}

const mapStateToProps = ({ weather }) => ({
  location: weather.location,
  weekWeather: weather.weekWeather,
  air: weather.air,
  current: weather.current,
  hourlyWeather: weather.hourlyWeather,
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchLocation: () => dispatch(fetchLocation()),
  fetchGeocoder: (lat: number, lon: number) => dispatch(fetchGeocoder(lat, lon)),
  fetchWeekWeather: (lat: number, lon: number) => dispatch(fetchWeekWeather(lat, lon)),
  fetchCurrentWeather: (lat: number, lon: number) => dispatch(fetchCurrentWeather(lat, lon)),
  fetchCurrentAir: (lat: number, lon: number) => dispatch(fetchCurrentAir(lat, lon)),
  fetchHourlyWeather: (lat: number, lon: number) => dispatch(fetchHourlyWeather(lat, lon)),
})

@connect(mapStateToProps, mapDispatchToProps)
class Weather extends Component {
  componentDidMount() {
    this.getLocation()
  }

  getLocation = () => {
    this.props.fetchLocation()
      .then(() => {
        this.updateLocation()
      })
  }

  updateLocation = () => {
    const { location } = this.props

    this.getAddress(location)
  }

  getAddress = (location) => {
    Taro.showLoading({
      title: '定位中',
      mask: true
    })

    const { lat, lon } = location
    this.getWeather(lat, lon)
    this.props.fetchGeocoder(lat, lon)
      .then(() => {
        Taro.hideLoading()
      })
      .catch(() => {
        Taro.hideLoading()
      })
  }

  getWeather = (lat, lon) => {
    this.props.fetchWeekWeather(lat, lon)
    this.props.fetchCurrentWeather(lat, lon)
    this.props.fetchCurrentAir(lat, lon)
    this.props.fetchHourlyWeather(lat, lon)
  }

  handleChooseLocation = () => {

  }

  render() {
    const { location, weekWeather, air, current, hourlyWeather } = this.props
    const { address } = location
    const today = weekWeather[0]
    const tomorrow = weekWeather[1]


    return (
      <View className="weather-wrapper">
        <View className="container" style="background: #62aadc">
          <View className="location" onClick={this.handleChooseLocation}>
            {address}
          </View>
          <View className="air-quality">
            <View className="air-quality-container">
              <Text className="air-quality-icon" style="background: red"></Text>
              <Text>{` ${air.name} ${air.aqi}`}</Text>
            </View>
          </View>
          <View className="current">
            <View className="temperature">
              <Text>{current.tmp}</Text>
              <Text className="temperature-degree">。</Text>
            </View>
            <View className="current-line">{current.weather}</View>
            <View className="current-line">湿度 {current.humidity}% | {`${current.wind} ${current.windLevel}`}级</View>
            <View className="current-line">现在的温度比较舒适～</View>
          </View>
          {
            weekWeather.length > 0 ? (
              <View className="today-and-tomorrow">
                <View className="today-and-tomorrow-line"></View>
                <View className="today-item">
                  <View>
                    <View>今天</View>
                    <View>{today.weather}</View>
                  </View>
                  <View>
                    <View className="today-item-temperature">
                      <Text>{today.tmpMin}/{today.tmpMax}</Text>
                      <Text className="degree">。</Text>
                    </View>
                  </View>
                </View>
                <View className="tomorrow-item">
                  <View>
                    <View>明天</View>
                    <View>{tomorrow.weather}</View>
                  </View>
                  <View>
                    <View className="tomorrow-item-temperature">
                      <Text>{tomorrow.tmpMin}/{tomorrow.tmpMax}</Text>
                      <Text className="degree">。</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null
          }
          <ScrollView scroll-x>
            <View className="hourly-weather" >
              {
                hourlyWeather.map((item, index) => (
                  <View className="item" key={index}>
                    <View>{item.time.split(' ')[1]}</View>
                    <View className="temperature">
                      <Text>{item.tmp}</Text>
                      <Text className="degree">。</Text>
                    </View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
          <ScrollView scroll-x>
            <View className="week-weather">
              {
                weekWeather.map((item, index) => (
                  <View className="item" key={index}>
                    <View>{item.tmpMin}/{item.tmpMax}</View>
                    <View>{item.weather}</View>
                  </View>
                ))
              }
            </View>
          </ScrollView>
        </View>
        <View className="other">
          <View className="container">24小时天气</View>
          <View className="life-style">生活指数</View>
        </View>
      </View>
    )
  }
}

export default Weather as ComponentClass<IProps, {}>
