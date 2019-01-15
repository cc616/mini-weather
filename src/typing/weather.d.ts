import weather from "src/pages/weather";

declare namespace IWeather {
  interface ILocationBase {
    lat: number,
    lon: number,
  }

  interface ILocation extends ILocationBase {
    address: string,
  }

  interface IWeatherItem {
    tmpMax: number,
    tmpMin: number,
    weather: string,
  }

  type IWeekWeather = IWeatherItem[]

  interface IAir {
    status: boolean,
    aqi: string,
    color: string,
    name: string,
  }

  interface ICurrent {
    // backgroundImage: string,
    // backgroundColor: string,
    tmp: string,
    wind: string,
    windLevel: string,
    weather: string,
    humidity: string,
    // icon: string,
    // ts: string,
  }

  type IHourlyWeather = {
    time: string,
    tmp: number,
    weather: string,
  }[]
}