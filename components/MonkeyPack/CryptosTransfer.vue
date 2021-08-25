<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :disabled="loading" :loading="loading">
        <v-card-title>
          <span class="text-h5">{{ $t('CryptoCoins') }}</span>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-combobox
                  :label="$t('Wallet')"
                  required
                  v-model="item.walletId"
                  :items="options"
                  :error-messages="inputSymbolErrors"
                  @input="$v.item.symbol.$touch()"
                  @blur="$v.item.symbol.$touch()"
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="isEdit" color="red darken-1" text @click="onExcluir">
            {{ $t('Delete') }}
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
const defaultItem = (item = {}) =>
  Object.assign(
    {},
    {
      _id: null,
      symbol: null,
      quantity: 1,
      value: 0,
      date: null,
      walletId: null,
    },
    item
  )

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    item: {
      symbol: {
        required,
      },
      quantity: {
        required,
      },
      value: {
        required,
      },
      date: {},
    },
  },
  data() {
    return {
      dialog: false,
      isEdit: false,
      loading: false,
      item: defaultItem(),
      options: this.$store.state.crypto.cryptocoins,
    }
  },
  mounted() {
    this.$store.dispatch('crypto/getCryptos');
    
    this.$nuxt.$on('crypto-transfer', (item) => {
      this.isEdit = true
      this.dialog = true
      this.loading = false
      this.item = JSON.parse(JSON.stringify(item)) // clear
    })

    this.$nuxt.$on('crypto-add', () => {
      this.isEdit = false
      this.dialog = true
      this.loading = false
      this.item = defaultItem()
    })
  },
  computed: {
    inputSymbolErrors() {
      const errors = []
      if (!this.$v.item.symbol.$dirty) return errors
      !this.$v.item.symbol.required &&
        errors.push(this.$t('_ is required.', [this.$t('Symbol')]))
      return errors
    },
    inputQuantityErrors() {
      const errors = []
      if (!this.$v.item.quantity.$dirty) return errors
      !this.$v.item.quantity.required &&
        errors.push(this.$t('_ is required.', [this.$t('Quantity')]))
      return errors
    },
    inputValueErrors() {
      const errors = []
      if (!this.$v.item.value.$dirty) return errors
      !this.$v.item.value.required &&
        errors.push(this.$t('_ is required.', [this.$t('Quantity')]))
      return errors
    },
    inputDateErrors() {
      const errors = []

      return errors
    },
    activeWallet() {
      return this.$store.state.wallet.activeWallet
    },
  },
  methods: {
    create() {
      this.$store.dispatch('crypto/create', this.item).then(
        () => {
          this.loading = false
          this.onClose()
        },
        (e) => {
          this.loading = false
        }
      )
    },
    update() {
      this.$store.dispatch('crypto/update', this.item).then(
        () => {
          this.loading = false
          this.onClose()
        },
        (e) => {
          this.loading = false
        }
      )
    },
    onExcluir() {
      this.loading = true
      this.$store.dispatch('crypto/delete', this.item).then(
        () => {
          this.loading = false
          this.onClose()
        },
        (e) => {
          this.loading = false
        }
      )
    },
    onClose() {
      this.dialog = false
    },
    onSave() {
      this.item.walletId = this.activeWallet
      this.loading = true
      if (this.isEdit) {
        this.update()
        return
      }
      this.create()
    },
  },
}
</script>
