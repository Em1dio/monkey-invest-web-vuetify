<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <logo class="text-center"></logo>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col>
                <v-text-field
                  :label="$t('E-mail & Username')"
                  v-model="login.username"
                  :error-messages="error"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="password"
                  :label="$t('Password')"
                  v-model="login.password"
                  @keyup.enter="userLogin"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text small to="/signup">{{
              $t('Click here to Sign-up')
            }}</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="orange darken-3"
              depressed
              outlined
              @click="userLogin"
              >{{ $t('OK') }}</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      error: [],
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      this.error = []
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
        this.$router.push('/')
      } catch (e) {
        const { status, data } = e.response
        this.error.push(data.error)
      }
    },
  },
}
</script>
