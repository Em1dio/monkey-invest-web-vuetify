export default ({ app }, inject) => {
  const util = {
    capitalize: (str) => {
      return str[0].toUpperCase() + str.substr(1)
    },
    calcPercent: (initial, now) => {
      const value = now / initial
      if (isNaN(value)) {
        return 0
      }
      return value - 1
    },
  }
  ///
  inject('util', util)
}
