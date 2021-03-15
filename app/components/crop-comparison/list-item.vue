<template>
  <li class="">
    <div class="col-span-1 bg-white rounded-lg shadow">
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
              <format-number format="integer" :value="node.acres" />
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

          <div class="mt-5">
            <div class="mb-3">
              <div class="text-sm font-medium text-logo-brown">
                High Oleic Advantage/Difference
              </div>
              <format-number
                class="font-semibold"
                format="usd"
                :value="node.advantage"
                with-conditional
              />
            </div>
            <div class="mb-3">
              <div class="text-sm font-medium text-logo-brown">
                HO:CROP Price Ratio
              </div>
              <div class="font-semibold">
                {{ node.ratio }}
              </div>
            </div>
            <div>
              <div class="text-sm font-medium text-logo-brown">
                High Oleic ROI
              </div>
              <format-number
                class="font-semibold"
                format="percent"
                :value="node.oleic.profit.margin"
                with-conditional
              />
            </div>
          </div>

          <div class="mt-5 text-sm leading-5 text-secondary-4">
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
            position="center"
            label="Clone"
            :loading="isCloning"
            @click="clone"
          >
            <template #icon>
              <clone-icon class="w-5 h-5 text-gray-400" />
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
    </div>

    <alert v-if="cloneError" type="danger" class="mt-3">
      {{ cloneError.message }}
    </alert>
  </li>
</template>

<script>
import Alert from '../common/alert.vue';
import ButtonLink from './list-item/button-link.vue';
import CloneIcon from '../icons/clone-md.vue';
import FormatNumber from '../format-number.vue';
import PencilIcon from '../icons/pencil-alt-md.vue';
import ReportIcon from '../icons/document-report-md.vue';
import ToggleDateFormat from '../toggle-date-format.vue';

import GraphQLError from '../../utils/graphql-error';
import { CLONE_COMPARISON_REPORT } from '../../graphql/mutations';

export default {
  components: {
    Alert,
    ButtonLink,
    CloneIcon,
    FormatNumber,
    PencilIcon,
    ReportIcon,
    ToggleDateFormat,
  },

  props: {
    node: {
      type: Object,
      default: () => ({
        oleic: { profit: {} },
      }),
    },
    listQuery: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    isCloning: false,
    cloneError: null,
  }),

  methods: {
    async clone() {
      try {
        this.isCloning = true;
        this.cloneError = null;
        const variables = { input: { id: this.node.id } };
        const { data } = await this.$apollo.mutate({
          mutation: CLONE_COMPARISON_REPORT,
          variables,
        });
        await this.listQuery.refetch();
        this.$router.push(`/crop-comparison/${data.cloneCropComparison.id}`);
      } catch (e) {
        this.cloneError = new GraphQLError(e);
      } finally {
        this.isCloning = false;
      }
    },
  },
};
</script>
