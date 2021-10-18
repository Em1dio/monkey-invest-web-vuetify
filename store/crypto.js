export const state = () => ({
  cryptocoins: [],
  items: [],
  crypto: {
    totalBefore: 0,
    totalActual: 0,
    pctEarn: 0,
  },
})

export const mutations = {
  setCryptos(state, data) {
    state.cryptocoins = data
  },
  setReadCryptoConsolidated(state, data) {
    state.crypto = data
  },
  setResults(state, data) {
    state.items = data || []
  },
}

export const actions = {
  getResults({ commit }, params = {}) {
    const config = {
      headers: { 'walletid': params.wallet }
    }
    const response = this.$axios.get(`/cryptocoins`, config)
    response.then(({ data }) => {
      commit('setResults', data.cryptos)
    })
    return response
  },
  getReadCryptoConsolidated({ commit }, params = {}) {
    const config = {
      headers: { 'walletid': params.wallet }
    }
    const response = this.$axios.get(`/cryptocoins/consolidated`, config)
    response.then(({ data }) => {
      commit('setReadCryptoConsolidated', data)
    })
    return response
  },
  getCryptos({ commit }) {
    const response = this.$axios.get(
      `/cryptocoins/get-crypto`,
    )
    response.then(({ data }) => {
      commit('setCryptos', data)
    })
    return response
  },
  create({ commit, dispatch }, data) {
    const config = {
      headers: { 'walletid': data.walletId }
    }
    const response = this.$axios.post(`/cryptocoins`, config)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadCryptoConsolidated', { wallet: data.walletId })
    })
    return response
  },
  transfer({ commit, dispatch }, data) {
    const response = this.$axios.post(`cryptocoins/transfer/${data.id}`, data)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadCryptoConsolidated', { wallet: data.walletId })
    })
    return response
  },
  update({ commit, dispatch }, data) {
    const config = {
      headers: { 'walletid': data.walletId }
    }
    const response = this.$axios.put(`/cryptocoins/${data._id}`, config)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadCryptoConsolidated', { wallet: data.walletId })
    })
    return response
  },
  delete({ commit, dispatch }, data) {
    const config = {
      headers: { 'walletid': data.walletId }
    }
    const response = this.$axios.delete(`/cryptocoins/${data._id}`, config)
    response.then(({ data }) => {
      dispatch('getResults', { wallet: data.walletId })
      dispatch('getReadCryptoConsolidated', { wallet: data.walletId })
    })
    return response
  },
}
