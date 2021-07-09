<template>
  <div :style="baseClass">
    <span :style="styleColor">Monkey</span
    ><span :style="styleColor2">Invest</span><span :style="styleColor">.</span>
  </div>
</template>
<script>
export default {
  props: {
    fontWeight: { default: () => '700' },
    fontSize: { default: () => '48px' },
    marginTop: { default: () => '10px' },
  },

  computed: {
    baseClass() {
      return {
        'font-size': `${this.fontSize}`,
        'font-weight': this.fontWeight,
      }
    },
    styleColor() {
      return {
        ...this.baseClass,
        color: 'rgb(226, 112, 52)',
      }
    },
    styleColor2() {
      return {
        ...this.baseClass,
        color: 'rgb(255, 255, 255)',
      }
    },
  },
}
</script>
