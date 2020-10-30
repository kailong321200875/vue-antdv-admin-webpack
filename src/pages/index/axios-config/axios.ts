import request from './request'

import config from '../config'

import { AxiosPromise, ResponseType } from 'axios'

const { default_headers } = config

function get(params: any, url: string): AxiosPromise {
  return request({
    url: url,
    method: 'get',
    params
  })
}

function post(params: any, url: string, headersType: string, responseType: ResponseType): AxiosPromise {
  return request({
    url: url,
    method: 'post',
    data: params,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || default_headers
    }
  })
}

export {
  get,
  post
}
