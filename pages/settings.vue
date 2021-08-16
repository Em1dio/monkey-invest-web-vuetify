<template>
  <div>
    <h1>{{ $t('Change Password') }}</h1>
    <v-cols>
      <v-row>
        <v-text-field
          type="text"
          :label="$t('Password')"
          required
          v-model="password"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          type="text"
          :label="$t('New Password')"
          required
          v-model="password"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          type="text"
          :label="$t('New Password Again')"
          required
          v-model="password"
        ></v-text-field>
      </v-row>
    </v-cols>
    <v-btn elevation="2">{{ $t('Change Password') }}</v-btn>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  layout: 'admin',
  data() {
    return {
      password: '',
    }
  },
  methods: {
    changePassword() {
      this.$nuxt.$emit('password-edit')
    },
  },
}
</script>
