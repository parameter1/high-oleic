<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <h1 class="text-2xl mb-4">
          <span v-if="isLoading">
            Logging In...
          </span>
          <span v-else-if="error">
            Oops...
          </span>
        </h1>
        <p v-if="error">
          {{ error.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTHENTICATE } from '../graphql/mutations';
import GraphQLError from '../utils/graphql-error';

export default {
  apollo: {
    $client: 'identityX',
  },

  data: () => ({
    error: false,
    isLoading: false,
  }),

  /**
   * @todo by running this in the mounted hook it will only run client-side.
   * @todo confirm this. running server then client breaks the token, since it's used more than once
   */
  mounted() {
    this.authenticate();
  },

  methods: {
    /**
     * @todo should this use async data or a nuxt middleware??
     */
    async authenticate() {
      try {
        this.error = null;
        this.isLoading = true;

        const { token, redirectTo = '/' } = this.$route.query;
        if (!token) throw new Error('No authentication token was provided.');
        const { data } = await this.$apollo.mutate({
          mutation: AUTHENTICATE,
          variables: { token },
        });
        await this.$apolloHelpers.onLogin(data.loginAppUser.token.value);
        this.$router.push(redirectTo);
      } catch (e) {
        if (/no token was found/i.test(e.message)) {
          e.message = 'This login link has either expired or was already used. Please login again.';
        }
        this.error = new GraphQLError(e);
      } finally {
        this.isLoading = false;
      }
    },
  },

  head: {
    title: 'Authenticate',
  },
};
</script>
