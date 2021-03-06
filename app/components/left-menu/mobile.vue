<template>
  <div class="lg:hidden print:hidden">
    <div
      v-show="showWrapper"
      class="fixed inset-0 flex z-40"
    >
      <transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-show="value"
          class="fixed inset-0"
        >
          <div class="absolute inset-0 bg-primary-1 opacity-50" />
        </div>
      </transition>

      <transition
        enter-active-class="transition ease-in-out duration-300 transform"
        enter-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition ease-in-out duration-300 transform"
        leave-class="translate-x-0"
        leave-to-class="-translate-x-full"

        @before-leave="leaving = true"
        @after-leave="leaving = false"
        @leave-cancelled="leaving = false"
      >
        <div
          v-show="value"
          v-closeable="emit"
          class="relative flex-1 flex flex-col max-w-xs w-full pt-5 bg-white"
        >
          <div class="absolute top-0 right-0 -mr-14 p-1">
            <close-button
              :show="showButton"
              @click.stop="emit"
            />
          </div>
          <div class="flex-shrink-0 flex items-center px-8">
            <nuxt-link
              to="/"
              title="Homepage"
            >
              <logo class="w-auto h-auto" />
            </nuxt-link>
          </div>
          <div class="mt-5 flex-1 h-0 overflow-y-auto">
            <menu-nav
              size="mobile"
              @nav-item-click="emit"
            />
          </div>
          <user />
        </div>
      </transition>

      <!-- Dummy element to force sidebar to shrink to fit close icon -->
      <div class="flex-shrink-0 w-14" />
    </div>
  </div>
</template>

<script>
import MenuNav from './nav.vue';
import Logo from '../logo.vue';
import CloseButton from './close-button.vue';
import User from './user.vue';

export default {
  components: {
    Logo,
    MenuNav,
    CloseButton,
    User,
  },

  props: {
    /**
     * Whether the menu is currently open.
     */
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    entering: false,
    leaving: false,
  }),

  computed: {
    showButton() {
      if (this.leaving) return false;
      return this.value;
    },
    showWrapper() {
      if (this.leaving) return true;
      return this.value;
    },
  },

  methods: {
    emit() {
      this.$emit('input', !this.value);
    },
  },
};
</script>
