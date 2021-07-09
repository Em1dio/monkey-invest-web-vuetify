<template>
  <div>
    <v-card :loading="loadingWallets" flat>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(item, index) in wallets"
            :key="index + '_wallet'"
            cols="12"
            xs="6"
            md="4"
            lg="3"
          >
            <monkey-pack-wallets-dashboard
              :name="item.name"
              :active="item._id == activeWallet"
              :id="item._id"
              :before="item.totalBefore"
              :now="item.totalActual"
              @click="setActiveWallets(item._id)"
            ></monkey-pack-wallets-dashboard>
          </v-col>
        </v-row>
        <v-row v-if="loadingWallets">
          <v-col
            v-for="(item, index) in 5"
            :key="index + '_walletload'"
            cols="12"
            xs="6"
            md="4"
            lg="3"
          >
            <v-skeleton-loader
              type="table-heading, list-item-two-line"
            ></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card flat :disabled="!activeWallet" :loading="loadingStocks">
      <v-card-title primary-title>
        {{ $t('Stocks Consolidated') }}
      </v-card-title>
      <v-card-text>
        <monkey-pack-wallet-content :item="stocks"></monkey-pack-wallet-content>
      </v-card-text>
    </v-card>
    <v-card flat :disabled="!activeWallet" :loading="loadingCrypto">
      <v-card-title primary-title>
        {{ $t('Crypto Consolidated') }}
      </v-card-title>
      <v-card-text>
        <monkey-pack-wallet-content :item="crypto"></monkey-pack-wallet-content>
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
      loadingWallets: false,
      loadingStocks: false,
      loadingCrypto: false,
    }
  },
  mounted() {
    this.getWallets()
  },
  computed: {
    wallets() {
      return this.$store.state.wallet.wallets
    },
    activeWallet() {
      return this.$store.state.wallet.activeWallet
    },
    stocks() {
      return this.$store.state.stocks.stocks
    },
    crypto() {
      return this.$store.state.crypto.crypto
    },
  },
  methods: {
    getWallets() {
      this.loadingWallets = true
      this.$store.dispatch('wallet/getWallets', {}).then(
        () => {
          this.loadingWallets = false
          this.getReadStockConsolidated()
          this.getReadCryptoConsolidated()
        },
        (e) => {
          this.loadingWallets = false
        }
      )
    },
    getReadStockConsolidated(wallet) {
      if (!wallet) {
        wallet = this.activeWallet
      }
      this.loadingStocks = true
      this.$store.dispatch('stocks/getReadStockConsolidated', { wallet }).then(
        () => {
          this.loadingStocks = false
        },
        () => {
          this.loadingStocks = false
        }
      )
      //
    },
    getReadCryptoConsolidated(wallet) {
      if (!wallet) {
        wallet = this.activeWallet
      }
      this.loadingCrypto = true
      this.$store.dispatch('crypto/getReadCryptoConsolidated', { wallet }).then(
        () => {
          this.loadingCrypto = false
        },
        () => {
          this.loadingCrypto = false
        }
      )
    },
    setActiveWallets(id) {
      this.$store.dispatch('wallet/setActiveWallet', id)
      this.getReadStockConsolidated(id)
      this.getReadCryptoConsolidated(id)
    },
  },
}
</script>
