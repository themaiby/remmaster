<template>
  <VContent id="content-body">
    <VContainer
      fluid
      fill-height
    >
      <VLayout
        align-center
        justify-center
      >
        <VFlex
          xs12
          sm8
          md4
        >
            <VCardText>
              <VForm>
                <VTextField
                  @keypress.enter.native="login"
                  prepend-icon="mdi-email"
                  name="email"
                  type="email"
                  v-model="email"
                  :label="$t('attributes.email')"
                  :disabled="isRequest"
                  v-validate="'required|email'"
                  :error-messages="errors.collect('email')"
                  autofocus
                />
                <VTextField
                  @keypress.enter.native="login"
                  prepend-icon="mdi-lock"
                  name="password"
                  type="password"
                  v-model="password"
                  :label="$t('attributes.password')"
                  :disabled="isRequest"
                  v-validate="'required'"
                  :error-messages="errors.collect('password')"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  @click:append="show = !show"
                />
                <br>
                <VAlert
                  v-show="message"
                  :value="true"
                  type="error"
                  transition="scale-transition"
                  outline
                >
                  <v-icon>mdi-success</v-icon>
                  {{ message }}
                </VAlert>
              </VForm>
            </VCardText>
            <VCardActions>
              <VBtn
                :loading="isRequest"
                block
                id="login-button"
                @click="login"
                dark
              >
                {{ $t('auth.login') }}
              </VBtn>
            </VCardActions>
        </VFlex>
      </VLayout>
    </VContainer>
  </VContent>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {usersStore} from "../store/modules/UsersStore";
  import {routeNames} from "../router/routeNames";

  @Component
  export default class Login extends Vue {
    email: string = '';
    password: string = '';
    show: boolean = false;

    get isRequest() {
      return usersStore.isRequest;
    }

    get authorized() {
      return usersStore.authorized;
    }

    get message() {
      return usersStore.message;
    }

    @Watch('authorized') redirectWhenAuthorized() {
      this.$router.push({name: routeNames.home});
    }

    login() {
      this.$validator.validate().then(valid => {
        if (valid) usersStore.loginRequest({
          email: this.email,
          password: this.password,
        });
      });
    }
  }
</script>

<style scoped>
  #login-button {
    background: #136a8a; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #267871, #136a8a); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #267871, #136a8a); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
