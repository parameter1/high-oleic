<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <!-- Replace with your content -->
      <div class="py-4">
        <h1 class="text-2xl">
          {{ ping }}
        </h1>
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />
      </div>
      <!-- /End replace -->
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    ping: {
      prefetch: true,
      query: gql`
        query {
          ping
        }
      `,
    },
  },

  head: {
    title: 'Caclulate Profit Potential',
  },

  data: () => ({
    ping: null,
  }),
};
</script>
