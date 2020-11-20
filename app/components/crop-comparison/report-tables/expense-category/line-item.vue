<template>
  <table class="min-w-full table-fixed">
    <tr>
      <td v-show="showLeft" :class="leftClasses">
        <edit-expense-line-item
          v-if="canEdit && unit === 'PER_ACRE'"
          :comparison-id="comparisonId"
          :line-item="lineItem"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="expense.costs.perAcre"
          :disabled="editorsDisabled"
          @editing="isEditing = $event"
          @saving="$emit('saving', $event)"
        />
        <format-number
          v-else
          format="usd"
          :value="expense.costs.perAcre"
        />
      </td>
      <td v-show="!isEditing" class="w-1/3 text-center">
        <format-number format="usd" :value="expense.costs.total" />
      </td>
      <td v-show="showRight" :class="rightClasses">
        <edit-expense-line-item
          v-if="canEdit && unit === 'PER_BUSHEL'"
          :comparison-id="comparisonId"
          :line-item="lineItem"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="expense.costs.perBushel"
          :disabled="editorsDisabled"
          @editing="isEditing = $event"
          @saving="$emit('saving', $event)"
        />
        <format-number
          v-else
          format="usd"
          :value="expense.costs.perBushel"
        />
      </td>
    </tr>
  </table>
</template>

<script>
import EditExpenseLineItem from '../../inline-editor/expense-line-item.vue';
import FormatNumber from '../../../format-number.vue';
import sharedLineItems from '../../shared-line-items';

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
    editorsDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isEditing: false,
  }),

  computed: {
    lineItem() {
      return this.expense.lineItem;
    },
    canEdit() {
      if (this.applyTo === 'COMPARED_CROP') return true;
      return !sharedLineItems.includes(this.lineItem.id);
    },
    leftClasses() {
      if (this.isEditing && this.unit === 'PER_ACRE') return 'w-full';
      return 'w-1/3';
    },
    rightClasses() {
      if (this.isEditing && this.unit === 'PER_BUSHEL') return 'w-full';
      return 'text-right w-1/3';
    },
    showLeft() {
      if (!this.isEditing) return true;
      return this.isEditing && this.unit === 'PER_ACRE';
    },
    showRight() {
      if (!this.isEditing) return true;
      return this.isEditing && this.unit === 'PER_BUSHEL';
    },
    unit() {
      return this.expense.lineItem.unit;
    },
  },
};
</script>
