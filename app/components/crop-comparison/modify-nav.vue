<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select-field
        id="tabs"
        name="tabs"
        option-value-path="to"
        :options="navItems"
        :with-placeholder="false"
      />
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <!-- aria-current="page" -->
        <nav-item-link
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :label="item"
        >
          {{ item.label }}
        </nav-item-link>
      </nav>
    </div>
  </div>
</template>

<script>
import NavItemLink from './modify-nav/item.vue';
import SelectField from '../common/forms/select.vue';

export default {
  components: { NavItemLink, SelectField },

  props: {
    comparisonId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    items: [
      { label: 'Farm Info', to: '' },
      { label: 'HO Yield & Price', to: '/yield-price' },
      { label: 'Land, Taxes, RTM', to: '/land-taxes-rtm' },
      { label: 'Crop Expenses', to: '/crop-expenses' },
      { label: 'Chemicals', to: '/chemicals' },
      { label: 'Field Ops', to: '/field-ops' },
      { label: 'Grain Handling', to: '/grain-handling' },
    ],
  }),

  computed: {
    navItems() {
      return this.items.map(({ label, to }) => ({
        label,
        to: `/crop-comparison/${this.comparisonId}${to}`,
      }));
    },
  },
};
</script>
