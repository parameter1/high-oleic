<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <!-- Replace with your content -->
      <div class="py-4">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-full overflow-y-scroll">
          <page-header class="px-2">
            Find Grain Elevators Near You
          </page-header>
          <div class="flex py-2 px-2">
            <div class="w-1/3">
              <input-field
                ref="editor"
                v-model="zip"
                placeholder="Enter Zip"
                class="rounded-r-none shadow-none focus-within:z-10"
              />
            </div>
            <div class="w-1/3">
              <select-field
                id="radius"
                v-model="selectedRadius"
                name="radius"
                option-value-path="radii"
                :options="radiiList"
              />
            </div>
            <div class="w-1/3">
              <btn
                type="button"
                :block="isBlock"
                color="logo-blue"
                @click="checkDistance"
              >
                Look for Silos
              </btn>
            </div>
          </div>
          <div
            v-if="finished && validLocations.length > 0"
            class="px-2 md:flex md:flex-row flex-wrap bg-secondary-5 py-2 rounded-lg"
          >
            <div
              v-for="(address, index) in validLocations"
              :key="address.streetAddress"
              class="py-2 px-2 break-normal sm:w-full md:w-1/3"
            >
              <div>Type: {{ address.type }}</div>
              <div> Name: {{ address.name }}</div>
              <div v-if="address.contact && address.contact !== ''">
                Contact: {{ address.contact }}
              </div>
              <div>
                Phone: {{ address.phone1 }}
                <div v-if="address.phone2">
                  Phone 2: {{ address.phone2 }}
                </div>
              </div>
              <div v-if="address.streetAddress && address.streetAddress !==''">
                {{ address.streetAddress }},
              </div>
              <div>
                {{ address.city }} {{ address.state }}, {{ address.zip }}
              </div>
              <div>
                {{ parseInt(distances[index]) }} miles away
              </div>
            </div>
          </div>
          <div v-else-if="finished && validLocations.length === 0" class="px-2">
            The requested zip and radius returned no results.
          </div>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import fetch from 'node-fetch';  // eslint-disable-line
import addressList from '../../server/src/elevator-locator/address-list';
import SelectField from '../components/common/forms/select.vue';
import InputField from '../components/common/forms/input.vue';
import Btn from '../components/common/button.vue';
import PageHeader from '../components/crop-comparison/page-header.vue';

export default {
  components: {
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
  }),
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
        this.validLocations.push(address);
        this.distances.push(final);
      }
    },
  },
  head: {
    title: 'Find Your Elevator',
  },
};
</script>
