<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <!-- Replace with your content -->
      <div class="py-4">
        <div class="h-full overflow-y-scroll px-2">
          <page-header>
            Find Grain Elevators Near You
          </page-header>
          <div class="grid grid-cols-1 w-full">
            <div class="md:w-1/5 py-1">
              <field-label
                for="Zip"
                class="ml-1 mb-1"
              >
                ZIP Code
              </field-label>
              <input-field
                ref="editor"
                v-model="zip"
                placeholder="Enter Zip"
              />
            </div>
            <div class="md:w-1/5 py-1">
              <field-label
                for="Distance"
                class="ml-1 mb-1"
              >
                Distance
              </field-label>
              <select-field
                id="radius"
                v-model="selectedRadius"
                name="radius"
                option-value-path="radii"
                :options="radiiList"
                :with-placeholder="usePlaceholder"
              />
            </div>
            <div class="md:w-1/5 py-1">
              <btn
                type="button"
                :block="isBlock"
                color="logo-blue"
                @click="checkDistance"
              >
                Look for Silos
              </btn>
            </div>

            <div
              v-if="finished && validLocations.length > 0"
              class="bg-white shadow rounded-t-lg pt-2"
            >
              <div
                v-for="address in validLocations"
                :key="address.streetAddress"
                class="py-2 px-2 break-normal"
              >
                <div class="border-secondary-5-300 border-b-2 text-lg leading-6 font-bold pb-2">
                  {{ address.name }}
                </div>
                <div class="py-2 text-sm">
                  <div>Type: {{ address.type }}</div>
                  <div>
                    {{ parseInt(address.final) }} miles away
                  </div>
                  <div v-if="address.streetAddress && address.streetAddress !==''">
                    {{ address.streetAddress }},
                  </div>
                  <div>
                    {{ address.city }} {{ address.state }}, {{ address.zip }}
                  </div>
                  <div v-if="address.contact && address.contact !== ''">
                    Contact: {{ address.contact }}
                  </div>
                  <div class="border-secondary-5-300 border-b-2 pb-2">
                    Phone: {{ address.phone1 }}
                    <div v-if="address.phone2">
                      Phone 2: {{ address.phone2 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else-if="finished && validLocations.length === 0" class="px-2">
              The requested zip and radius returned no results.
            </div>
          </div>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import fetch from 'node-fetch';  // eslint-disable-line
import FieldLabel from '../components/common/forms/label.vue';
import addressList from '../../server/src/elevator-locator/address-list';
import SelectField from '../components/common/forms/select.vue';
import InputField from '../components/common/forms/input.vue';
import Btn from '../components/common/button.vue';
import PageHeader from '../components/crop-comparison/page-header.vue';

export default {
  components: {
    FieldLabel,
    SelectField,
    InputField,
    Btn,
    PageHeader,
  },
  data: () => ({
    addressList,
    radiiList: [
      { label: '25 Miles', radii: '25.0' },
      { label: '50 Miles', radii: '50.0' },
      { label: '75 Miles', radii: '75.0' },
      { label: '100 Miles', radii: '100.0' },
      { label: '125 Miles', radii: '125.0' },
      { label: '150 Miles', radii: '150.0' },
      { label: '175 Miles', radii: '175.0' },
      { label: '200 Miles', radii: '200.0' },
      { label: '225 Miles', radii: '225.0' },
      { label: '250 Miles', radii: '250.0' },
      { label: '275 Miles', radii: '275.0' },
      { label: '300 Miles', radii: '300.0' },
    ],
    selectedRadius: null,
    zip: null,
    validLocations: [],
    distances: [],
    finished: false,
    isBlock: true,
    usePlaceholder: false,
  }),
  mounted() {
    this.selectedRadius = this.radiiList[0].radii;
  },
  methods: {
    async checkDistance() {
      if (this.selectedRadius && this.zip) {
        this.finished = false;
        this.validLocations = [];
        this.distances = [];
        await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyAwjusFWUbl1Mlo2oN-AN-KD-j4FBww2HY&components=postal_code:${this.zip}`)
          .then((response) => response.json())
          .then((data) => {
            const pair = data.results[0].geometry.location;
            addressList.forEach((address) => {
              this.distanceCalc(pair.lat, pair.lng, address.lat, address.long, address);
            });
            this.finished = true;
            this.validLocations.sort(this.compare);
          });
      }
    },
    distanceCalc(lat1, lng1, lat2, lng2, address) {
      const latInside = lat1 * (Math.PI / 180);
      const lngInside = lng1 * (Math.PI / 180);
      const latInternal = lat2 * (Math.PI / 180);
      const lngInternal = lng2 * (Math.PI / 180);
      const diffLng = lngInternal - lngInside;
      const diffLat = latInternal - latInside;
      const initCalc = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(latInside) * Math.cos(latInternal) * Math.pow(Math.sin(diffLng / 2), 2);   // eslint-disable-line
      const finalCalc = 2 * Math.asin(Math.sqrt(initCalc));
      const radius = 3956;
      const final = (finalCalc * radius);
      if (final <= this.selectedRadius) {
        this.validLocations.push({ ...address, final });
      }
    },
    compare(a, b) {
      const aDist = a.final;
      const bDist = b.final;
      let comparison = 0;
      if (aDist > bDist) {
        comparison = 1;
      } else if (aDist < bDist) {
        comparison = -1;
      }
      return comparison;
    },
  },
  head: {
    title: 'Find Your Elevator',
  },
};
</script>
