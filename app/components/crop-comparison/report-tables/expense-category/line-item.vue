<template>
  <table class="min-w-full table-fixed">
    <tr>
      <td v-show="showLeft" :class="leftClasses">
        <edit-expense-line-item
          v-if="unit === 'PER_ACRE'"
          :comparison-id="comparisonId"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="expense.costs.perAcre"
          @editing="isEditing = $event"
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
          v-if="unit === 'PER_BUSHEL'"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="expense.costs.perBushel"
          @editing="isEditing = $event"
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

  computed: {
    leftClasses() {
      if (this.isEditing && this.unit === 'PER_ACRE') return 'w-full';
      return 'w-1/3';
    },
    rightClasses() {
      const classes = ['text-right'];
      if (this.isEditing && this.unit === 'PER_BUSHEL') {
        classes.push('w-full');
      } else {
        classes.push('w-1/3');
      }
      return classes;
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
