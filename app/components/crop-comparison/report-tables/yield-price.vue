<template>
  <table class="min-w-full divide-y divide-secondary-5-300">
    <row>
      <template #left>
        Yield
      </template>
      <template #right>
        <edit-yield-per-acre
          :comparison-id="comparisonId"
          :apply-to="applyTo"
          :value="yieldPerAcre"
        />
      </template>
    </row>
    <row>
      <template #left>
        Market price
      </template>
      <template #right>
        <edit-price-per-bushel
          :comparison-id="comparisonId"
          :apply-to="applyTo"
          :crop-name="cropName"
          :value="pricePerBushel"
        />
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
import EditPricePerBushel from '../inline-editor/price-per-bushel.vue';
import EditYieldPerAcre from '../inline-editor/yield-per-acre.vue';
import FormatNumber from '../../format-number.vue';
import Row from './common/row.vue';

export default {
  components: {
    EditPricePerBushel,
    EditYieldPerAcre,
    FormatNumber,
    Row,
  },

  props: {
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
