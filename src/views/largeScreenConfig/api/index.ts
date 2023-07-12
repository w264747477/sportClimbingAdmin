import request from '@/utils/request'

const largeConfig = {
  getSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  setSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  getBackgroundImg: "/sportClimbingAdmin/api/score/config/match",
  backgroundImg: "/sportClimbingAdmin/api/score/config/background",
  fontStyleCom: '/sportClimbingAdmin/api/score/config/font/com',
  fontStyleSpd: '/sportClimbingAdmin/api/score/config/font/speed',
  getSliderStatus: '/sportClimbingAdmin/api/score/roll/status', //获取轮播状态
  getSliderAll: '/sportClimbingAdmin/api/score/config/roll/all',//获取轮播全部选项
  getSliderBroad: '/sportClimbingAdmin/api/score/config/roll/broadcast',//获取设置的轮播选项
  setSliderStatusStart: '/sportClimbingAdmin/api/score/roll/start', //轮播切换
  setSliderStatusStop: '/sportClimbingAdmin/api/score/roll/stop' //轮播切换
}

class Service {

  static setSliderConfig(data: any) {
    return request({
      url: largeConfig.setSliderConfig,
      method: 'POST',
      json: true,
      data
    })
  }

  static getSliderConfig() {
    return request({
      url: largeConfig.getSliderConfig,
      method: 'get',
      json: true,
    })
  }
  static getBackgroundImgConfig() {
    return request({
      url: largeConfig.backgroundImg,
      method: 'get',
      json: true,
    })
  }
  static setBackgroundImg(data: any) {
    return request({
      url: largeConfig.backgroundImg,
      method: 'POST',
      json: true,
      data
    })
  }
  static getFontStyleCom() {
    return request({
      url: largeConfig.fontStyleCom,
      method: 'get',
      json: true,
    })
  }
  static setFontStyleCom(data: any) {
    return request({
      url: largeConfig.fontStyleCom,
      method: 'POST',
      json: true,
      data
    })
  }
  static getFontStyleSpeed() {
    return request({
      url: largeConfig.fontStyleSpd,
      method: 'get',
      json: true,
    })
  }
  static setFontStyleSpeed(data: any) {
    return request({
      url: largeConfig.fontStyleSpd,
      method: 'POST',
      json: true,
      data
    })
  }

  static getSliderStatus() {
    return request({
      url: largeConfig.getSliderStatus,
      method: 'get',
      json: true,
    })
  }
  static setSliderStatusStart(data: any) {
    return request({
      url: largeConfig.setSliderStatusStart,
      method: 'POST',
      json: true,
      data: {
        rollList: data.data,
        rollInterval: data.time
      }
    })
  }
  static setSliderStatusStop() {
    return request({
      url: largeConfig.setSliderStatusStop,
      method: 'POST',
      json: true,

    })
  }
  static getSliderAll() {
    return request({
      url: largeConfig.getSliderAll,
      method: 'get',
      json: true,
    })
  }
  static getSliderBroad() {
    return request({
      url: largeConfig.getSliderBroad,
      method: 'get',
      json: true,

    })
  }
  static setSliderBroad(data: any) {
    return request({
      url: largeConfig.getSliderBroad,
      method: 'post',
      json: true,
      data

    })
  }


}
export default Service
