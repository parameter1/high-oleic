<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <client-only>
          <h1 slot="placeholder" class="text-2xl mb-4">
            Logging In...
          </h1>
          <alert v-if="error" type="danger" class="shadow-sm">
            {{ error.message }}
          </alert>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from '../components/common/alert.vue';
import { AUTHENTICATE } from '../graphql/mutations';
import GraphQLError from '../utils/graphql-error';

export default {
  components: { Alert },

  apollo: {
    $client: 'identityX',
  },

  data: () => ({
    error: false,
    isLoading: false,
  }),

  /**
   *
   *
   */
  mounted() {
    this.authenticate();
  },

  methods: {
    /**
     *
     */
    async authenticate() {
      try {
        this.error = null;
        this.isLoading = true;

        const { token, redirectTo = '/crop-comparison' } = this.$route.query;
        if (!token) throw new Error('No authentication token was provided.');
        const { data } = await this.$apollo.mutate({
          mutation: AUTHENTICATE,
          variables: { token },
        });
        await this.$apolloHelpers.onLogin(data.loginAppUser.token.value);
        window.location.href = redirectTo;
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
