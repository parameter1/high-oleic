<template>
  <div class="-mx-2 -my-1.5 flex">
    <button
      :class="classes"
      :type="type"
      :disabled="disabled"
      @click="$emit('click', $event)"
    >
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'success', 'danger'].includes(value),
    },
  },

  computed: {
    classes() {
      const core = [
        'px-2',
        'py-1.5',
        'rounded-md',
        'text-sm',
        'leading-5',
        'font-medium',
        'focus:outline-none',
        'transition',
        'ease-in-out',
        'duration-150',
      ];
      const variants = {
        primary: ['text-blue-800', 'hover:bg-blue-100', 'focus:bg-blue-100'],
        success: ['text-green-800', 'hover:bg-green-100', 'focus:bg-green-100'],
        danger: ['text-red-800', 'hover:bg-red-100', 'focus:bg-red-100'],
      };
      const variant = variants[this.variant];
      if (!variant) return core;
      return [...core, ...variant];
    },
  },
};
</script>
