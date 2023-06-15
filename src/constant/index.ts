export const ageList = () => {
  let list = [{
    value: '',
    label: '成年组'
  }]
  for (let i = 5; i < 18; i++) {
    let s = `U${i}`
    list.push({
      value: s,
      label: s
    })
  }
  return list
}
export const gender = [
  {
    value: 'M',
    label: '男'
  },
  {
    value: 'W',
    label: '女'
  }
]
export const gameType = [
  {
    value: 'L',
    label: '难度赛'
  },
  {
    value: 'B',
    label: '攀石赛'
  },
  {
    value: 'S',
    label: '速度赛'
  }]
export let round =
  [
    {
      value: 'Q0',
      label: '预赛'
    },
    {
      value: 'F2',
      label: '半决赛'
    },
    {
      value: 'F0',
      label: '决赛'
    }]

export const speedRound =

  [
    {
      value: 'Q0',
      label: '预赛'
    },
    {
      value: 'F8',
      label: '八分之一'
    },
    {
      value: 'F4',
      label: '四分之一'
    },
    {
      value: 'F2',
      label: '二分之一'
    },
    {
      value: 'F0',
      label: '决赛'
    }
  ]
export type matchObj = {
  "match": string,
  "dftSigQ0RtNum": number,
  "dftSigHasF2": number,
  "dftSigF2PromNum": number,
  "dftSigF0PromNum": number,
  "dftFullQ0HandNum": number,
  "dftFullF2HandNum": number,
  "dftFullF0HandNum": number,
  "bldSigHasF2": number,
  "bldSigF2PromNum": number,
  "bldSigF0PromNum": number,
  "fullHasF2": number,
  "fullF2PromNum": number,
  "fullF0PromNum": number
}
export type exportList = {
  type: string,
  gender: string,
  round: string,
  age: string,
  name: string,
  time: string,
  address: string,
  project: string,
  logo: Array,
  chiefJudge: string,
  deputyReferee: string,
  routejudge: string,
  gradeHandlingJudge: string,
  announcementTime: any
}
export const familyOptions = [
  {
    value: '0',
    label: '宋体'
  },
  {
    value: '1',
    label: '微软雅黑'
  },
  {
    value: '2',
    label: '黑体'
  }
]
export const colorOptions = [
  {
    value: '0',
    label: '黑'
  },
  {
    value: '1',
    label: '白'
  }
]
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
