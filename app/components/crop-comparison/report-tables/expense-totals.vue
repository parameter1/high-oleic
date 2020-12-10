<template>
  <table class="min-w-full table-fixed divide-y divide-secondary-5-300">
    <expense-type-header />
    <row
      :left-attrs="{ class: 'w-1/3', ...commonClasses }"
      :right-attrs="{ class: 'w-2/3', ...commonClasses }"
    >
      <template #right>
        <table class="min-w-full table-fixed">
          <tr>
            <td class="w-1/3">
              <format-number format="usd" :value="expenses.perAcre" />
            </td>
            <td class="w-1/3">
              <format-number format="usd" :value="expenses.total" />
            </td>
            <td class="w-1/3 text-right">
              <format-number format="usd" :value="expenses.perBushel" />
            </td>
          </tr>
        </table>
      </template>
    </row>
  </table>
</template>

<script>
import ExpenseTypeHeader from './expense-type-header.vue';
import FormatNumber from '../../format-number.vue';
import Row from './common/row.vue';

export default {
  components: { ExpenseTypeHeader, FormatNumber, Row },

  props: {
    expenses: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    commonClasses: { color: 'logo-blue', fontWeight: 'semibold', fontSize: 'base' },
  }),
};
</script>
