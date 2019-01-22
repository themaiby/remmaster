<template>
  <v-container fillheight="isRequest"
               fluid="isRequest">
    <v-layout v-if="isRequest"
              align-center
              justify-center>
      <v-progress-circular indeterminate size="100"></v-progress-circular>
    </v-layout>
    <div v-if="!isRequest">
      <v-layout align-end justify-end v-if="userCanUpdate">
        <v-btn primary :to="{name: vendorUpdateRoute}">{{ $t('vendors.update') }}</v-btn>
      </v-layout>

      <v-toolbar
        slot="header"
        class="mb-2"
        color="transparent"
        flat
      >
        <v-subheader>
          {{ vendor.note }}
        </v-subheader>
      </v-toolbar>

      <v-layout row wrap>
        <!-- CONTACTS -->
        <VFlex
          xs12
          sm6
          md6
          pr-1
        >
          <VCard>
            <v-toolbar dense color="blue-grey darken-2" dark>
              <VIcon color="white">
                mdi-contacts
              </VIcon>
              <VToolbarTitle>{{ $t('menu.contacts') }}</VToolbarTitle>
              <VSpacer/>
            </v-toolbar>

            <VList two-line dense>
              <template v-for="(contact, index) in vendor.contacts">
                <VDivider
                  v-if="index > 0"
                  :inset="false"
                  :key="index"
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
          xs12
          sm6
          md6
          pl-1
        >
          <VCard>
            <VToolbar dense color="blue-grey darken-2" dark>
              <VIcon color="white">
                mdi-cart
              </VIcon>
              <VToolbarTitle>{{ $t('menu.components') }}</VToolbarTitle>
              <VSpacer/>
              <VBtn
                icon
                @click="$router.push({name: 'components.create'})"
              >
                <VIcon>mdi-plus</VIcon>
              </VBtn>
            </VToolbar>

            <VList two-line dense>
              <template v-for="(component, index) in vendor.components">
                <VDivider
                  v-if="index > 0"
                  :inset="false"
                  :key="index"
                />
                <VListTile
                  :key="component.id"
                  avatar
                  ripple
                  @click="$router.push({name: 'components.show', params: {id: component.id}})"
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
    <router-view />
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import i18n from "../../plugins/i18n";
  import IVendor from "../../models/IVendor";
  import {userHelper} from "../../utils/UserHelpers";
  import {usersStore} from "../../store/modules/UsersStore";
  import {routeNames} from "../../router/routeNames";

  @Component
  export default class VendorShow extends Vue {
    pageTitle: string = String(i18n.t('vendors.vendor'));
    vendorUpdateRoute: string = routeNames.vendors.update;

    @Watch('vendor') updateTitleAfterVendorReceived(vendor: IVendor) {
      applicationStore.setCurrentPageTitle(`${this.pageTitle} "${vendor.name}"`);
    }

    get userCanUpdate() {
      return userHelper.can(usersStore.currentUser, 'vendors.update');
    }

    get isRequest() {
      return vendorsStore.isRequest;
    }

    created() {
      applicationStore.setCurrentPageTitle(`${this.pageTitle} "${this.vendor.name}"`);
      if (!vendorsStore.vendor.id) vendorsStore.getVendor(Number(this.$route.params.id));
    }

    destroyed() {
      vendorsStore.setVendor({name: ''});
    }

    get vendor(): IVendor {
      return vendorsStore.vendor;
    }
  }
</script>

<style scoped>

</style>
