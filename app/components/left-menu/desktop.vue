<template>
  <div class="hidden lg:flex lg:flex-shrink-0 print:hidden">
    <div class="flex flex-col w-300px xl:w-300px ">
      <div :class="sidebarClasses">
        <div class="flex items-center flex-shrink-0 px-8 my-4">
          <nuxt-link
            to="/"
            title="Homepage"
          >
            <logo class="w-auto h-auto" />
          </nuxt-link>
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <menu-nav size="desktop" />
        </div>
        <user />
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from './nav.vue';
import Logo from '../logo.vue';
import User from './user.vue';

export default {
  components: { Logo, MenuNav, User },

  data: () => ({
    sidebarClasses: [
      'flex',
      'flex-col',
      'flex-grow',
      'border-r',
      'border-secondary-5-300',
      'pt-5',
      'bg-white',
      'overflow-y-auto',
    ],
  }),
};
</script>
