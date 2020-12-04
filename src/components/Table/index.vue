<template>
  <a-spin :spinning="spinning" :tip="tip">
    <a-table :data-source="dataSource">
      <template v-for="item in columns">
        <!-- 多级表头 -->
        <template v-if="item.children && item.children.length"></template>
        <template v-else>
          <a-table-column
            :key="item[item.key]"
            :title="item.title"
            :data-index="item.dataIndex"
          >
            <template #customTitle>
              <slot name="customTitle" />
            </template>
            <!-- <template v-if="item.slots">
              <template
                v-for="slot in item.slots"
              >
                <template v-if="item.slot === 'customTitle'">
                  <template #customTitle>
                    <div :key="item.slots[slot]">
                      <slot name="customTitle" />
                    </div>
                  </template>
                </template>
                <template v-else>
                  <template #[slot]="{ text, record, index }">
                    <div :key="item.slots[slot]">
                      <slot :name="slot" :scoped="{ text, record, index }" />
                    </div>
                  </template>
                </template>
              </template>
            </template> -->
          </a-table-column>
        </template>
      </template>
    </a-table>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
export default defineComponent({
  name: 'ComTable',
  props: {
    spinning: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    tip: {
      type: String as PropType<string>,
      default: '数据加载中...'
    },
    dataSource: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { attrs }) {
    const getBindValue = computed((): any => {
      console.log(attrs)
      console.log(props)
      const bindValue = { ...attrs, ...props }
      return bindValue
    })
    return {
      getBindValue
    }
  }
})
</script>

<style>
</style>
