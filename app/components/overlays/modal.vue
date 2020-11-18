<template>
  <!-- eslint-disable -->
  <div
    v-show="showWrapper"
    :class="wrapperClasses"
    tabindex="0"
    @keyup.esc="$emit('escape', $event)"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
     <backdrop :show="withOverlay && value" @click="handeOutsideClick" />
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"

        @enter="$emit('enter')"
        @after-enter="$emit('after-enter')"
        @before-leave="leaving = true"
        @after-leave="afterLeave"
        @leave-cancelled="leaving = false"
      >
        <div
          v-show="value"
          :class="contentClasses"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="id"
        >
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Backdrop from './modal/backdrop.vue';

export default {
  components: { Backdrop },

  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      default: false,
    },
    closeOnOutsideClick: {
      type: Boolean,
      default: false,
    },
    withOverlay: {
      type: Boolean,
      default: true,
    },
    withSidebar: {
      type: Boolean,
      default: true,
    },
    zIndex: {
      type: [Number, String],
      default: 20,
      validator: (v) => [0, 10, 20, 30, 40, 50].includes(parseInt(v, 10)),
    },
  },

  data: () => ({
    leaving: false,
  }),

  computed: {
    contentClasses() {
      const classes = [
        'inline-block',
        'align-bottom',
        'bg-white',
        'rounded-lg',
        'px-4',
        'pt-5',
        'pb-4',
        'text-left',
        'overflow-hidden',
        'shadow-xl',
        'transform',
        'transition-all',
        'sm:my-8',
        'sm:align-middle',
        'sm:max-w-lg',
        'sm:w-full',
        'sm:p-6',
      ];
      if (this.withSidebar) classes.push('md:ml-64');
      return classes;
    },

    showWrapper() {
      if (this.leaving) return true;
      return this.value;
    },

    wrapperClasses() {
      const zMap = {
        0: 'z-0',
        10: 'z-10',
        20: 'z-20',
        30: 'z-30',
        40: 'z-40',
        50: 'z-50',
      };
      return ['fixed', 'inset-0', 'overflow-y-auto', zMap[this.zIndex], 'outline-none'];
    },
  },

  methods: {
    afterLeave(event) {
      this.leaving = false;
      this.$emit('after-leave', event);
    },

    emit() {
      this.$emit('input', !this.value);
    },

    handeOutsideClick() {
      if (this.closeOnOutsideClick) this.emit();
    },
  },
};
</script>
