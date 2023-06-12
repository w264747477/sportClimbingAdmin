import request from '@/utils/request'

const raceConfigApi = {
  getGameConfig: '/sportClimbingAdmin/api/score/config/match',
  setGameConfig: '/sportClimbingAdmin/api/score/config/match',

}

class Service {
  /**
   * @description
   */
  static getGameConfig() {
    return request({
      url: raceConfigApi.getGameConfig,
      method: 'get',
      json: true,


    })

  }
  static setGameConfig(data) {
    return request({
      url: raceConfigApi.setGameConfig,
      method: 'post',
      json: true,
      data

    })

  }


}
export default Service
