export const ageList = () => {
  let list = [{
    value: null,
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
export const gameTypeMid = [
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
  },
  {
    value: 'A',
    label: '全能'
  }
]
export const gameTypeAll = [
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
  },
  {
    value: 'A',
    label: '全能'
  },
  {
    value: 'AU',
    label: 'U系列'
  },
]
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
    label: 'serif'
  },
  {
    value: '1',
    label: 'sans-serif'
  },
  {
    value: '2',
    label: 'monospace'
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
export const projectData = {
  B: [
    {
      title: '排名',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    {
      title: '号码',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '代表队',
      family: '0',
      color: '1',
      size: 4,
      x: 210,
    },
    {
      title: '运动员姓名',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },

    {
      title: '赛道',
      family: '0',
      color: '1',
      x: 25,
    },
    {
      title: '成绩',
      family: '0',
      color: '1',
      size: 4,
      x: 90,
    },
    {
      title: '上一轮名次',
      family: '0',
      color: '1',
      size: 4,
      x: 96,
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '1',
      size: 2,
      x: 5,
      y: 6,
    },
  ],
  S: [
    {
      title: '排名',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    {
      title: '号码',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '代表队',
      family: '0',
      color: '1',
      size: 4,
      x: 260,
    },
    {
      title: '运动员姓名',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },

    {
      title: '赛道A',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },
    {
      title: '赛道B',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },
    {
      title: '成绩',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6,
    },
  ],
  L: [
    {
      title: '排名',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    {
      title: '号码',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '代表队',
      family: '0',
      color: '1',
      size: 4,
      x: 180,
    },
    {
      title: '运动员姓名',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },
    //预赛 Q0
    {
      title: '高度1',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    //预赛 Q0
    {
      title: '高度2',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    //非预赛 !Q0
    {
      title: '高度',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },

    {
      title: '时间',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    //预赛 Q0
    {
      title: 'QP',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    //非预赛 !Q0
    {
      title: '成绩',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    //决赛，半决赛'F4', 'F0'
    {
      title: '上一轮名次',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '1',
      size: 4,
      x: 5,
      y: 4,
    },
  ],
  A: [
    {
      title: '排名',
      family: '0',
      color: '1',
      size: 4,
      x: 30,
    },
    {
      title: '号码',
      family: '0',
      color: '1',
      size: 4,
      x: 30,
    },
    {
      title: '代表队',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '运动员姓名',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },

    {
      title: '赛道',
      family: '0',
      color: '1',
      x: 22,
    },
    {
      title: '线路得分',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    {
      title: '攀石得分',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '高度',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '难度得分',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: 'TP',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    //非预赛!q0
    {
      title: '上一轮名次',
      family: '0',
      color: '1',
      size: 4,
      x: 73,
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '0',
      size: 4,
      x: 5,
      y: 6,
    },
  ],
  AU: [
    {
      title: '排名',
      family: '0',
      color: '1',
      size: 4,
      x: 50,
    },
    {
      title: '号码',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '代表队',
      family: '0',
      color: '1',
      size: 4,
      x: 200,
    },
    {
      title: '运动员姓名',
      family: '0',
      color: '1',
      size: 4,
      x: 80,
    },
    {
      title: '难度',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '攀石',
      family: '0',
      color: '1',
      size: 4,
      x: 60,
    },
    {
      title: '总分',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    //非预赛!q0
    {
      title: '上一轮名次',
      family: '0',
      color: '1',
      size: 4,
      x: 100,
    },
    {
      title: '年度积分',
      switch: true,
      family: '0',
      color: '0',
      size: 2,
      x: 5,
      y: 6,
    },
  ],

}

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
