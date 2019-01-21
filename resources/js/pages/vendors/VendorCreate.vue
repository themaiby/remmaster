<template>
  <VDialog
    v-model="dialog"
    max-width="1000px"
    scrollable
    persistent
  >
    <VCard>
      <VToolbar
        card
        color="white"
        flat
      >
        <VToolbarTitle>{{ $t('vendors.new') }}</VToolbarTitle>
      </VToolbar>

      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>
            <!-- Input -->
            <VFlex xs12 sm12 md12>
              <VTextField
                :label="$t('vendors.name')"
                name="name"
                v-model="vendor.name"
                @keypress.enter.native="create"
              />
            </VFlex>
            <VFlex xs12 sm12 md12>
              <v-textarea
                :label="$t('vendors.note')"
                name="name"
                v-model="vendor.note"
                @keypress.enter.native="create"
              />
            </VFlex>

            <template v-for="(contact, idx) in vendor.contacts">
              <VFlex xs1 sm1 md1>
                <v-select :items="icons" s
                          ingle-line
                          dense
                          autofocus
                          v-model="vendor.contacts[idx].icon"
                          mr5
                >
                  <template slot="selection" slot-scope="{item, index}">
                    <v-icon>{{ item }}</v-icon>
                  </template>
                  <template slot="item" slot-scope="{item, index}">
                    <v-icon>{{ item }}</v-icon>
                  </template>
                </v-select>
              </VFlex>
              <VFlex xs5 sm5 md5 ml3>
                <VTextField
                  :label="$t('vendors.contactTitle')"
                  name="name"
                  v-model="vendor.contacts[idx].title"
                  @keypress.enter.native="create"
                />
              </VFlex>
              <VFlex xs5 sm5 md5 ml3>
                <VTextField
                  :label="$t('vendors.contactValue')"
                  name="name"
                  v-model="vendor.contacts[idx].value"
                  @keypress.enter.native="create"
                />
              </VFlex>
              <v-spacer></v-spacer>
              <VFlex xs1 sm1 md1>
                <v-btn flat block>
                  <v-icon color="error">mdi-close</v-icon>
                </v-btn>
              </VFlex>
            </template>
            <VFlex xs12 sm12 md12>
              <v-btn block color="secondary" dark mt2 flat @click="addContact">{{ $t('vendors.addContact') }}</v-btn>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer/>
        <VBtn
          color="blue darken-1"
          flat
          @click="dialog = false"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          @click="create"
        >
          {{ $t('menu.submit') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {routeNames} from "../../router/routeNames";
  import IVendor from "../../models/IVendor";
  import IContact from "../../models/IContact";

  @Component export default class VendorCreate extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.vendors.index});
    }

    dialog: boolean = true;
    icons = [
      'mdi-cellphone',
      'mdi-deskphone',
      'mdi-email',
      'mdi-skype',
      'mdi-telegram',
      'mdi-facebook-messenger',
      'mdi-account-card-details',
      'mdi-home-city',
      'mdi-home',
      'mdi-store-24-hour'
    ];

    vendor: IVendor = {
      name: '',
      note: '',
      contacts: [],
    };

    addContact() {
      const contact: IContact = {icon: 'mdi-cellphone', title: '', value: ''};
      if (!this.vendor.contacts) {
        this.vendor.contacts = [contact];
      } else {
        this.vendor.contacts = [...this.vendor.contacts, contact];
      }
    }


    create() {
      console.log(JSON.stringify(this.vendor));
    }
  }
</script>

<style scoped>

</style>
