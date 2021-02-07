<template>
  <table class="min-w-full table-fixed divide-y divide-secondary-5-300">
    <expense-type-header />
    <row
      v-for="lineItemExpense in expense.lineItems"
      :key="lineItemExpense.lineItem.id"
      :left-attrs="{ class: 'w-1/3', color: 'logo-brown', fontWeight: 'medium' }"
      :right-attrs="{ class: 'w-2/3' }"
    >
      <template #left>
        {{ lineItemExpense.lineItem.label }}
      </template>
      <template #right>
        <line-item-table
          :can-edit="canEdit"
          :expense="lineItemExpense"
          :comparison-id="comparisonId"
          :apply-to="applyTo"
          :crop-name="cropName"
          :editors-disabled="editorsDisabled"
          @saving="$emit('saving', $event)"
        />
      </template>
    </row>
  </table>
</template>

<script>
import ExpenseTypeHeader from './expense-type-header.vue';
import LineItemTable from './expense-category/line-item.vue';
import Row from './common/row.vue';

export default {
  components: {
    ExpenseTypeHeader,
    LineItemTable,
    Row,
  },

  props: {
    expense: {
      type: Object,
      required: true,
    },
    comparisonId: {
      type: String,
      required: true,
    },
    applyTo: {
      type: String,
      required: true,
      validator: (applyTo) => ['OLEIC', 'COMPARED_CROP'].includes(applyTo),
    },
    cropName: {
      type: String,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
    editorsDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    headerClasses: {
      color: 'logo-blue',
      fontWeight: 'semibold',
      fontSize: 'xs',
      paddingY: 'xs',
    },
  }),
};
</script>
