<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const { params, query } = useRoute()
    console.log(params)
    console.log(query)
    // const { params, query } = this.$route
    // const { path } = params
    // this.$router.replace({ path: '/' + path, query })
  }
  // render: function(h) {
  //   return h() // avoid warning message
  // }
})
</script>
