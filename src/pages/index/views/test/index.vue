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

    <div v-for="(item, $index) in listData" :key="$index">{{ item.text }},</div>
    <div>{{ noChange }}</div>

    <svg-icon icon-class="404" class-name="disabled" @click="svgClick" />
    <svg-icon icon-class="component" class-name="disabled" />

  </div>
</template>

<script lang="ts">
import { ref, getCurrentInstance } from 'vue'
export default {
  setup() {
    const instance: any = getCurrentInstance()
    const { proxy } = instance

    const inputVal = ref<string>('')

    const changeInputVal = (): void => {
      inputVal.value = '我是点击事件改变的！'
    }

    const inputSearch = (val: string): void => {
      changeInputVal()
    }

    const listData = ref<any[]>([])
    const noChange: string = '我是不可改变的'

    const getList = async(): Promise<void> => {
      const res = await proxy.$api.common.getList({
        page: 1,
        count: 10
      })
      if (res) {
        listData.value = res.result
      }
    }

    function svgClick(): void {
      console.log('哈哈哈哈哈')
    }

    getList()

    return {
      inputVal,
      changeInputVal,
      inputSearch,
      listData,
      getList,
      noChange,
      svgClick
    }
  }
}
</script>

<style>
</style>
