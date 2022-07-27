<template>
  <div :class="classes">
    <left-menu v-model="menuOpen" />

    <div class="flex flex-col w-0 flex-1 overflow-hidden print:overflow-visible">
      <div class="lg:hidden print:hidden relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <!-- open menu button (on mobile) -->
        <open-menu-button @click.stop="menuOpen = !menuOpen" />
        <div class="flex-1 px-4 flex justify-between">
          <div class="flex-1 flex items-center">
            <nuxt-link
              to="/crop-comparison"
              title="Homepage"
            >
              <logo class="h-12" />
            </nuxt-link>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- could add nav icons here -->
          </div>
        </div>
      </div>

      <main
        class="flex-1 relative overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <transition
          enter-active-class="ease-in-out duration-300"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in-out duration-300"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
          mode="out-in"
        >
          <nuxt />
        </transition>
        <image-citation />
      </main>
    </div>
  </div>
</template>

<script>
import LeftMenu from '../components/left-menu.vue';
import Logo from '../components/logo.vue';
import OpenMenuButton from '../components/open-menu-button.vue';
import ImageCitation from '../components/common/image-citation.vue';

export default {
  components: {
    LeftMenu,
    Logo,
    OpenMenuButton,
    ImageCitation,
  },

  data: () => ({
    classes: [
      'antialiased',
      'h-screen',
      'print:h-auto',
      'flex',
      'overflow-hidden',
      'print:overflow-visible',
      'bg-secondary-5-50',
      'print:bg-white',
    ],
    menuOpen: false,
  }),
};
</script>
