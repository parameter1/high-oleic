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
        <input-group
          id="share-report.public-link"
          :value="publicLink"
          :hint="linkDescription"
          label="Public link"
          type="text"
          readonly
        />
      </div>
    </template>
  </slide-over>
</template>

<script>
import InputGroup from '../common/forms/input-group.vue';
import SlideOver from '../overlays/slide-over.vue';

export default {
  components: { InputGroup, SlideOver },

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
    linkDescription: 'Copy this link and give it to anyone you\'d like to access this report. Anyone using this link can only read the report and cannot edit any values.',
  }),

  computed: {
    publicLink() {
      return `${window.location.protocol}//${window.location.host}/crop-comparison/shared/${this.publicId}`;
    },
  },
};
</script>
