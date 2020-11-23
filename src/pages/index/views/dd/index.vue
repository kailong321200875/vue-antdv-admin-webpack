<template>
  <div>
    <count-to :start-val="0" :end-val="2000" />
    <a-button @click="showImg">预览</a-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CountTo from '_c/CountTo/index.vue'
import { createImgPreview } from '_c/Preview/functional'
export default defineComponent({
  name: 'Dd',
  components: {
    CountTo
  },
  setup() {
    function showImg() {
      createImgPreview({
        imageList: [
          'http://dn-p-tystore.qbox.me/p/chapter/attachment/e_bTeg-weA/EgfWEtftEBfs4BfuEg6uelu_JHH3HUD6I7HMet148BDq5uyiKgem4C2.jpg',
          'http://hbimg.b0.upaiyun.com/145298c2adcc1757b19d9849370d79bb88edaada5a796-wN5jaf_fw658',
          'http://www.jf258.com/uploads/2014-09-29/012939994.jpg',
          'http://pic1.win4000.com/wallpaper/3/58f4672ad3c5c.jpg'
        ],
        show: true,
        index: 2,
        onSelect: (i) => {
          console.log(i)
        },
        onClose: (i) => {
          console.log(i)
        }
      })
    }
    return {
      showImg
    }
  }
})
</script>

<style lang="less" scoped>
.scroll-wrap {
  width: 50%;
  height: 300px;
  background: #fff;
}
</style>
