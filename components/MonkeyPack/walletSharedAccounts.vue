<template>
  <div id="app">
      <v-data-table
        :headers="headers"
        :items="sharedUsers"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-dialog v-model="dialog" max-width="400px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $t('Add Shared Accounts') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5">
                  {{ $t('Are you sure you want to delete this item?') }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    {{ $t('Cancel') }}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                    {{ $t('OK') }}
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> {{ $t('Load') }} </v-btn>
        </template>
      </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'email', value: 'email', align: 'start', sortable: true },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    editedItem: {
      email: '',
    },
    defaultItem: {
      email: '',
    },
    email: '',
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    walletObj() {
      return this.$store.state.wallet.activeWallet
    },
    sharedUsers() {
      return this.walletObj?.sharedUsers.map((user) => {
        return { email: user }
      })
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    console.log('mounted')
    this.initialize()
  },
  created() {
    console.log('created')
    this.initialize()
  },
  methods: {
    initialize() {
      return this.sharedUsers
    },

    editItem(item) {
      this.editedIndex = this.sharedUsers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.email = item.email
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('wallet/removeSharedUser', this.email)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      this.$store.dispatch('wallet/setNewSharedUser', this.editedItem.email)
      this.close()
    },
  },
}
</script>