<template>
  <div>
    <div class="font-semibold mb-1">
      {{ node.name }}
    </div>

    <div class="text-sm">
      <div class="text-logo-blue font-semibold">
        {{ distanceFromPostalCode }} miles away
      </div>

      <a
        class="inline-block mt-1.5 hover:underline"
        target="_blank"
        rel="noopener"
        :href="node.googleMapsUrl"
      >
        <span class="block">{{ node.street }}</span>
        <span class="block">{{ node.city }} {{ node.regionCode }}, {{ node.postalCode }}</span>
      </a>

      <div class="mt-1.5">
        <div v-if="node.contactName">
          Contact: {{ node.contactName }}
        </div>
        <div v-if="node.phoneNumber">
          Phone:
          <a :href="`tel:${node.phoneNumber}`" class="hover:underline">{{ node.phoneNumber }}</a>
        </div>
        <div v-if="node.phoneNumber2">
          Phone 2:
          <a :href="`tel:${node.phoneNumber2}`" class="hover:underline">{{ node.phoneNumber2 }}</a>
        </div>
        <div v-if="node.deliveryWindow">
          Delivery Window: {{ node.deliveryWindow }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true,
    },
    distanceFromPostalCode: {
      type: Number,
      required: true,
    },
  },
};
</script>
