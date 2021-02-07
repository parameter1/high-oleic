<template>
  <slide-over
    :value="value"
    :description="description"
    with-overlay
    @input="$emit('input', $event)"
  >
    <template #title>
      <div class="flex items-center">
        Share Scenario Report
      </div>
    </template>

    <template #body>
      <div class="py-8 px-4">
        <share-link :link="publicLink" />
      </div>
    </template>
  </slide-over>
</template>

<script>
import ShareLink from './share-link.vue';
import SlideOver from '../overlays/slide-over.vue';

export default {
  components: { ShareLink, SlideOver },

  props: {
    /**
     * Whether the share slideover is open.
     */
    value: {
      type: Boolean,
      default: false,
    },

    publicId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    description: 'Share this report using a public link or via email',
  }),

  computed: {
    publicLink() {
      return `${window.location.protocol}//${window.location.host}/crop-comparison/shared/${this.publicId}`;
    },
  },
};
</script>
