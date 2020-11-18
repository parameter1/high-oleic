<template>
  <div>
    <h1>Edit</h1>
    <ul>
      <li>
        <nuxt-link :to="`/crop-comparison/${$route.params.id}`">
          Root
        </nuxt-link>
        <nuxt-link :to="`/crop-comparison/${$route.params.id}/step-1`">
          Step 1
        </nuxt-link>
        <nuxt-link :to="`/crop-comparison/${$route.params.id}/step-2`">
          Step 2
        </nuxt-link>
      </li>
    </ul>
    <nuxt-child :some-obj="someObj" />
  </div>
</template>

<script>
export default {
  data: () => ({
    someObj: { foo: 'bar' },
  }),
};
</script>
