export const state = () => ({
  activeWalletId: null,
  activeWallet: {},
  wallets: [],
})

export const mutations = {
  setWallets(state, data) {
    if (state.activeWalletId == null && data.length > 0) {
      state.activeWalletId = data[0]?._id
    }
    state.wallets = data
  },
  setActiveWallet(state, id) {
    state.activeWalletId = id
    state.activeWallet = state.wallets.find(wallet => wallet._id === id)
  },
  setNewSharedUser(state, email) {
    state.activeWallet.sharedUsers.push(email)
  },
  removeSharedUser(state, email) {
    state.activeWallet.sharedUsers = state.activeWallet.sharedUsers.filter(x => x != email)
  }
}

export const actions = {
  getWallets({ commit }, params = {}) {
    const response = this.$axios.get(`/wallets`, {
      params,
    })
    response.then(({ data }) => {
      commit('setWallets', data)
    })
    return response
  },

  create({ commit, dispatch }, data) {
    const response = this.$axios.post(`/wallets`, data)
    response.then(({ data }) => {
      dispatch('getWallets', {})
    })
    return response
  },
  update({ commit, dispatch }, data) {
    const response = this.$axios.put(`/wallets/${data._id}`, data)
    response.then(({ data }) => {
      dispatch('getWallets', {})
    })
    return response
  },
  delete({ commit, dispatch }, data) {
    const response = this.$axios.delete(`/wallets/${data._id}`)
    response.then(({ data }) => {
      dispatch('getWallets', {})
    })
    return response
  },

  setActiveWallet({ commit }, id) {
    commit('setActiveWallet', id)
  },

  setNewSharedUser({ commit }, email) {
    commit('setNewSharedUser', email)
  },

  removeSharedUser({ commit }, email) {
    commit('removeSharedUser', email)
  },
}
