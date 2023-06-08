export const ageList = () => {
  let list = ['成年组']
  for (let i = 5; i < 18; i++) {
    let s = `U${i}`
    list.push(s)
  }
  return list
}
export const gender = ['男', '女']
export const gameType = ['难度赛', '攀石赛', '速度赛']
export const round = ['预赛', '半决赛', '决赛']
export const speedRound = ['预赛', '八分之一', '四分之一', '二分之一', '决赛']
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
      if (res.status === 0) {
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
      data
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
