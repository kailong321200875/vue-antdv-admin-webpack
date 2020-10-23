<template>
  <div>
    <a-button type="primary">Primary</a-button>

    <a-button-group>
      <a-button>Cancel</a-button>
      <a-button type="primary" @click="changeInputVal">OK</a-button>
    </a-button-group>

    <a-input-search
      v-model:value="inputVal"
      placeholder="input search text"
      style="width: 200px"
      @search="inputSearch"
    />
    <div>{{ inputVal }}</div>

    <div v-for="(item, $index) in listData" :key="index">{{ item.text }},</div>

  </div>
</template>

<script lang="ts">
import { ref, Ref, reactive, getCurrentInstance } from 'vue'
import { emptyObj } from '@/types/glob'
export default {
  setup() {
    const instance: any = getCurrentInstance()
    const { ctx } = instance

    const inputVal: Ref<string> = ref('')

    const changeInputVal = (): void => {
      inputVal.value = '我是点击事件改变的！'
    }

    const inputSearch = (val: string): void => {
      changeInputVal()
    }

    const listData: emptyObj = reactive([])

    const getList = async(): Promise<void> => {
      const res = await ctx.$api.common.getList({
        page: 1,
        count: 10
      })
      if (res) {
        listData.value = res.result
      }
    }

    getList()

    return {
      inputVal,
      changeInputVal,
      inputSearch,
      listData,
      getList
    }
  }
}
</script>

<style>
</style>
