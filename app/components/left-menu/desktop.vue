<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col h-0 flex-1">
        <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <nuxt-link
            to="/"
            title="Homepage"
          >
            <logo />
          </nuxt-link>
        </div>
        <div class="flex-1 flex flex-col overflow-y-auto">
          <menu-nav size="desktop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from './nav.vue';
import Logo from './logo.vue';

export default {
  components: { Logo, MenuNav },
};
</script>
