import request from '@/utils/request'

export const loginApi = {
  speedModify: '/sportClimbingAdmin/api/score/speed/update',
  boulderingModify: '/sportClimbingAdmin/api/score/bouldering/update',
  difficultyModify: '/sportClimbingAdmin/api/score/difficulty/update',
  getScore: '/sportClimbingAdmin/api/score/rank',
  clearData: '/sportClimbingAdmin/api/score/clearAll'
}

export class Service {
  /**
   * @description 成绩修改接口
   */
  static postModify(url, data: any) {
    return request({
      url: url,
      method: 'POST',
      json: true,
      data
    })
  }
  static getScoreInfo(data: any) {
    return request({
      url: loginApi.getGameConfig,
      method: 'get',
      json: true,
    })

  }
  static clearDataBase() {
    return request({
      url: loginApi.clearData,
      method: 'DELETE',
      json: true,
    })

  }
  static clearAll() {
    return request({
      url: loginApi.getGameConfig,
      method: 'get',
      json: true,
    })

  }
  static getScoreInfo(data: any) {
    return request({
      url: loginApi.getScore,
      method: 'get',
      json: true,
      params: data

    })

  }

}

