// miniprogram/pages/weather/index.js
const getGeocoder = require('../../api/map.js')
const weather = require('../../api/weather.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgColor: '#62aadc',
    air: {
      status: 0,
      aqi: '77',
      color: '#00cd9a',
      name: '良'
    },
    latitude: 0,
    longitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocation()
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: this.updateLocation,
      fail: () => {
        this.openLocation
      }
    })
  },

  updateLocation(res) {
    let { latitude, longitude, name } = res

    this.setData({
      latitude,
      longitude
    })

    if (name) {
      this.setData({
        address: name
      })

      return;
    }

    this.getAddress(latitude, longitude)
  },

  openLocation() {
    wx.showToast({
      title: '您还未授权使用位置权限',
    })
  },

  getAddress(latitude, longitude) {
    wx.showLoading({
      title: '定位中',
      mask: true
    })

    getGeocoder(latitude, longitude, (res) => {
      wx.hideLoading()
      const { data = {}, statusCode } = res
      const { result = {} } = data
      if (statusCode === 200) {
        const { address_component = {}, address } = result
        const {
          ad_level_1: province = '',
          ad_level_2: county = '',
          ad_level_3: city = '',
        } = address_component

        this.setData({
          address,
        })

        this.getWeather(latitude, longitude)
      }
    }, () => {
      wx.hideLoading()
    })
  },

  getWeather(latitude, longitude) {
    console.log(latitude, longitude)
    weather.getWeather(latitude, longitude, (res) => {
      console.log(res)
      const { data = {}, statusCode } = res
      if (statusCode === 200) {
        const { HeWeather6 = [] } = data
        const weather = HeWeather6[0]
      }
    })
  },

  handleChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        const { latitude: lat, longitude: lon } = res
        const { latitude, longitude } = this.data
        if (lat === latitude && lon === longitude) {
          // getWeather
        } else {
          this.updateLocation(res)
        }
      },
    })
  }
})