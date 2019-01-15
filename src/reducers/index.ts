import { combineReducers } from 'redux'
import counter from './counter'
import weather from './weather'

export default combineReducers({
  counter,
  weather
})
