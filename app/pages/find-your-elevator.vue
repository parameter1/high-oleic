<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <page-header>
          Find Grain Elevators Near You
        </page-header>

        <form class="max-w-xs mb-8" @submit.prevent="lookupElevators">
          <form-group
            id="elevator-postal-code"
            v-model="postalCode"
            class="mb-4"
            label="ZIP/Postal Code"
            placeholder="Enter your zip/postal code"
            required
            :disabled="isLoading"
          />
          <select-group
            id="elevator-max-distance"
            v-model="selectedDistance"
            class="mb-8"
            label="Distance"
            required
            :options="distanceOptions"
            :disabled="isLoading"
            :with-placeholder="false"
          />
          <btn
            type="submit"
            color="logo-blue"
            block
            :loading="isLoading"
          >
            Look for Delivery Point
          </btn>
        </form>

        <div class="w-full">
          <div v-if="didSearch" class="bg-white shadow rounded-lg p-4">
            <div class="text-lg text-logo-green font-semibold mb-4">
              Elevators within
              {{ currentSearchParams.maxDistance }}
              miles of
              {{ currentSearchParams.postalCode }}
            </div>
            <div v-if="!elevators.length">
              No elevators were found for the provided criteria.
            </div>

            <div class="space-y-6">
              <list-item
                v-for="{ elevator, distance } in elevators"
                :key="elevator.id"
                :node="elevator"
                :distance-from-postal-code="distance"
              />
            </div>
          </div>

          <alert v-if="error" type="danger">
            {{ error.message }}
          </alert>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/common/alert.vue';
import Btn from '../components/common/button.vue';
import FormGroup from '../components/common/forms/input-group.vue';
import ListItem from '../components/find-your-elevator/list-item.vue';
import PageHeader from '../components/crop-comparison/page-header.vue';
import SelectGroup from '../components/common/forms/select-group.vue';

import { LOOKUP_ELEVATORS } from '../graphql/queries';

export default {
  components: {
    Alert,
    Btn,
    FormGroup,
    ListItem,
    PageHeader,
    SelectGroup,
  },

  data: () => ({
    currentSearchParams: {
      maxDistance: null,
      postalCode: null,
    },
    distances: [
      25,
      50,
      75,
      100,
      125,
      150,
      175,
      200,
      225,
      250,
      275,
      300,
    ],
    elevators: [],
    error: null,
    isLoading: false,
    postalCode: null,
    selectedDistance: '25',
  }),

  computed: {
    didSearch() {
      const { currentSearchParams: params } = this;
      return Boolean(params.maxDistance && params.postalCode);
    },

    distanceOptions() {
      return this.distances.map((value) => ({
        value: `${value}`,
        label: `${value} Miles`,
      }));
    },
  },

  methods: {
    async lookupElevators() {
      try {
        this.error = null;
        this.isLoading = true;
        const input = {
          postalCode: this.postalCode,
          maxDistance: parseFloat(this.selectedDistance),
        };
        const variables = { input };
        const { data } = await this.$apollo.query({ query: LOOKUP_ELEVATORS, variables });
        this.elevators = data.grainElevatorsNearPostalCode;
        this.currentSearchParams = input;
      } catch (e) {
        this.error = e;
      } finally {
        this.isLoading = false;
      }
    },
  },

  head: {
    title: 'Find Your Elevator',
  },
};
</script>
