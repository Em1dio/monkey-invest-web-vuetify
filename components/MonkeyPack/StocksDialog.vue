<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :disabled="loading" :loading="loading">
        <v-card-title>
          <span class="text-h5">{{ $t('Stocks') }}</span>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  :label="$t('Stock')"
                  required
                  v-model="item.symbol"
                  :error-messages="inputSymbolErrors"
                  @input="$v.item.symbol.$touch()"
                  @blur="$v.item.symbol.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  :label="$t('Quantity')"
                  required
                  v-model="item.quantity"
                  :error-messages="inputQuantityErrors"
                  @input="$v.item.quantity.$touch()"
                  @blur="$v.item.quantity.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="number"
                  :label="$t('Price')"
                  required
                  v-model="item.value"
                  :error-messages="inputValueErrors"
                  @input="$v.item.value.$touch()"
                  @blur="$v.item.value.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  type="date"
                  :label="$t('Date')"
                  required
                  v-model="item.date"
                  :error-messages="inputDateErrors"
                  @input="$v.item.date.$touch()"
                  @blur="$v.item.date.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn v-if="isEdit" color="red darken-1" text @click="onExcluir">
            {{ $t('Excluir') }}
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
    }
  },
  mounted() {
    this.$nuxt.$on('stock-edit', (item) => {
      this.isEdit = true
      this.dialog = true
      this.loading = false
      this.item = JSON.parse(JSON.stringify(item)) // clear
    })

    this.$nuxt.$on('stock-add', () => {
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
      this.$store.dispatch('stocks/create', this.item).then(
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
      this.$store.dispatch('stocks/update', this.item).then(
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
      this.$store.dispatch('stocks/delete', this.item).then(
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
