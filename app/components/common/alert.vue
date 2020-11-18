<template>
  <div
    :class="containerClasses"
    role="alert"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <component
          :is="icon"
          :class="iconClasses"
        />
      </div>
      <div class="ml-3">
        <h3
          v-if="header"
          :class="headerClasses"
        >
          {{ header }}
        </h3>
        <div :class="bodyClasses">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconCheckCircleSm from '../icons/check-circle-sm.vue';
import IconInfoCircleSm from '../icons/information-circle-sm.vue';
import IconXCircleSm from '../icons/x-circle-sm.vue';

export default {
  props: {
    header: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'danger'].includes(value),
    },
  },

  computed: {
    icon() {
      switch (this.type) {
        case 'success':
          return IconCheckCircleSm;
        case 'danger':
          return IconXCircleSm;
        default:
          return IconInfoCircleSm;
      }
    },

    containerClasses() {
      const core = [
        'rounded-md',
        'p-4',
        'border-l-8',
        'shadow',
      ];
      const types = {
        primary: ['bg-blue-50', 'border-blue-400'],
        success: ['bg-green-50', 'border-green-400'],
        danger: ['bg-red-50', 'border-red-400'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    iconClasses() {
      const core = ['h-5', 'w-5'];
      const types = {
        primary: ['text-blue-400'],
        success: ['text-green-400'],
        danger: ['text-red-400'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    headerClasses() {
      const core = ['text-sm', 'leading-5', 'font-medium'];
      const types = {
        primary: ['text-blue-800'],
        success: ['text-green-800'],
        danger: ['text-red-800'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
    bodyClasses() {
      const core = ['text-sm', 'leading-5'];
      if (this.header) core.push('mt-2');
      const types = {
        primary: ['text-blue-700'],
        success: ['text-green-700'],
        danger: ['text-red-700'],
      };
      const type = types[this.type];
      if (!type) return core;
      return [...core, ...type];
    },
  },
};
</script>
