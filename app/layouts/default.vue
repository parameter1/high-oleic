<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <left-menu v-model="menuOpen" />
  </div>
</template>

<script>
import LeftMenu from '../components/left-menu.vue';

export default {
  components: { LeftMenu },

  data: () => ({
    menuOpen: true,
  }),
};
</script>
