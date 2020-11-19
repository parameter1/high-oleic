<template>
  <table class="min-w-full table-fixed">
    <tr>
      <td :class="isEditing ? 'w-full' : 'w-1/3'">
        <edit-expense-line-item
          :comparison-id="comparisonId"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="expense.costs.perAcre"
          @editing="isEditing = $event"
        />
      </td>
      <td v-show="!isEditing" class="w-1/3 text-center">
        <format-number format="usd" :value="expense.costs.total" />
      </td>
      <td v-show="!isEditing" class="w-1/3 text-right">
        <format-number format="usd" :value="expense.costs.perBushel" />
      </td>
    </tr>
  </table>
</template>

<script>
import EditExpenseLineItem from '../../inline-editor/expense-line-item.vue';
import FormatNumber from '../../../format-number.vue';

export default {
  components: {
    EditExpenseLineItem,
    FormatNumber,
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
  },

  data: () => ({
    isEditing: false,
  }),
};
</script>
