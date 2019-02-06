<template>
  <VContent id="content-body">
    <VContainer
      fill-height
      fluid
    >
      <VLayout
        align-center
        justify-center
      >
        <VFlex
          md4
          sm8
          xs12
        >
          <VCardText>
            <VForm>
              <VTextField
                :disabled="isRequest"
                :error-messages="errors.collect('email')"
                :label="$t('attributes.email')"
                @keypress.enter.native="login"
                autofocus
                name="email"
                prepend-icon="mdi-email"
                type="email"
                v-model="email"
                v-validate="'required|email'"
              />
              <VTextField
                :append-icon="show ? 'visibility_off' : 'visibility'"
                :disabled="isRequest"
                :error-messages="errors.collect('password')"
                :label="$t('attributes.password')"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
                @keypress.enter.native="login"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                v-model="password"
                v-validate="'required'"
              />
              <br>
              <VAlert
                :value="true"
                outline
                transition="scale-transition"
                type="error"
                v-show="message"
              >
                <v-icon>mdi-success</v-icon>
                {{ message }}
              </VAlert>
            </VForm>
          </VCardText>
          <VCardActions>
            <VBtn
              :loading="isRequest"
              @click="login"
              block
              dark
              id="login-button"
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
      this.$router.push({name: routeNames.dashboard});
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
