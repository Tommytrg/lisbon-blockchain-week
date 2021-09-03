<template>
  <FrameOutside @click="closeModal" @focus="closeModal">
    <div class="modal">
      <div class="close-btn" @click="closeModal">
        <SvgIcon name="cross" />
      </div>
      <div class="main">
        <div
          class="header"
          :style="{
            background: `linear-gradient(rgb(240 234 229 / 60%), rgba(240 234 229)), url(${backgroundUrl})`,
            backgroundPosition: `50% 40%`,
            backgroundSize: `cover`,
          }"
        >
          <p class="time">{{ `${getTime(info.from)}-${getTime(info.to)}` }}</p>
          <h2>
            {{ info.title }}
          </h2>
        </div>
        <div class="content">
          <p class="text">{{ info.description }}</p>
          <a class="register-btn" :href="info.register" target="_blank"
            >Register</a
          >
          <a
            class="address"
            :href="`https://www.google.com/maps/dir/?api=1&destination=${info.address}`"
            target="_blank"
          >
            <span>{{ info.venue }}</span>
            {{ info.address }}
          </a>
        </div>
      </div>
    </div>
  </FrameOutside>
</template>

<script>
import { format } from 'date-fns'

export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  computed: {
    backgroundUrl() {
      return require(`../assets/${this.info.url}.jpeg`)
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    getTime(timestamp) {
      return format(new Date(timestamp), `HH:mm aa`)
    },
  },
}
</script>
<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $beige;
  border: 2px solid $blue;
  color: $black;
  grid-gap: 24px;
  .main {
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .main::-webkit-scrollbar {
    display: none;
  }
  .close-btn {
    position: fixed;
    cursor: pointer;
    top: -2px;
    right: -2px;
  }
  .header {
    font-size: 16px;
    padding: 48px;
    font-family: 'SourceCode-Semibold', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    .time {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }
  }
  .content {
    padding: 0 48px;
    margin-bottom: 48px;
    display: grid;
    grid-template-rows: repeat(auto-fill, max-content);
    grid-row-gap: 24px;
    .text {
      line-height: 1.5;
    }
    .address {
      color: $black;
      display: flex;
      flex-direction: column;
    }
    .register-btn {
      color: $blue;
      font-size: 24px;
      text-decoration: underline;
      cursor: pointer;
      align-self: right;
    }
  }
}
@media (max-width: 600px) {
  .modal {
    .main {
      width: 95vw;
      height: 95vh;
      max-height: 100vh;
      overflow-y: auto;
      overflow-x: hidden;
    }
  }
}
</style>
