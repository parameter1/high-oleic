<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <h1 class="text-2xl mb-4">
          Login
        </h1>
        <div v-if="sent">
          Login link sent to {{ email }}
        </div>
        <div v-else>
          <p>
            To login or register, please submit your email address below.
            A login link will be sent to the email address you enter.
          </p>
          <form @submit.prevent="sendLoginLink">
            <div>
              <label for="login.email">Email Address</label>
              <input
                id="login.email"
                v-model="email"
                :disabled="isLoading"
                type="email"
                placeholder="email@domain.com"
                required
              >
            </div>
            <button
              type="submit"
              :disabled="isLoading"
            >
              Login / Register
            </button>
          </form>
          <div v-if="isLoading">
            Loading...
          </div>
          <div v-if="error">
            {{ error.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sendLoginLink from '../utils/send-login-link';
import GraphQLError from '../utils/graphql-error';

export default {
  apollo: {
    $client: 'identityX',
  },

  data: () => ({
    email: null,
    error: null,
    isLoading: false,
    sent: false,
  }),

  methods: {
    async sendLoginLink() {
      try {
        this.error = null;
        this.isLoading = true;
        await sendLoginLink(this.$apollo, {
          email: this.email,
          authUrl: `${window.location.origin}/authenticate`,
          redirectTo: this.$route.query.r,
        });
        this.sent = true;
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isLoading = false;
      }
    },
  },

  head: {
    title: 'Login',
  },
};
</script>
