<template>
  <v-container>
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
            <VBtn
              icon
              @click="dialog = true"
            >
              <VIcon>mdi-plus</VIcon>
            </VBtn>
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
                  <VIcon>mdi-account-box-outline</VIcon>
                </VListTileAvatar>

                <!-- Content -->
                <VListTileContent>
                  <VListTileTitle v-html="contact.value"/>
                  <VListTileSubTitle v-html="contact.title"/>
                </VListTileContent>

                <!-- Actions -->
                <VListTileAction>
                  <VBtn
                    icon
                    ripple
                    @click="deleteContact(contact.id, contact.title)"
                  >
                    <VIcon color="error">
                      mdi-delete
                    </VIcon>
                  </VBtn>
                </VListTileAction>
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
  </v-container>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {applicationStore} from "../../store/modules/ApplicationStore";
  import {vendorsStore} from "../../store/modules/VendorsStore";
  import i18n from "../../plugins/i18n";
  import IVendor from "../../models/IVendor";

  @Component
  export default class VendorShow extends Vue {
    pageTitle: string = String(i18n.t('vendors.vendor'));

    @Watch('vendor') updateTitleAfterVendorReceived(vendor: IVendor) {
      applicationStore.setCurrentPageTitle(`${this.pageTitle} "${vendor.name}"`)
    }

    created() {
      applicationStore.setCurrentPageTitle(`${this.pageTitle}`);
      vendorsStore.getVendor(Number(this.$route.params.id));
    }

    get vendor(): IVendor {
      return vendorsStore.vendor;
    }
  }
</script>

<style scoped>

</style>
