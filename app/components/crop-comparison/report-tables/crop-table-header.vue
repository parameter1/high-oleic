<template>
  <table-header type="primary">
    <div class="mb-2 print:text-sm">
      {{ crop.label }}
    </div>
    <div class="flex justify-between text-base print:text-xs font-semibold">
      <span>
        ROI
        <format-number
          format="percent"
          :value="profit.margin"
          with-conditional
        />
      </span>
      <span>
        <format-number
          format="usd"
          :value="profit.perAcre"
          with-conditional
        />
        Profit/Acre
      </span>
    </div>
  </table-header>
</template>

<script>
import FormatNumber from '../../format-number.vue';
import TableHeader from './common/header.vue';

export default {
  components: { FormatNumber, TableHeader },

  props: {
    crop: {
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
