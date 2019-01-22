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
        <VToolbarTitle>{{ $t('vendors.update') }}</VToolbarTitle>
      </VToolbar>

      <VCardText>
        <VContainer grid-list-md>
          <VLayout wrap>
            <!-- Input -->
            <VFlex xs12 sm12 md12>
              <VTextField
                :label="$t('vendors.name')"
                name="name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
                v-model="vendor.name"
                :data-vv-as="$t('vendors.name')"
                @keypress.enter.native="create"
                solo
                :disabled="isRequest"
              />
            </VFlex>
            <VFlex xs12 sm12 md12>
              <v-textarea
                name="name"
                v-model="vendor.note"
                solo
                :disabled="isRequest"
              >
                <div slot="label">
                  {{ $t('vendors.note') }}
                  <small>{{ $t('menu.optional') }}</small>
                </div>
              </v-textarea>
            </VFlex>

            <template v-for="(contact, idx) in vendor.contacts">
              <VFlex xs1 sm1 md1>
                <v-select :items="icons"
                          solo
                          ingle-line
                          dense
                          autofocus
                          v-model="vendor.contacts[idx].icon"
                          :disabled="isRequest"
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
                  v-model="vendor.contacts[idx].title"
                  solo
                  v-validate="'required'"
                  :name="`contactTitle[${idx}]`"
                  :error-messages="errors.collect(`contactTitle[${idx}]`)"
                  :data-vv-as="$t('vendors.contactTitle')"
                  :disabled="isRequest"
                />
              </VFlex>
              <VFlex xs5 sm5 md5 ml3>
                <VTextField
                  :label="$t('vendors.contactValue')"
                  v-model="vendor.contacts[idx].value"
                  solo
                  v-validate="'required'"
                  :name="`contactValue[${idx}]`"
                  :error-messages="errors.collect(`contactValue[${idx}]`)"
                  :data-vv-as="$t('vendors.contactTitle')"
                  :disabled="isRequest"
                />
              </VFlex>
              <v-spacer></v-spacer>
              <VFlex xs1 sm1 md1>
                <v-btn flat @click="deleteContact(idx)" icon ml3>
                  <v-icon color="error">mdi-close</v-icon>
                </v-btn>
              </VFlex>
            </template>
            <VFlex xs12 sm12 md12>
              <v-btn :disabled="isRequest"
                     class="gradient-button"
                     block dark mt2 @click="addContact">
                {{ $t('vendors.addContact') }}
              </v-btn>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer/>
        <VBtn
          v-if="!isRequest"
          color="blue darken-1"
          flat
          @click="dialog = false"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          color="blue darken-1"
          flat
          @click="confirm"
          :loading="isRequest"
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
  import {vendorsStore} from "../../store/modules/VendorsStore";

  @Component export default class VendorsEdit extends Vue {
    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({
        name: routeNames.vendors.show,
        params: {
          id: String(this.vendor.id)
        }
      });
    }

    @Watch('storedVendor') setLocaleVendorModel(vendor: IVendor) {
      if (!this.vendor.id) this.vendor = {...vendor};
    }

    vendor: IVendor = {name: ''};
    dialog: boolean = true;
    icons = [
      'mdi-cellphone',
      'mdi-deskphone',
      'mdi-email',
      'mdi-skype',
      'mdi-telegram',
      'mdi-linkedin',
      'mdi-web',
      'mdi-account-card-details',
      'mdi-home-city',
    ];

    created() {
      // full assign cuz without  destruct local vendor will reactive
      if (!vendorsStore.vendor.id) {
        vendorsStore.getVendor(Number(this.$route.params.id));
      } else {
        this.vendor = {...vendorsStore.vendor};
      }
    }

    get storedVendor() {
      return vendorsStore.vendor;
    }

    get isRequest() {
      return vendorsStore.isRequest;
    }

    addContact() {
      const icon = this.icons[this.getIconIndex(this.vendor.contacts ? this.vendor.contacts.length : 0)];
      const contact: IContact = {
        icon,
        title: '',
        value: ''
      };
      if (!this.vendor.contacts) {
        this.vendor.contacts = [contact];
      } else {
        this.vendor.contacts = [...this.vendor.contacts, contact];
      }
    }

    deleteContact(idxToDelete: number) {
      if (this.vendor.contacts) {
        this.vendor.contacts = this.vendor.contacts.filter(
          (contact, idx) => idx !== idxToDelete
        );
      }
    }

    // if its more contacts that icons then return from start
    getIconIndex(currentContactsLength: number): number {
      return currentContactsLength >= this.icons.length ?
        (currentContactsLength % this.icons.length) :
        currentContactsLength;
    }

    confirm() {
      this.$validator.validate().then(valid => {
        if (valid) {
          vendorsStore.updateVendor(this.vendor);
          this.dialog = false;
        }
      });
    }
  }
</script>

<style scoped>
  .gradient-button {
    background: #3C3B3F; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #605C3C, #3C3B3F); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #605C3C, #3C3B3F); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>


