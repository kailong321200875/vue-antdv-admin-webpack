<template>
  <div>
    <com-table
      :spinning="spinning"
      :columns="columns"
      :data-source="data"
    >
      <!-- <template #name="{ text }">
        <a>{{ text }}</a>
      </template> -->
      <template #customTitle>
        <span><smile-outlined /> Name</span>
      </template>
    </com-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComTable from '_c/Table/index.vue'
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle', customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    slots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    slots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]

export default defineComponent({
  // name: 'BasicUsage',
  components: {
    ComTable,
    SmileOutlined,
    DownOutlined
  },
  setup() {
    const spinning = ref<boolean>(true)
    setTimeout(() => {
      spinning.value = false
    }, 3000)
    return {
      spinning,
      columns,
      data
    }
  }
})
</script>

<style>
</style>
