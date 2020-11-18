<template>
  <li
    :data-id="node.id"
    class="col-span-1 bg-white rounded-lg shadow"
  >
    <div class="w-full flex items-center justify-between p-6 space-x-6">
      {{ node.farmName }}
    </div>
  </li>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
