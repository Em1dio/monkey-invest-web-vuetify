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
              @input="getSearch"
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
        { text: this.$t('Cryptos'), value: 'symbol', sortable: false },
        { text: this.$t('Quantity'), value: 'quantity', sortable: false },
        { text: this.$t('Purchase Value'), value: 'value', sortable: false },
        { text: this.$t('Total'), value: 'total', sortable: false },
        {
          text: this.$t('Actual Value'),
          value: 'actualValue',
          sortable: false,
        },
        {
          text: this.$t('Total Actual'),
          value: 'totalActual',
          sortable: false,
        },
        { text: this.$t('Earn'), value: 'earn', sortable: false },
        { text: '%', value: 'p', sortable: false },
        { text: this.$t('Owner'), value: 'owner', sortable: false },
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
      return this.$store.state.wallet.activeWallet
    },
    items() {
      return this.$store.state.crypto.items
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
      this.$store.dispatch('crypto/getResults', params).then(
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
  },
}
</script>
