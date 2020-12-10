<template>
  <table class="min-w-full table-fixed divide-y divide-secondary-5-300">
    <row :left-attrs="rowLeftAttrs">
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
    <row :left-attrs="rowLeftAttrs">
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
    <row :left-attrs="rowLeftAttrs">
      <template #left>
        Total profit
      </template>
      <template #right>
        <format-number
          format="usd"
          :value="profit.total"
          with-conditional
        />
        <format-number
          #default="{ formatted }"
          format="usd"
          :value="profit.perAcre"
          with-conditional
          darken
        >
          ({{ formatted }} per acre)
        </format-number>
      </template>
    </row>
    <row :left-attrs="rowLeftAttrs" :right-attrs="{ fontWeight: 'semibold' }">
      <template #left>
        Cost of Production/Bushel
      </template>
      <template #right>
        <format-number format="usd" :value="expenses.perBushel" />
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

  data: () => ({
    rowLeftAttrs: {
      color: 'logo-brown',
      fontWeight: 'medium',
      class: 'w-1/2',
    },
  }),
};
</script>
