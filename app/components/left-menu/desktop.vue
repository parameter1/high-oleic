<template>
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div :class="sidebarClasses">
        <div class="flex items-center flex-shrink-0 px-4">
          <nuxt-link
            to="/"
            title="Homepage"
          >
            <logo />
          </nuxt-link>
        </div>
        <div class="mt-5 flex-grow flex flex-col">
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

  data: () => ({
    sidebarClasses: [
      'flex',
      'flex-col',
      'flex-grow',
      'border-r',
      'border-gray-200',
      'pt-5',
      'pb-4',
      'bg-white',
      'overflow-y-auto',
    ],
  }),
};
</script>
