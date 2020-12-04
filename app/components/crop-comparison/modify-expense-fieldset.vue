<template>
  <fieldset :disabled="disabled">
    <h3
      v-if="cropName && displayCropName"
      class="border-secondary-5-300 pb-2 mb-4 border-b-2 text-lg leading-6 font-semibold"
    >
      {{ cropName }}
    </h3>
    <expense-line-item
      v-for="(expense, index) in lineItems"
      :id="`modify-crop-expense.${applyTo}.${expense.lineItem.id}`"
      :key="expense.lineItem.id"
      :line-item-id="expense.lineItem.id"
      :unit="expense.lineItem.unit"
      :crop-name="cropName"
      :value="expense.lineItem.unit === 'PER_ACRE'
        ? expense.costs.perAcre : expense.costs.perBushel
      "
      :class="index + 1 !== lineItems.length ? 'mb-5' : null"
      @input="emitInput(expense, $event)"
    />
  </fieldset>
</template>

<script>
import ExpenseLineItem from './fields/expense-line-item.vue';

export default {
  components: { ExpenseLineItem },

  props: {
    // example: crop, fieldOps, chemicals, etc
    categoryId: {
      type: String,
      required: true,
    },
    // line item keys of the category (not the entire line item id)
    // example: [rtm, land] _not_ [crop.rtm, crop.land]
    lineItemKeys: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    cropName: {
      type: String,
      default: null,
    },
    displayCropName: {
      type: Boolean,
      default: true,
    },
    applyTo: {
      type: String,
      required: true,
      validator: (applyTo) => ['OLEIC', 'COMPARED_CROP'].includes(applyTo),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    lineItemIds() {
      return this.lineItemKeys.map((key) => `${this.categoryId}.${key}`);
    },
    lineItems() {
      return this.category.lineItems
        .filter(({ lineItem }) => this.lineItemIds.includes(lineItem.id))
        .map(({ costs, lineItem }) => ({ lineItem, costs }));
    },
    category() {
      const c = this.categories.find(({ category }) => category.id === this.categoryId);
      return c || { lineItems: [] };
    },
  },

  methods: {
    emitInput(expense, value) {
      this.$emit('input', {
        category: this.category.category,
        lineItem: expense.lineItem,
        costs: expense.costs,
        value,
        applyTo: this.applyTo,
      });
    },
  },
};
</script>
