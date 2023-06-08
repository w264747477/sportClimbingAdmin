import request from '@/utils/request'

const loginApi = {
  speedModify: '/sportClimbingAdmin/api/score/speed/update',
  boulderingModify: '/sportClimbingAdmin/api/score/bouldering/update',
  difficultyModify: '/sportClimbingAdmin/api/score/bouldering/update',
  getScore: '/sportClimbingAdmin/api/score/rank',
}

class Service {
  /**
   * @description 成绩修改接口
   */
  static postModify(url, data: any) {
    return request({
      url: url,
      method: 'POST',
      json: true,
      data
    }).then((res) => {
      if (res.status === 200) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }
  static getScoreInfo(data: any) {
    return request({
      url: loginApi.getScore,
      method: 'get',
      json: true,
      params: data
    
    }).then((res) => {
      if (res.status === 0) {
        return Promise.resolve(res)
      }
      return Promise.reject(res)
    })
  }
  static api = loginApi


}
export default Service
