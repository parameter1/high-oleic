<template>
  <li class="col-span-1 bg-white rounded-lg shadow">
    <div class="w-full flex items-center justify-between p-6 space-x-6">
      <div class="flex-1">
        <div class="flex items-center space-x-3">
          <h2 class="text-logo-blue text-lg leading-6 font-semibold">
            {{ node.farmName }}
          </h2>
        </div>
        <p class="mt-3 text-primary-1 text-base leading-6">
          Comparing
          <span class="text-logo-green font-semibold">
            {{ formatInteger(node.acres) }}
          </span>
          acres of
          <span class="text-logo-green font-semibold">
            {{ node.comparedTo.crop.label }}
          </span>
          to
          <span class="text-logo-green font-semibold">
            {{ node.oleic.crop.label }}
          </span>
        </p>

        <div class="mt-6 text-sm leading-5 text-secondary-4">
          Scenario last modified <toggle-date-format :timestamp="node.updatedAt" />
        </div>
      </div>
    </div>
    <div class="border-t border-gray-200">
      <div class="-mt-px flex">
        <button-link
          :to="`/crop-comparison/${node.id}`"
          position="left"
          label="Modify"
        >
          <template #icon>
            <pencil-icon class="w-5 h-5 text-gray-400" />
          </template>
        </button-link>

        <button-link
          :to="`/crop-comparison/report/${node.id}`"
          position="right"
          label="See Report"
        >
          <template #icon>
            <report-icon class="w-5 h-5 text-gray-400" />
          </template>
        </button-link>
      </div>
    </div>
  </li>
</template>

<script>
import ButtonLink from './list-item/button-link.vue';
import PencilIcon from '../icons/pencil-alt-md.vue';
import ReportIcon from '../icons/document-report-md.vue';
import ToggleDateFormat from '../toggle-date-format.vue';
import formatNumber from '../../utils/format-number';

export default {
  components: {
    ButtonLink,
    PencilIcon,
    ReportIcon,
    ToggleDateFormat,
  },

  props: {
    node: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    formatInteger(value) {
      return formatNumber.integer(value);
    },
  },
};
</script>
