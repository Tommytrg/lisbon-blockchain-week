<template>
  <div class="bar">
    <h1 class="title">
      <SvgIcon name="LBW" />
    </h1>
    <a :href="submitUrl"><Button>Submit event</Button></a>
  </div>
</template>

<script>
import { SUBMIT_EVENT_URL } from '~/constants'

export default {
  data() {
    return {
      submitUrl: SUBMIT_EVENT_URL,
    }
  },
}
</script>
<style lang="scss" scoped>
.bar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  .title {
    color: $blue;
  }
}

@media (max-width: 1200px) {
  .title {
    padding-bottom: 24px;
  }
}
</style>
