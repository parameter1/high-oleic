<template>
  <table class="min-w-full divide-y divide-secondary-5-300">
    <row>
      <template #left>
        Total expense
      </template>
      <template #right>
        <format-number format="usd" :value="expenses.total" />
        <format-number
          #default="{ formatted }"
          class="text-primary-1"
          format="usd"
          :value="expenses.perAcre"
        >
          ({{ formatted }} per acre)
        </format-number>
      </template>
    </row>
    <row>
      <template #left>
        Production cost per bushel
      </template>
      <template #right>
        <format-number format="usd" :value="expenses.perBushel" />
      </template>
    </row>
    <row>
      <template #left>
        Total gross revenue
      </template>
      <template #right>
        <format-number format="usd" :value="income.total" />
        <format-number
          #default="{ formatted }"
          class="text-primary-1"
          format="usd"
          :value="income.perAcre"
        >
          ({{ formatted }} per acre)
        </format-number>
      </template>
    </row>
    <row>
      <template #left>
        Total profit
      </template>
      <template #right>
        <format-number format="usd" :value="profit.total" />
        <format-number
          #default="{ formatted }"
          class="text-primary-1"
          format="usd"
          :value="profit.perAcre"
        >
          ({{ formatted }} per acre)
        </format-number>
      </template>
    </row>
    <row
      :left-attrs="{ fontWeight: 'semibold', fontSize: 'base', color: 'primary-1' }"
      :right-attrs="{ fontWeight: 'semibold', fontSize: 'base' }"
    >
      <template #left>
        ROI
      </template>
      <template #right>
        <format-number format="percent" :value="profit.margin" />
      </template>
    </row>
  </table>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import Row from './common/row.vue';

export default {
  components: { FormatNumber, Row },

  props: {
    expenses: {
      type: Object,
      default: () => ({}),
    },
    income: {
      type: Object,
      default: () => ({}),
    },
    profit: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
