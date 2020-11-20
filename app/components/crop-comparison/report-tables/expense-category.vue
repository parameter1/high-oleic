<template>
  <table class="min-w-full table-fixed divide-y divide-secondary-5-300">
    <row
      :left-attrs="{ class: 'w-1/3', ...headerClasses }"
      :right-attrs="{ class: 'w-2/3', ...headerClasses }"
    >
      <template #right>
        <table class="min-w-full table-fixed">
          <tr>
            <td class="w-1/3">
              Per Acre
            </td>
            <td class="w-1/3 text-center">
              Total
            </td>
            <td class="w-1/3 text-right">
              Per Bushel
            </td>
          </tr>
        </table>
      </template>
    </row>
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
import LineItemTable from './expense-category/line-item.vue';
import Row from './common/row.vue';

export default {
  components: {
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
