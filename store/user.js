export const state = () => ({})

export const mutations = {}

export const actions = {
  //

  signup({ commit, dispatch }, data) {
    const response = this.$axios.post(`/users`, data)
    return response
  },
  changePassword({ commit, dispatch }, data) {
    const response = this.$axios.post(`/users/change-password`, data)
    return response
  },
}
