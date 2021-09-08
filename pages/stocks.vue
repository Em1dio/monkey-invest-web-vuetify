<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-card outlined>
          <v-card-actions>
            <v-text-field
              type="search"
              v-model="search.q"
              append-outer-icon="mdi-magnify"
              @click:append-outer="getSearch"
            ></v-text-field>
          </v-card-actions>
        </v-card>
        <v-data-table :headers="headers" :items="items" hide-default-footer>
          <template v-slot:item.value="{ item }">
            {{ item.value | toCurrency }}
          </template>
          <template v-slot:item.total="{ item }">
            {{ (item.value * item.quantity) | toCurrency }}
          </template>
          <template v-slot:item.actualValue="{ item }">
            {{ item.actualValue | toCurrency }}
          </template>
          <template v-slot:item.totalActual="{ item }">
            {{ (item.actualValue * item.quantity) | toCurrency }}
          </template>
          <template v-slot:item.earn="{ item }">
            {{
              (item.actualValue * item.quantity - item.value * item.quantity)
                | toCurrency
            }}
          </template>
          <template v-slot:item.p="{ item }">
            {{ calcPercent(item.value, item.actualValue) | toPercent }}
          </template>
          <template v-slot:item.owner="{ item }">
            {{ item.userId }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on">
                  {{ $t('Menu') }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="onEdit(item)">
                  <v-list-item-title>{{ $t('Edit') }}</v-list-item-title>
                </v-list-item>
                <v-list-item @click="onTransfer(item)">
                  <v-list-item-title>{{ $t('Transfer') }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
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
      headers: [
        { text: this.$t('Symbol'), value: 'symbol', sortable: true },
        { text: this.$t('Quantity'), value: 'quantity', sortable: true },
        { text: this.$t('Purchase Value'), value: 'value', sortable: true },
        { text: this.$t('Total'), value: 'total', sortable: true },
        {
          text: this.$t('Actual Value'),
          value: 'actualValue',
          sortable: true,
        },
        {
          text: this.$t('Total Actual'),
          value: 'totalActual',
          sortable: true,
        },
        { text: this.$t('Earn'), value: 'earn', sortable: true },
        { text: '%', value: 'p', sortable: true },
        { text: this.$t('Owner'), value: 'owner', sortable: true },
        { text: this.$t('Actions'), value: 'actions', sortable: false },
      ],

      search: {
        page: 1,
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getResults()
    })
  },
  computed: {
    activeWallet() {
      return this.$store.state.wallet.activeWalletId
    },
    items() {
      return this.$store.state.stocks.items
    },
  },
  watch: {
    activeWallet: 'getResults',
  },
  methods: {
    calcPercent(value, actualValue) {
      return this.$util.calcPercent(value, actualValue)
    },
    getResults() {
      if (!this.activeWallet) {
        setTimeout(() => {
          this.getResults()
        }, 300)
        return false
      }

      const params = Object.assign(
        {},
        { wallet: this.activeWallet },
        this.search
      )
      this.loading = true
      this.$store.dispatch('stocks/getResults', params).then(
        ({ data }) => {
          this.loading = false
        },
        (e) => {
          this.loading = false
        }
      )
    },
    getSearch() {
      this.search.page = 1
      this.getResults()
    },
    onEdit(item) {
      this.$nuxt.$emit('stock-edit', item)
    },
    onTransfer(item) {
      this.$nuxt.$emit('stock-transfer', item)
    },
  },
}
</script>
