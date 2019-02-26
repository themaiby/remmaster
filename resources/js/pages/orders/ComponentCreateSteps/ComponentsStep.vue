<template>
  <div>
    <v-stepper-step :color="validation === 'success' ? 'success' : 'primary'"
                    :complete="validation === 'success'"
                    :rules="[() => validation !== 'failed']"
                    :step="step"
    >
      {{ $t('orders.components') }}
      <small>{{ $t('attributes.optional')}}</small>
    </v-stepper-step>
    <v-stepper-content :step="step">

      <v-layout :key="idx" v-for="(component, idx) in order.components">
        <!-- Component name combobox -->
        <v-flex lg11 md11 pa-1 sm11>
          <v-autocomplete
            :data-vv-as="$t('components.title')"
            :error-messages="errors.collect('component_id')"
            :items="availableComponents"
            :label="$t('orders.components')"
            hide-selected

            item-disabled="disabledItems"
            item-value="id"
            name="component_id"
            persistent-hint
            v-model="component.component_id"
            v-validate="'required'"
          >
            <template slot="item" slot-scope="data">
              <v-flex lg11 md11 pa-1 sm11>{{ data.item.title }} - [{{ data.item.article }}]</v-flex>
              <v-flex lg1 md1 pa-1 sm1>x{{ data.item.count }}</v-flex>
            </template>
            <template slot="selection" slot-scope="data">
              <v-flex lg11 md11 pa-1 sm11>{{ data.item.title }} - [{{ data.item.article }}]</v-flex>
              <v-flex lg1 md1 pa-1 sm1>x{{ data.item.count }}</v-flex>
            </template>
          </v-autocomplete>
        </v-flex>

        <!--component count -->
        <v-flex lg1 md1 pa-1 sm1>
          <v-text-field
            :data-vv-as="$t('components.count')"
            :disabled="!component.component_id"
            :error-messages="errors.collect('component_count')"
            :max="getParentsCount(component.component_id)"
            @click:append-outer="removeComponentByIdx(idx)"
            append-outer-icon="mdi-delete"
            min="1"
            name="component_count"
            type="number"

            v-model="component.count"
            v-on:keypress.prevent
            v-validate="'numeric|min_value:1'"
            value="1"
          >

          </v-text-field>
        </v-flex>
      </v-layout>
      <v-flex>
        <v-btn @click="addComponent" block flat>{{ $t('components.add') }}</v-btn>
      </v-flex>

      <v-btn @click="stepNext" color="primary">{{ $t('attributes.continue') }}</v-btn>
      <v-btn @click="stepBack" flat>{{ $t('attributes.beforeStep') }}</v-btn>
    </v-stepper-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from "vue-property-decorator";
  import {modelsStore} from "../../../store/modules/ModelsStore";
  import {Order} from "../../../models/Order";
  import {componentsStore} from "../../../store/modules/ComponentsStore";
  import {Component as ComponentModel} from "../../../models/Component";

  @Component
  export default class ClientStep extends Vue {
    validation: "success" | "failed" | "" = "";
    step: number = 4;

    @Watch('components', {immediate: true, deep: true}) fixCollision(components: ComponentModel[]) {
      components.map(component => {
        /* get component choice */
        const parentComponent = this.availableComponents.find((availableComponent) =>
          component.component_id === availableComponent.component_id);

        /* fix count if component's count not enough */
        if (parentComponent) component.count > parentComponent.count ? component.count = parentComponent.count : false;

      });
    }

    getParentsCount(id: number) {
      const component = this.availableComponents.find(component => component.id === id);
      if (component) return component.count;
    }

    beforeCreate() {
      componentsStore.getAvailableComponents();
    }

    get stepper() {
      return modelsStore.stepper;
    }

    get components() {
      return this.order.components;
    }

    get order() {
      return modelsStore.orderModel;
    }

    set order(order: Order) {
      modelsStore.setOrder(order);
    }

    get availableComponents() {
      return componentsStore.availableComponents;
    }

    stepBack() {
      modelsStore.setStepper(this.step - 1);
    }

    stepNext() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.validation = "success";
          modelsStore.setStepper(this.step + 1);
        }
        if (!valid) this.validation = "failed";
      });
    }

    addComponent() {
      let component = new ComponentModel;
      component.count = 1;
      this.order.components.push(component)
    }

    removeComponentByIdx(idx: number) {
      this.order.components = this.order.components.filter((component, index) => index !== idx)
    }
  }
</script>

<style scoped>

</style>
