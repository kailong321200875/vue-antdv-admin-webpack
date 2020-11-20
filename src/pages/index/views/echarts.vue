<template>
  <div>
    <a-row :gutter="20">
      <a-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="14">
        <div class="chart-wrap">
          <echart :options="barOptions" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="14">
        <div class="chart-wrap">
          <echart :options="data1" :height="'300px'" />
        </div>
      </a-col>
      <a-col :span="10">
        <div class="chart-wrap">
          <echart :options="pieOptions2" :height="'300px'" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from 'vue'
import Echart from '_c/Echart/index.vue'
import type { EChartOption } from 'echarts'
import { lineOptions, pieOptions, barOptions, pieOptions2 } from './data/echart-data'
export default defineComponent({
  components: {
    Echart
  },
  setup() {
    const data1 = reactive(lineOptions)
    setTimeout(() => {
      (data1 as any).series[0].data = [1000, 1200, 1610, 1340, 1050, 1600, 1650]
    }, 5000)
    return {
      data1,
      pieOptions,
      barOptions,
      pieOptions2
    }
  }
})
</script>

<style lang="less" scoped>
.chart-wrap {
  margin-bottom: 20px;
  border-radius: 5px;
  padding: 10px;
}
</style>
