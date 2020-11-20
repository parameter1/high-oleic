<template>
  <alert type="success" header="Login link sent">
    <p class="mb-3">
      To continue, open the email that was sent to
      <em>{{ email }}</em>
      and click the link provided.
    </p>
    <p class="text-xs text-green-800">
      Not seeing the email?<br>
      Make sure to check your spam or clutter folders.
    </p>
    <div class="mt-4">
      <alert-action-btn variant="success" @click="$emit('start-over')">
        Login again
      </alert-action-btn>
    </div>
  </alert>
</template>

<script>
import Alert from './common/alert.vue';
import AlertActionBtn from './common/alert-action-btn.vue';

export default {
  components: {
    Alert,
    AlertActionBtn,
  },

  props: {
    email: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    startOverClasses: [
      'px-2',
      'py-1.5',
      'rounded-md',
      'text-sm',
      'leading-5',
      'font-medium',
      'text-green-800',
      'hover:bg-green-100',
      'focus:outline-none',
      'focus:bg-green-100',
      'transition',
      'ease-in-out',
      'duration-150',
    ],
  }),
};
</script>
