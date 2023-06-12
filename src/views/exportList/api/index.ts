import request from '@/utils/request'

export const exportList = {
  exportScores: '/sportClimbingAdmin/api/score/exportScores',
  promotionList: '/sportClimbingAdmin/api/score/promotionList',

}

export class Service {
  /**
   * @description 成绩修改接口
   */
  static postExport(url, data: any) {
    return request({
      url: url,
      method: 'POST',
      json: true,
      data,
      headers:
      {
        responseType: 'blob',
      }
    })
  }
}

