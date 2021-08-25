export const state = () => ({
  items: [],
  stocks: {
    totalBefore: 0,
    totalActual: 0,
    pctEarn: 0,
  },
})

export const mutations = {
  setReadStockConsolidated(state, data) {
    state.stocks = data
  },
  setResults(state, data) {
    state.items = data || []
  },
}

export const actions = {
  getResults({ commit }, params = {}) {
    const response = this.$axios.get(`/stocks/${params?.wallet}`, {
      params,
    })
    response.then(({ data }) => {
      commit('setResults', data)
    })
    return response
  },
  create({ commit, dispatch }, data) {
    const response = this.$axios.post(`/stocks`, data)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadStockConsolidated', { wallet: data.walletId })
    })
    return response
  },
  transfer({ commit, dispatch }, data) {
    const response = this.$axios.post(`stocks/transfer/${data.id}`, data)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadStockConsolidated', { wallet: data.walletId })
    })
    return response
  },
  update({ commit, dispatch }, data) {
    const response = this.$axios.put(
      `/stocks/${data.walletId}/${data._id}`,
      data
    )
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadStockConsolidated', { wallet: data.walletId })
    })
    return response
  },
  delete({ commit, dispatch }, data) {
    const response = this.$axios.delete(`/stocks/${data.walletId}/${data._id}`)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadStockConsolidated', { wallet: data.walletId })
    })
    return response
  },
  getReadStockConsolidated({ commit }, params = {}) {
    const response = this.$axios.get(`/stocks/consolidated/${params?.wallet}`, {
      params,
    })
    response.then(({ data }) => {
      commit('setReadStockConsolidated', data)
    })
    return response
  },
  //
}
