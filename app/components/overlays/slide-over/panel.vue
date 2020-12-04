<template>
  <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
    <div class="flex-1 h-0 overflow-y-auto">
      <panel-header
        :title="title"
        :description="description"
        :close-button="closeButton"
        @close="$emit('close', $event)"
      >
        <template #title>
          <slot name="title" />
        </template>
        <template #description>
          <slot name="description" />
        </template>
      </panel-header>
      <panel-body>
        <slot name="body" />
      </panel-body>
    </div>
    <panel-footer v-if="hasFooterSlot">
      <slot name="footer" />
    </panel-footer>
  </div>
</template>

<script>
import PanelBody from './panel/body.vue';
import PanelFooter from './panel/footer.vue';
import PanelHeader from './panel/header.vue';

export default {
  components: { PanelBody, PanelFooter, PanelHeader },

  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    closeButton: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    hasFooterSlot() {
      return Boolean(this.$slots.footer);
    },
  },
};
</script>
