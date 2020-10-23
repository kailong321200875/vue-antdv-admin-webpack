import { get } from '@/axios-config/axios'

import { AxiosPromise } from 'axios'

import { emptyObjFun } from '@/types/glob'

const methods: emptyObjFun = {
  getList: function(parmas?: any): AxiosPromise {
    return get(parmas, '/getJoke')
  }
}

export default methods
