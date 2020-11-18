<template>
  <div
    v-show="showWrapper"
    :class="wrapperClasses"
    tabindex="0"
    @keyup.esc="$emit('escape', $event)"
  >
    <div class="absolute inset-0 overflow-hidden">
      <backdrop
        :show="withOverlay && value"
        @click="handeOutsideClick"
      />

      <section
        v-closeable="handeOutsideClick"
        class="absolute inset-y-0 right-0 pl-10 max-w-full flex"
      >
        <transition
          enter-active-class="transform transition ease-in-out duration-500"
          enter-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transform transition ease-in-out duration-500"
          leave-class="translate-x-0"
          leave-to-class="translate-x-full"

          @enter="$emit('enter')"
          @after-enter="$emit('after-enter')"
          @before-leave="leaving = true"
          @after-leave="afterLeave"
          @leave-cancelled="leaving = false"
        >
          <div
            v-show="value"
            :class="panelClasses"
          >
            <panel
              :title="title"
              :description="description"
              :close-button="closeButton"
              @close="emit"
            >
              <template #title>
                <slot name="title" />
              </template>
              <template #description>
                <slot name="description" />
              </template>
              <template #body>
                <slot name="body" />
              </template>
              <template #footer>
                <slot name="footer" />
              </template>
            </panel>
          </div>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import Backdrop from './slide-over/backdrop.vue';
import Panel from './slide-over/panel.vue';

export default {
  components: { Backdrop, Panel },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    closeOnOutsideClick: {
      type: Boolean,
      default: false,
    },
    withOverlay: {
      type: Boolean,
      default: false,
    },
    wide: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: [Number, String],
      default: 20,
      validator: (v) => [0, 10, 20, 30, 40, 50].includes(parseInt(v, 10)),
    },
    closeButton: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    leaving: false,
  }),

  computed: {
    showWrapper() {
      if (this.leaving) return true;
      return this.value;
    },
    panelClasses() {
      if (this.wide) return ['w-screen', 'max-w-2xl'];
      return ['w-screen', 'max-w-md'];
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
      return ['fixed', 'inset-0', 'overflow-hidden', zMap[this.zIndex]];
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
