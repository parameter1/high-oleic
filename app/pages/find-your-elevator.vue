<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl sm:px-6 md:px-8">
      <div class="py-4">
        <div class="h-full overflow-y-scroll px-2">
          <page-header>
            Find Grain Elevators Near You
          </page-header>
          <div class="grid grid-cols-1 w-full">
            <form @submit.prevent="lookupElevators">
              <div class="md:w-1/5 py-1">
                <form-group
                  id="elevator-postal-code"
                  v-model="postalCode"
                  label="ZIP/Postal Code"
                  placeholder="Enter your zip/postal code"
                  required
                  :disabled="isLoading"
                />
              </div>
              <div class="md:w-1/5 py-1">
                <select-group
                  id="elevator-max-distance"
                  v-model="selectedDistance"
                  label="Distance"
                  required
                  :options="distanceOptions"
                  :disabled="isLoading"
                  :with-placeholder="false"
                />
              </div>
              <div class="md:w-1/5 py-1 pb-2">
                <btn
                  type="submit"
                  color="logo-blue"
                  block
                  :loading="isLoading"
                >
                  Look for Delivery Point
                </btn>
              </div>
            </form>
            <div v-if="hasSearched" class="bg-white shadow rounded-t-lg pt-2">
              <div
                v-for="{ elevator, distance } in elevators"
                :key="elevator.id"
                class="py-2 px-2 break-normal"
              >
                <div class="border-secondary-5-300 border-b-2 text-lg leading-6 font-bold pb-2">
                  {{ elevator.companyName }}
                </div>

                <div class="py-2 text-sm">
                  <div>Type: {{ elevator.affiliate }}</div>
                  <div>
                    {{ distance }} miles away
                  </div>
                  <div>
                    {{ elevator.street }}
                  </div>
                  <div>
                    {{ elevator.city }} {{ elevator.regionCode }}, {{ elevator.postalCode }}
                  </div>
                  <div v-if="elevator.contact">
                    Contact: {{ elevator.contact }}
                  </div>
                  <div class="border-secondary-5-300 border-b-2 pb-2">
                    Phone: {{ elevator.phoneNumber }}
                    <div v-if="elevator.phoneNumber2">
                      Phone 2: {{ elevator.phoneNumber2 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <alert v-if="error" type="danger" class="mt-3">
              {{ error.message }}
            </alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/common/alert.vue';
import Btn from '../components/common/button.vue';
import FormGroup from '../components/common/forms/input-group.vue';
import PageHeader from '../components/crop-comparison/page-header.vue';
import SelectGroup from '../components/common/forms/select-group.vue';

import { LOOKUP_ELEVATORS } from '../graphql/queries';

export default {
  components: {
    Alert,
    Btn,
    FormGroup,
    PageHeader,
    SelectGroup,
  },

  data: () => ({
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
    hasSearched: false,
    isLoading: false,
    postalCode: null,
    selectedDistance: '25',
  }),

  computed: {
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
          maxDistance: parseInt(this.selectedDistance, 10),
        };
        const variables = { input };
        const { data } = await this.$apollo.query({ query: LOOKUP_ELEVATORS, variables });
        this.elevators = data.grainElevatorsNearPostalCode;
        this.hasSearched = true;
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
