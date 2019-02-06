<template>
  <v-container fillheight="isRequest"
               fluid="isRequest">
    <v-layout align-center
              justify-center
              v-if="isRequest">
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-layout>
    <div v-if="!isRequest">
      <v-layout align-end justify-end v-if="userCanUpdate">
        <v-btn :to="{name: vendorUpdateRoute}" primary>{{ $t('vendors.update') }}</v-btn>
      </v-layout>

      <v-toolbar
        class="mb-2"
        color="transparent"
        flat
        slot="header"
      >
        <v-subheader>
          {{ vendor.note }}
        </v-subheader>
      </v-toolbar>

      <v-layout row wrap>
        <!-- CONTACTS -->
        <VFlex
          md6
          pr-1
          sm6
          xs12
        >
          <VCard>
            <v-toolbar color="blue-grey darken-2" dark dense>
              <VIcon color="white">
                mdi-contacts
              </VIcon>
              <VToolbarTitle>{{ $t('menu.contacts') }}</VToolbarTitle>
              <VSpacer/>
            </v-toolbar>

            <VList dense two-line>
              <template v-for="(contact, index) in vendor.contacts">
                <VDivider
                  :inset="false"
                  :key="index"
                  v-if="index > 0"
                />
                <VListTile
                  :key="contact.id"
                  avatar
                >
                  <!-- Avatar -->
                  <VListTileAvatar>
                    <VIcon>{{ contact.icon }}</VIcon>
                  </VListTileAvatar>

                  <!-- Content -->
                  <VListTileContent>
                    <VListTileTitle v-html="contact.value"/>
                    <VListTileSubTitle v-html="contact.title"/>
                  </VListTileContent>
                </VListTile>
              </template>
            </VList>
          </VCard>
        </VFlex>
        <!-- END CONTACTS -->

        <!-- COMPONENTS -->
        <VFlex
          md6
          pl-1
          sm6
          xs12
        >
          <VCard>
            <VToolbar color="blue-grey darken-2" dark dense>
              <VIcon color="white">
                mdi-cart
              </VIcon>
              <VToolbarTitle>{{ $t('menu.components') }}</VToolbarTitle>
              <VSpacer/>
              <VBtn
                @click="$router.push({name: 'components.create'})"
                icon
              >
                <VIcon>mdi-plus</VIcon>
              </VBtn>
            </VToolbar>

            <VList dense two-line>
              <template v-for="(component, index) in vendor.components">
                <VDivider
                  :inset="false"
                  :key="index"
                  v-if="index > 0"
                />
                <VListTile
                  :key="component.id"
                  :to="{name: 'components.show', params: {id: component.id}}"
                  avatar
                  ripple
                >
                  <!-- Content -->
                  <VListTileContent>
                    <VListTileTitle v-html="component.title">
                      asd
                    </VListTileTitle>
                    <VListTileSubTitle v-html="component.article"/>
                  </VListTileContent>

                  <!-- Actions -->
                  <VListTileAction>
                    <small>{{ $tc('pluralized.items', component.count) }}</small>
                  </VListTileAction>
                </VListTile>
              </template>
            </VList>
          </VCard>
        </VFlex>
        <!-- END COMPONENTS -->
      </v-layout>
    </div>
    <router-view/>
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import i18n from "../../plugins/i18n";
  import {usersStore} from "../../store/modules/UsersStore";
  import {routeNames} from "../../router/routeNames";
  import {defaultVendorModel, Vendor} from "../../models/Vendor";

  @Component
  export default class VendorShow extends Vue {
    pageTitle: string = String(i18n.t('vendors.vendor'));
    vendorUpdateRoute: string = routeNames.vendors.update;

    @Watch('vendor') updateTitleAfterVendorReceived(vendor: Vendor) {
      applicationStore.setCurrentPageTitle({text: `${this.pageTitle} "${vendor.name}"`});
    }

    get userCanUpdate() {
      return usersStore.currentUser.can('vendors.update');
    }

    get isRequest() {
      return vendorsStore.isRequest;
    }

    created() {
      applicationStore.setCurrentPageTitle({text: `${this.pageTitle} "${this.vendor.name}"`});
      if (!vendorsStore.vendor.id) vendorsStore.getVendor(Number(this.$route.params.id));
    }

    destroyed() {
      vendorsStore.setVendor(defaultVendorModel);
    }

    get vendor(): Vendor {
      return vendorsStore.vendor;
    }
  }
</script>

<style scoped>

</style>
