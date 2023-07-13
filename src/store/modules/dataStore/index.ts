import { Module } from 'vuex'
import dataStateTypes from './types'
// create a new Store Modules.
const dataModule: Module<dataStateTypes, RootStateTypes> = {
  namespaced: true,
  state: {
    isRunning: 0
  },
  mutations: {
    setRunningState(state, val) {
      state.isRunning = val
    },
  },

}
export default dataModule
