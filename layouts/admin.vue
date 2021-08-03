<template>
  <v-app>
    <v-navigation-drawer dark color="grey darken-4" v-model="drawer" fixed app>
      <div class="text-center">
        <logo font-size="30px"></logo>
      </div>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat :clipped-left="clipped" fixed app la>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-if="activeWallet">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <v-icon>mdi-wallet-outline</v-icon>
              {{ labelWallet }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in wallets"
              :key="index + '_w'"
              @click="setActiveWallets(item._id)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-title>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-icon>mdi-translate</v-icon>
            {{ $i18n.locale }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in availableLocales"
            :key="index + '_lang'"
            @click="() => $i18n.setLocale(item.code)"
          >
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon @click.stop="onLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-speed-dial bottom right fixed>
          <template v-slot:activator>
            <v-btn v-model="fab" color="grey darken-2" dark fab>
              <v-icon v-if="fab"> mdi-close </v-icon>
              <v-icon v-else> mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-btn @click="onAddStocks" fab dark small color="green">
            <v-icon>mdi-currency-usd</v-icon>
          </v-btn>
          <v-btn  @click="onAddCryptos" fab dark small color="grey">
            <v-icon>mdi-bitcoin</v-icon>
          </v-btn>
          <v-btn @click="onAddWallet" fab dark small color="grey">
            <v-icon>mdi-wallet-outline</v-icon>
          </v-btn>
        </v-speed-dial>

        <Nuxt />
        <MonkeyPackWalletDialog></MonkeyPackWalletDialog>
        <MonkeyPackCryptosDialog></MonkeyPackCryptosDialog>
        <MonkeyPackStocksDialog></MonkeyPackStocksDialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fab: false,
      // fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  },
  created() {
    this.$vuetify.theme.dark = false
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('wallet/getWallets', {})
    })
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    wallets() {
      return this.$store.state.wallet.wallets
    },
    activeWallet() {
      return this.$store.state.wallet.activeWallet
    },
    labelWallet() {
      return this.wallets.find((v) => v._id == this.activeWallet)?.name
    },
    items() {
      return [
        {
          icon: 'mdi-apps',
          title: this.$t('Dashboard'),
          to: '/',
        },
        {
          icon: 'mdi-wallet-outline',
          title: this.$t('Wallets'),
          to: '/wallets',
        },
        {
          icon: 'mdi-currency-usd',
          title: this.$t('Stocks'),
          to: '/stocks',
        },
        {
          icon: 'mdi-bitcoin',
          title: this.$t('CryptoCoins'),
          to: '/cryptocoins',
        },
        {
          icon: 'mdi-account-cog',
          title: this.$t('Settings'),
          to: '/settings',
        },
      ]
    },
  },
  methods: {
    onAddWallet() {
      this.$nuxt.$emit('wallet-add')
    },
    onAddStocks() {
      this.$nuxt.$emit('stock-add')
    },
    onAddCryptos() {
      this.$nuxt.$emit('crypto-add')
    },
    setActiveWallets(id) {
      this.$store.dispatch('wallet/setActiveWallet', id)
      this.$store.dispatch('stocks/getReadStockConsolidated', { wallet: id })
      this.$store.dispatch('crypto/getReadCryptoConsolidated', { wallet: id })
    },
    async onLogout() {
      await this.$auth.logout()
      window.location.reload()
    },
  },
}
</script>
