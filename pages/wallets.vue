<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-data-iterator
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            hide-default-footer
          >
            <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="4"
                >
                  <monkey-pack-wallet-card
                    :item="item"
                    @click="changeEdit(item)"
                  ></monkey-pack-wallet-card>
                </v-col>
              </v-row>
            </template>
          </v-data-iterator>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      loading: false,
      page: 1,
      itemsPerPage: -1,
    }
  },
  mounted() {
    this.getResults()
  },
  computed: {
    items() {
      return this.$store.state.wallet.wallets
    },
  },
  methods: {
    getResults() {
      this.loading = true
      this.$store.dispatch('wallet/getWallets', {}).then(
        () => {
          this.loading = false
        },
        (e) => {
          this.loading = false
        }
      )
    },
    changeEdit(item) {
      this.$nuxt.$emit('wallet-edit', item)
    },
  },
}
</script>
