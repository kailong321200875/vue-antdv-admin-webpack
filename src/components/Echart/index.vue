<template>
  <div
    :class="className"
    :style="{height:height,width:width}"
  />
</template>

<script lang="ts">
import { defineComponent, onActivated, PropType, onMounted, onBeforeMount, unref, watch, ref, nextTick, getCurrentInstance } from 'vue'
import { debounce } from 'lodash-es'
import type { EChartOption, ECharts } from 'echarts'
import echarts from 'echarts'
const tdTheme = require('./theme.json') // 引入默认主题
echarts.registerTheme('tdTheme', tdTheme) // 覆盖默认主题
export default defineComponent({
  name: 'Echarts',
  props: {
    className: {
      type: String as PropType<string>,
      default: 'chart'
    },
    width: {
      type: String as PropType<string>,
      default: ''
    },
    height: {
      type: String as PropType<string>,
      default: '200px'
    },
    options: {
      type: Object as PropType<EChartOption | undefined>,
      default: undefined
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any
    // console.log(item)
    // const chartRef = ref<HTMLCanvasElement | null>(null)
    let chart: ECharts | null = null
    let sidebarElm: HTMLElement | any = null
    let __resizeHandler: Function | null = null

    watch(
      () => props.options,
      (options: EChartOption) => {
        nextTick(() => {
          if (chart) {
            chart.setOption(options, true)
          }
        })
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      initChart()
      __resizeHandler = debounce(() => {
        if (chart) {
          chart.resize()
        }
      }, 100);
      (window as any).addEventListener('resize', __resizeHandler)
      sidebarElm = document.getElementsByClassName('sidebar-container-wrap')[0]
      sidebarElm && sidebarElm.addEventListener('transitionend', sidebarResizeHandler)
    })

    onActivated(() => {
      // 防止keep-alive之后图表变形
      if (chart) {
        chart.resize()
      }
    })

    onBeforeMount(() => {
      (window as any).removeEventListener('resize', __resizeHandler)

      sidebarElm && sidebarElm.removeEventListener('transitionend', sidebarResizeHandler)
    })

    function initChart(): void {
      // 初始化echart
      // const chartRefWrap = unref(chartRef)
      if (proxy.$el) {
        chart = echarts.init(proxy.$el, 'tdTheme')
        chart.setOption(props.options as EChartOption, true)
      }
    }

    function sidebarResizeHandler(e: any): void {
      if (e.propertyName === 'width') {
        if (__resizeHandler) {
          __resizeHandler()
        }
      }
    }

    return {}
  }
})
</script>

<style>
</style>
