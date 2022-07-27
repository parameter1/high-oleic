<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <client-only>
          <h1 slot="placeholder" class="text-2xl mb-4">
            Logging Out...
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
import { LOGOUT } from '../graphql/mutations';
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
    this.logout();
  },

  methods: {
    /**
     *
     */
    async logout() {
      try {
        this.error = null;
        this.isLoading = true;
        const token = this.$apolloHelpers.getToken();
        if (!token) window.location.href = '/crop-comparison';

        await this.$apollo.mutate({
          mutation: LOGOUT,
          variables: { token },
        });
        await this.$apolloHelpers.onLogout();
        window.location.href = '/crop-comparison';
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isLoading = false;
      }
    },
  },

  head: {
    title: 'Logout',
  },
};
</script>
