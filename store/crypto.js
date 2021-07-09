export const state = () => ({
  crypto: {
    totalBefore: 0,
    totalActual: 0,
    pctEarn: 0,
  },
})

export const mutations = {
  setReadCryptoConsolidated(state, data) {
    state.crypto = data
  },
}

export const actions = {
  getReadCryptoConsolidated({ commit }, params = {}) {
    const response = this.$axios.get(
      `/cryptocoins/consolidated/${params?.wallet}`,
      {
        params,
      }
    )
    response.then(({ data }) => {
      commit('setReadCryptoConsolidated', data)
    })
    return response
  },
}
