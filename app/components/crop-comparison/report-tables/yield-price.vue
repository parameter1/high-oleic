<template>
  <table class="min-w-full divide-y divide-secondary-5-300">
    <row>
      <template #left>
        Yield
      </template>
      <template #right>
        <format-number #default="{ formatted }" format="integer" :value="yieldPerAcre">
          {{ formatted }} bushels per acre
        </format-number>
      </template>
    </row>
    <row>
      <template #left>
        Market price
      </template>
      <template #right>
        <format-number #default="{ formatted }" format="usd" :value="pricePerBushel">
          {{ formatted }} per bushel
        </format-number>
      </template>
    </row>
    <row>
      <template #left>
        Premium
      </template>
      <template #right>
        <format-number #default="{ formatted }" format="usd" :value="premiumPerBushel">
          {{ formatted }} per bushel
        </format-number>
      </template>
    </row>
    <row>
      <template #left>
        Total Bushels
      </template>
      <template #right>
        <format-number format="integer" :value="totalBushels" />
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
    yieldPerAcre: {
      type: Number,
      default: 0,
    },
    pricePerBushel: {
      type: Number,
      default: 0,
    },
    premiumPerBushel: {
      type: Number,
      default: 0,
    },
    totalBushels: {
      type: Number,
      default: 0,
    },
  },
};
</script>
