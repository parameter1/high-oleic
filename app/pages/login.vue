<template>
  <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h1 class="mt-6 text-center text-2xl font-semibold">
        Login / Register
      </h1>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div v-if="isLoggedIn">
          <div class="mb-6">
            You are already logged-in.
          </div>
          <nuxt-link to="/logout" class="text-logo-green hover:underline font-medium">
            Logout
          </nuxt-link>
        </div>
        <form v-else-if="!sent" class="space-y-6" @submit.prevent="sendLoginLink">
          <input-group
            id="sign-in.email"
            v-model="email"
            :hint="hint"
            :disabled="isSending"
            label="Email address"
            type="email"
            required
          />
          <btn
            type="submit"
            color="logo-blue"
            :loading="isSending"
            block
          >
            Send login link
          </btn>
          <alert v-if="error" type="danger">
            {{ error.message }}
          </alert>
        </form>
        <login-link-sent v-else :email="email" @start-over="reset" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/common/alert.vue';
import Btn from '../components/common/button.vue';
import InputGroup from '../components/common/forms/input-group.vue';
import LoginLinkSent from '../components/login-link-sent.vue';

import sendLoginLink from '../utils/send-login-link';
import GraphQLError from '../utils/graphql-error';

export default {
  components: {
    Alert,
    Btn,
    InputGroup,
    LoginLinkSent,
  },

  apollo: {
    $client: 'identityX',
  },

  data: () => ({
    email: null,
    error: null,
    isSending: false,
    sent: false,
    hint: 'You must have access to this email account. A login link will be emailed to this address.',
  }),

  computed: {
    isLoggedIn() {
      return !!this.$apolloHelpers.getToken();
    },
  },

  methods: {
    /**
     *
     */
    reset() {
      this.email = null;
      this.sent = false;
    },

    /**
     *
     */
    async sendLoginLink() {
      try {
        this.error = null;
        this.isSending = true;
        await sendLoginLink(this.$apollo, {
          email: this.email,
          authUrl: `${window.location.origin}/authenticate`,
          redirectTo: this.$route.query.r,
        });
        this.sent = true;
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isSending = false;
      }
    },
  },

  head: {
    title: 'Login / Register',
  },
};
</script>
