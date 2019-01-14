<template>
  <VContent>
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
          <VCard class="elevation-12">
            <VToolbar
              dark
              color="primary"
            >
              <VToolbarTitle>{{ $t('auth.login') }}</VToolbarTitle>
              <VSpacer/>
            </VToolbar>
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
                />
                <br>
                <VAlert
                  v-show="true"
                  :value="true"
                  type="error"
                  transition="scale-transition"
                >
                  <v-icon>mdi-success</v-icon>
                  {{ 'message' }}
                </VAlert>
              </VForm>
            </VCardText>
            <VCardActions>
              <VSpacer/>
              <VBtn
                color="primary"
                @click="login"
                :disabled="isRequest"
              >
                {{ $t('auth.login') }}
              </VBtn>
            </VCardActions>
          </VCard>
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

    get isRequest() {
      return usersStore.isRequest;
    }

    get authorized() {
      return usersStore.authorized;
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

</style>
