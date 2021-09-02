<template>
  <div>
    <Main :data="data.body" />
  </div>
</template>

<script>
import Main from '@/components/Main.vue'

export default {
  components: {
    Main,
  },
  async asyncData({ $content }) {
    const data = await $content('events', 'data').fetch()
    return { data }
  },
  data() {
    return {
      data: [],
    }
  },
}
</script>
