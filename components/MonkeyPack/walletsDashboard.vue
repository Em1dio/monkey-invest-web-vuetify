<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover ? 12 : 0" outlined @click="setActive">
        <v-card-title class="pl-2">
          <v-spacer></v-spacer>
          <v-icon
            v-if="active"
            style="margin-top: -12px; margin-right: -6px"
            :color="itsPositive ? 'green' : 'red'"
            >{{
              itsPositive
                ? 'mdi-check-circle-outline'
                : 'mdi-check-circle-outline'
            }}
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="2" sm="2" md="3">
              <v-icon size="60">mdi-wallet-outline</v-icon>
            </v-col>
            <v-col cols="10" sm="10" md="9">
              <strong>{{ name }}</strong>
              <br />
              <v-chip
                class="pa-3"
                text-color="white"
                :color="itsPositive ? 'green' : 'red'"
                >{{ currently | toCurrency }}
              </v-chip>
              <v-icon :color="itsPositive ? 'green' : 'red'">
                {{ itsPositive ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
              </v-icon>
              {{ percent | toPercent }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    before: {
      type: Number,
      default: 0,
    },
    now: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: '1',
    },
    active: {
      type: Boolean,
      default: () => false,
    },
    name: {
      type: String,
      default: '',
    },
  },
  computed: {
    currently() {
      return this.now
    },
    percent() {
      return this.$util.calcPercent(this.before, this.now)
    },
    itsPositive() {
      return this.currently >= 0
    },
  },
  methods: {
    setActive() {
      this.$emit('click')
    },
    calcPercent(before, now) {
      return this.$util.calcPercent(before, now)
    },
  },
}
</script>

<style scoped>
* {
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  border: none;
  outline: none;
}

.wallets {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-wallets {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-wallets h2 {
  font-size: 12pt;
  color: #e7e7e7;
}

.header-wallets .title-bar {
  margin-top: 5px;
  width: 50px;
  height: 4px;
  border-radius: 5px;
  background: #e27034;
}

.body-wallets {
  margin-top: 20px;
  width: 100%;
  display: flex;
  column-gap: 20px;
}

.wallet {
  display: flex;
  align-items: center;
  width: 240px;
  height: 80px;
  background: #363463;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.wallet-active {
  display: flex;
  align-items: center;
  width: 240px;
  height: 80px;
  background: #4e4a8f;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.wallet:hover {
  transform: scale(1.01);
  background: #4e4a8f;
}

.wallet-icon {
  width: 60px;
  height: 100%;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.wallet-icon svg {
  stroke: #e7e7e7;
  width: 30px;
  height: 30px;
  stroke-width: 1.2;
}

.wallet-infos {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.wallet-infos h2 {
  font-size: 10pt;
  color: #e7e7e7;
}

.wallet-value {
  display: flex;
  align-items: flex-end;
}

.wallet-value .value {
  margin-top: 5px;
  padding: 4px 7px;
  font-weight: bold;
  font-size: 9pt;
  border-radius: 20px;
}

.value-positive {
  background: #4caf50;
  color: rgb(21, 71, 55);
}

.value-negative {
  background: #ff6a64;
  color: #752e2c;
}

.wallet-value .percent {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 10pt;
}

.positive {
  color: #4caf50;
}

.negative {
  color: #f3807c;
  font-weight: bold;
}

.wallet-value .percent svg {
  width: 19px;
  height: 19px;
  margin-right: -3px;
  stroke-width: 2;
}

/* wallter-infos-container */

.wallet-content {
  margin-top: 40px;
}

.wallet-content-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.wallet-content-header h2 {
  font-size: 12pt;
  color: #e7e7e7;
}

.wallet-content-header .title-bar {
  margin-top: 5px;
  width: 50px;
  height: 4px;
  border-radius: 5px;
  background: #e27034;
}

/* active-icon */

.active-icon-icon {
  width: 30px;
  height: 30px;
  padding: 5px;
  stroke-width: 2;
}
.active-icon-positive {
  stroke: rgb(21, 71, 55);
}
.active-icon-negative {
  stroke: rgb(71, 21, 21);
}

.active-icon {
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin-left: 220px;
  margin-top: -70px;
}
</style>
