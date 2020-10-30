import { get } from '../../axios-config/axios'

import { AxiosPromise } from 'axios'

import { EmptyObjFun } from '@/types/glob'

const methods: EmptyObjFun = {
  getList: function(parmas?: any): AxiosPromise {
    return get(parmas, '/getJoke')
  }
}

export default methods
