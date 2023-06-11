import request from '@/utils/request'

const raceConfigApi = {
  getGameConfig: '/sportClimbingAdmin/api/score/config/match',
  setGameConfig: '/sportClimbingAdmin/api/score/match',

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


}
export default Service
