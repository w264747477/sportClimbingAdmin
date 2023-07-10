import request from '@/utils/request'

const largeConfig = {
  getSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  setSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  getBackgroundImg: "/sportClimbingAdmin/api/score/config/match",
  backgroundImg: "/sportClimbingAdmin/api/score/config/background",
  fontStyleCom: '/sportClimbingAdmin/api/score/config/font/com',
  fontStyleSpd: '/sportClimbingAdmin/api/score/config/font/speed',
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
}
export default Service
