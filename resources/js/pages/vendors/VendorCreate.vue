<template>
  <VDialog
    max-width="1000px"
    persistent
    scrollable
    v-model="dialog"
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
            <VFlex md12 sm12 xs12>
              <VTextField
                :data-vv-as="$t('vendors.name')"
                :disabled="isRequest"
                :error-messages="errors.collect('name')"
                :label="$t('vendors.name')"
                @keypress.enter.native="create"
                name="name"
                solo
                v-model="vendor.name"
                v-validate="'required'"
              />
            </VFlex>
            <VFlex md12 sm12 xs12>
              <v-textarea
                :disabled="isRequest"
                name="name"
                solo
                v-model="vendor.note"
              >
                <div slot="label">
                  {{ $t('vendors.note') }}
                  <small>{{ $t('menu.optional') }}</small>
                </div>
              </v-textarea>
            </VFlex>

            <template v-for="(contact, idx) in vendor.contacts">
              <VFlex md1 sm1 xs1>
                <v-select :disabled="isRequest"
                          :items="icons"
                          autofocus
                          dense
                          ingle-line
                          solo
                          v-model="vendor.contacts[idx].icon"
                >
                  <template slot="selection" slot-scope="{item, index}">
                    <v-icon>{{ item }}</v-icon>
                  </template>
                  <template slot="item" slot-scope="{item, index}">
                    <v-icon>{{ item }}</v-icon>
                  </template>
                </v-select>
              </VFlex>
              <VFlex md5 ml3 sm5 xs5>
                <VTextField
                  :data-vv-as="$t('vendors.contactTitle')"
                  :disabled="isRequest"
                  :error-messages="errors.collect(`contactTitle[${idx}]`)"
                  :label="$t('vendors.contactTitle')"
                  :name="`contactTitle[${idx}]`"
                  solo
                  v-model="vendor.contacts[idx].title"
                  v-validate="'required'"
                />
              </VFlex>
              <VFlex md5 ml3 sm5 xs5>
                <VTextField
                  :data-vv-as="$t('vendors.contactTitle')"
                  :disabled="isRequest"
                  :error-messages="errors.collect(`contactValue[${idx}]`)"
                  :label="$t('vendors.contactValue')"
                  :name="`contactValue[${idx}]`"
                  solo
                  v-model="vendor.contacts[idx].value"
                  v-validate="'required'"
                />
              </VFlex>
              <v-spacer></v-spacer>
              <VFlex md1 sm1 xs1>
                <v-btn @click="deleteContact(idx)" flat icon ml3>
                  <v-icon color="error">mdi-close</v-icon>
                </v-btn>
              </VFlex>
            </template>
            <VFlex md12 sm12 xs12>
              <v-btn @click="addContact" block class="gradient-button" dark mt2>{{ $t('vendors.addContact') }}</v-btn>
            </VFlex>
          </VLayout>
        </VContainer>
      </VCardText>

      <VCardActions>
        <VSpacer/>
        <VBtn
          @click="dialog = false"
          color="blue darken-1"
          flat
          v-if="!isRequest"
        >
          {{ $t('menu.cancel') }}
        </VBtn>
        <VBtn
          :loading="isRequest"
          @click="create"
          color="blue darken-1"
          flat
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
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import {Vendor} from "../../models/Vendor";

  @Component export default class VendorCreate extends Vue {
    vendor: Vendor = new Vendor;

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

    @Watch('dialog') routeBack(value: boolean) {
      if (!value) this.$router.push({name: routeNames.vendors.index});
    }

    @Watch('createdVendor') redirectToCreatedVendor(vendor: Vendor) {
      if (vendor.id) this.$router.push({
        name: routeNames.vendors.show,
        params: {
          id: String(vendor.id)
        }
      });
    }

    get isRequest() {
      return vendorsStore.isVendorCreatingRequest;
    }

    get createdVendor() {
      return vendorsStore.vendor;
    }

    addContact() {
      const icon = this.icons[this.getIconIndex(this.vendor.contacts ? this.vendor.contacts.length : 0)];
      this.vendor.addContact(icon, '', '');
    }

    deleteContact(idxToDelete: number) {
      this.vendor.removeContact(idxToDelete);
    }

    // if its more contacts that icons then return from start
    getIconIndex(currentContactsLength: number): number {
      return currentContactsLength >= this.icons.length ?
        (currentContactsLength % this.icons.length) :
        currentContactsLength;
    }

    create() {
      this.$validator.validate().then(valid => {
        if (valid) vendorsStore.createVendor(this.vendor);
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
