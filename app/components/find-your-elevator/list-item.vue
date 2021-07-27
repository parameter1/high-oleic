<template>
  <div>
    <div class="border-secondary-5-300 border-b-2 text-lg leading-6 font-bold pb-2">
      {{ node.name }}
    </div>

    <div class="text-sm">
      <div>
        {{ distanceFromPostalCode }} miles away
      </div>
      <div>
        {{ node.street }}
      </div>
      <div>
        {{ node.city }} {{ node.regionCode }}, {{ node.postalCode }}
      </div>
      <div v-if="node.contact">
        Contact: {{ node.contact }}
      </div>
      <div class="border-secondary-5-300 border-b-2 pb-2">
        Phone: {{ node.phoneNumber }}
        <div v-if="node.phoneNumber2">
          Phone 2: {{ node.phoneNumber2 }}
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
