import request from '@/utils/request'

const loginApi = {
  setGrown: '/api/setGrown',
  setU: '/api/setU',

}

class Service {
  /**
   * @description
   */
  static setGrown(data: any) {
    return request({
      url: loginApi.setGrown,
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

  static setU(data: any) {
    return request({
      url: loginApi.setU,
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


}
export default Service
