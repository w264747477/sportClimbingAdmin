import request from '@/utils/request'

const largeConfig = {
  getSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  setSliderConfig: '/sportClimbingAdmin/api/score/config/match',
  getBackgroundImg: "/sportClimbingAdmin/api/score/config/match",
  setBackgroundImg: "/sportClimbingAdmin/api/score/config/match"
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
      url: largeConfig.getSliderConfig,
      method: 'get',
      json: true,
    })
  }
  static setBackgroundImg(data: any) {
    return request({
      url: largeConfig.setBackgroundImg,
      method: 'POST',
      json: true,
      data
    })
  }

}
export default Service
