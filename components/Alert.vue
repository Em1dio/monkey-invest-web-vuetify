<template>
  <div class="alert">
    <header class="alert__header">
      <p class="alert__label" :class="[labelTypeClass]">
        {{ $t('new-alert') }}
      </p>
      <time :datetime="time" class="alert__time">
        {{ $t('new-alert') }}
      </time>
    </header>
    <main class="alert__content">
      <p class="alert__message">
        {{ message }}
      </p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: new Date()
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'warning', 'error'].includes(value)
    }
  },
  computed: {
    labelTypeClass () {
      return `alert__label--${this.type}`
    }
  }
}
</script>

<style lang="sass">
.alert
  background: #fff
  border-radius: 15px
  color: #2b2b2b
  padding: 20px

  &__header
    align-items: center
    display: flex
    justify-content: space-between

  &__label
    color: #6c6c6c
    font-size: 0.75rem

    &--info
      color: blue

    &--warning
      color: orange

    &--error
      color: red

  &__time
    color: #6c6c6c
    font-size: 0.75rem

  &__content
    align-items: center
    display: flex
    justify-content: center
    padding: 20px 0

  &__message
    font-weight: bold
</style>
