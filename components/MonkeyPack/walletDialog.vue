<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card :disabled="loading" :loading="loading">
        <v-card-title>
          <span class="text-h5">{{ $t('Wallet') }}</span>
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
                  :label="$t('Name')"
                  required
                  v-model="item.name"
                  :error-messages="inputNameErrors"
                  @input="$v.item.name.$touch()"
                  @blur="$v.item.name.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-switch
                  v-model="item.isPublic"
                  inset
                  :label="$t(item.isPublic ? 'Public' : 'Private')"
                ></v-switch>
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
      name: null,
      isPublic: false,
    },
    item
  )

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  validations: {
    item: {
      name: {
        required,
      },
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
    this.$nuxt.$on('wallet-edit', (item) => {
      this.isEdit = true
      this.dialog = true
      this.loading = false
      this.item = JSON.parse(JSON.stringify(item)) // clear
    })

    this.$nuxt.$on('wallet-add', () => {
      this.isEdit = false
      this.dialog = true
      this.loading = false
      this.item = defaultItem()
    })
  },
  computed: {
    inputNameErrors() {
      const errors = []
      if (!this.$v.item.name.$dirty) return errors
      !this.$v.item.name.required &&
        errors.push(this.$t('_ is required.', [this.$t('Name')]))
      return errors
    },
  },
  methods: {
    create() {
      this.$store.dispatch('wallet/create', this.item).then(
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
      this.$store.dispatch('wallet/update', this.item).then(
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
      this.$store.dispatch('wallet/delete', this.item).then(
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
