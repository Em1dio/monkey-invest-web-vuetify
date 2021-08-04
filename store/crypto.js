export const state = () => ({
  items: [],
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
  setResults(state, data) {
    state.items = data || []
  },
}

export const actions = {
  getResults({ commit }, params = {}) {
    const response = this.$axios.get(`/cryptocoins/${params?.wallet}`, {
      params,
    })
    response.then(({ data }) => {
      commit('setResults', data.cryptos)
    })
    return response
  },
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
  create({ commit, dispatch }, data) {
    const response = this.$axios.post(`/cryptocoins`, data)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadStockConsolidated', { wallet: data.walletId })
    })
    return response
  },
}
