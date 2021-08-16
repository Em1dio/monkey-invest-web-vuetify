<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm9 md6>
        <logo class="text-center"></logo>
        <v-form v-model="valid">
          <pre></pre>
          <v-card>
            <v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    :label="$t('Name')"
                    name="name"
                    :error-messages="authNameErrors"
                    v-model="auth.name"
                    @input="$v.auth.name.$touch()"
                    @blur="$v.auth.name.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    id="username"
                    name="username"
                    :label="$t('E-mail')"
                    :error-messages="authUsernameErrors"
                    v-model="auth.username"
                    @input="$v.auth.username.$touch()"
                    @blur="$v.auth.username.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    :label="$t('Password')"
                    v-model="auth.password"
                    :error-messages="authPasswordErrors"
                    @input="$v.auth.password.$touch()"
                    @blur="$v.auth.password.$touch()"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    :label="$t('Confirm Password')"
                    v-model="auth.confirmPassword"
                    :error-messages="authConfirmPasswordErrors"
                    @input="$v.auth.confirmPassword.$touch()"
                    @blur="$v.auth.confirmPassword.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn text small to="/login">{{
                $t('Click here to Login')
              }}</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                :disabled="this.$v.auth.$invalid"
                color="red darken-3"
                depressed
                outlined
                @click="userAuth"
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    auth: {
      name: {
        required,
      },
      username: { required, minLength: minLength(4) },
      password: { required, minLength: minLength(4) },
      confirmPassword: {
        sameAsPassword: sameAs('password'),
      },
    },
  },
  data() {
    return {
      valid: false,
      auth: {
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {
    authNameErrors() {
      const errors = []
      if (!this.$v.auth.name.$dirty) return errors
      !this.$v.auth.name.required &&
        errors.push(this.$t('_ is required.', [this.$t('Name')]))
      return errors
    },
    authUsernameErrors() {
      const errors = []
      if (!this.$v.auth.username.$dirty) return errors
      !this.$v.auth.username.required &&
        errors.push(this.$t('_ is required.', [this.$t('Username')]))
      !this.$v.auth.username.minLength &&
        errors.push(
          this.$t('_ must have at least _ letters.', [
            this.$t('Username'),
            this.$v.auth.username.$params.minLength.min,
          ])
        )
      return errors
    },
    authPasswordErrors() {
      const errors = []
      if (!this.$v.auth.password.$dirty) return errors
      !this.$v.auth.password.required &&
        errors.push(this.$t('_ is required.', [this.$t('Password')]))
      !this.$v.auth.password.minLength &&
        errors.push(
          this.$t('_ must have at least _ letters.', [
            this.$t('Password'),
            this.$v.auth.username.$params.minLength.min,
          ])
        )
      return errors
    },
    authConfirmPasswordErrors() {
      const errors = []
      if (!this.$v.auth.confirmPassword.$dirty) return errors
      !this.$v.auth.confirmPassword.sameAsPassword &&
        errors.push(this.$t('Passwords must be identical.'))
      return errors
    },
  },
  mounted() {},
  methods: {
    async userAuth() {
      this.$v.$touch()
      if (this.$v.auth.$invalid) {
        return
      }
      try {
        // console.log(this.auth);
        await this.$store.dispatch('user/signup', this.auth)
        await this.$auth.loginWith('local', { data: this.auth })
      } catch (e) {
        const err = e.response
        if (err.status === 400) {
          this.$nuxt.error({ statusCode: 400, message: err.data.message })
        }
        if (err.status === 404) {
          this.$nuxt.error({ statusCode: 404, message: this.$t('not found') })
        } else if (err.status === 500) {
          this.$nuxt.error({
            statusCode: 500,
            message: this.$t('Internal Server Error'),
          })
        } else {
          this.$nuxt.error({ statusCode: err.status, message: 'Error' })
        }
      }
    },
  },
}
</script>
