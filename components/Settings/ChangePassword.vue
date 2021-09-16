<template>
  <div>
    <v-card width="300" elevation="2" class="mx-auto">
      <v-card-title class="text-h5">
        {{ $t('Change Password') }}
      </v-card-title>

      <v-card-text>
        <v-text-field
          :label="$t('Password')"
          required
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-text-field
          :label="$t('New Password')"
          required
          v-model="newPassword"
          :type="showNewPassword ? 'text' : 'password'"
          :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showNewPassword = !showNewPassword"
        ></v-text-field>
        <v-text-field
          :label="$t('New Password Again')"
          required
          v-model="newPasswordAgain"
          :type="shownewPasswordAgain ? 'text' : 'password'"
          :append-icon="shownewPasswordAgain ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="shownewPasswordAgain = !shownewPasswordAgain"
        ></v-text-field>
        <v-btn elevation="2" color="deep-orange accent-4" text @click="changePassword">
          {{ $t('Change Password') }}
        </v-btn>
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
      password: '',
      showPassword: false,
      newPassword: '',
      showNewPassword: false,
      newPasswordAgain: '',
      shownewPasswordAgain: false,
    }
  },
  methods: {
    changePassword() {
      if (this.newPassword !== this.newPasswordAgain) {
        return;
      }
      const data = { oldPassword: this.paszsword, password: this.newPassword }
      this.$store.dispatch('user/changePassword', data)
    },
  },
}
</script>
