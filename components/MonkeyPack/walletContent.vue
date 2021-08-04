<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-icon size="50px">mdi-cash-register</v-icon>
          </v-col>
          <v-col>
            <h3>{{ $t('Invested') }}</h3>
            <p :class="totalInvested > 0 ? 'positive' : 'negative'">
              {{ totalInvested | toCurrency }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-icon size="50px">mdi-currency-usd</v-icon>
          </v-col>
          <v-col>
            <h3>{{ $t('Actual Value') }}</h3>
            <p :class="totalActualValue > 0 ? 'positive' : 'negative'">
              {{ totalActualValue | toCurrency }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-icon size="50px">mdi-scale-balance</v-icon>
          </v-col>
          <v-col>
            <h3>{{ $t('Earn') }}</h3>
            <p :class="totalEarn > 0 ? 'positive' : 'negative'">
              {{ totalEarn | toCurrency }}
            </p>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="2">
            <v-icon size="50px">mdi-sale</v-icon>
          </v-col>
          <v-col>
            <h3>{{ $t('Earn') }}</h3>
            <p :class="pctEarn > 0 ? 'positive' : 'negative'">
              {{ pctEarn | toPercent }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    totalInvested() {
      return this.item.totalBefore
    },
    totalActualValue() {
      return this.item.totalActual
    },
    totalEarn() {
      return this.item.totalActual - this.item.totalBefore
    },
    pctEarn() {
      return this.$util.calcPercent(
        this.item.totalBefore,
        this.item.totalActual
      )
    },
  },
}
</script>
<style scoped>
.positive {
  color: #4caf50;
}

.negative {
  color: #cf4747;
}
</style>
