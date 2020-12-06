import { defineComponent, PropType, computed } from 'vue'
import { Table } from 'ant-design-vue'

export default defineComponent({
  name: 'ComTable',
  props: {
    columns: {
      type: Array as PropType<any[]>,
      default: () => []
    }
  },
  setup(props, { attrs, slots }) {
    const getBindValue = computed((): any => {
      const bindValue = { ...attrs, ...props }
      delete bindValue.columns
      return bindValue
    })
    
    function getFooter() {
      return (slots.title && slots.title('hahah'))
    }
    
    return () => {
      return (
        <Table {...(getBindValue as any)} scopedSlots={{
          title: (currentPageData: any) => getFooter(),
          footer: (currentPageData: any) => getFooter()
        }}>
          
        </Table>
      )
    }
  }
})
