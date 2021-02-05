<template>
  <div :class="classes">
    <div class="my-auto print:my-0">
      <dt class="text-sm print:text-xs print:leading-4 font-medium text-logo-brown">
        {{ title }}
      </dt>
      <slot v-if="$slots.body" name="body" />
      <dd v-else class="mt-1 print:mt-0 flex justify-between items-baseline md:block lg:flex">
        <div class="flex flex-col items-baseline text-2xl print:text-base font-semibold">
          <slot />
          <span
            v-if="description"
            class="text-sm print:text-xs print:leading-4 font-medium text-secondary-4"
          >
            {{ description }}
          </span>
        </div>
      </dd>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    classes: [
      'flex',
      'flex-col',
      'bg-white',
      'shadow',
      'print:shadow-none',
      'rounded-lg',
      'p-4',
      'print:p-2',
    ],
  }),
};
</script>
