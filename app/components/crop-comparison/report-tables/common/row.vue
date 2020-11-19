<template>
  <tr>
    <cell v-bind="leftAttrs">
      <slot name="left" />
    </cell>
    <cell v-bind="rightAttrs">
      <slot name="right" />
    </cell>
  </tr>
</template>

<script>
import Cell from './cell.vue';

export default {
  components: { Cell },

  props: {
    leftAttrs: {
      type: Object,
      default: () => ({
        color: 'logo-brown',
        fontWeight: 'medium',
        class: 'w-1/3',
      }),
    },
    rightAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
