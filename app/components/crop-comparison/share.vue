<template>
  <slide-over
    :value="value"
    :description="description"
    with-overlay
    @input="$emit('input', $event)"
    @after-leave="reset"
  >
    <template #title>
      <div class="flex items-center">
        Share Scenario Report
      </div>
    </template>

    <template #body>
      <div class="py-8 px-4">
        <share-link :link="publicLink" />

        <hr class="my-5">
        <form v-if="!sent" @submit.prevent="send">
          <fieldset class="space-y-4" :disabled="isSending">
            <p class="text-base font-medium leading-none">
              Or share report via email:
            </p>
            <input-group
              id="share-report.email"
              v-model="email"
              label="Send to"
              type="email"
              hint="Enter the email address of the person who should receive this report"
              required
            />

            <textarea-group
              id="share-report.messge"
              v-model="message"
              label="Optional message"
              hint="Add a message that will be included in the email"
            />

            <btn
              type="submit"
              color="logo-green"
              :loading="isSending"
            >
              Send Email
            </btn>

            <alert
              v-if="error"
              type="danger"
              header="Send Failed"
            >
              {{ error.message }}
            </alert>
          </fieldset>
        </form>
        <alert
          v-else
          type="success"
          header="Email Sent"
        >
          <p class="mb-3">
            Message successfully sent to
            <em>{{ email }}</em>
          </p>
          <div class="mt-4">
            <alert-action-btn variant="success" @click="reset">
              Send another message
            </alert-action-btn>
          </div>
        </alert>
      </div>
    </template>
  </slide-over>
</template>

<script>
import Alert from '../common/alert.vue';
import AlertActionBtn from '../common/alert-action-btn.vue';
import Btn from '../common/button.vue';
import InputGroup from '../common/forms/input-group.vue';
import ShareLink from './share-link.vue';
import SlideOver from '../overlays/slide-over.vue';
import TextareaGroup from '../common/forms/textarea-group.vue';
import GraphQLError from '../../utils/graphql-error';

import { SEND_REPORT_EMAIL } from '../../graphql/mutations';

export default {
  components: {
    Alert,
    AlertActionBtn,
    Btn,
    InputGroup,
    ShareLink,
    SlideOver,
    TextareaGroup,
  },

  props: {
    /**
     * Whether the share slideover is open.
     */
    value: {
      type: Boolean,
      default: false,
    },

    comparisonId: {
      type: String,
      required: true,
    },

    publicLink: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    description: 'Share this report using a public link or via email',
    email: null,
    error: null,
    message: null,
    isSending: false,
    sent: false,
  }),

  methods: {
    reset() {
      this.email = null;
      this.message = null;
      this.sent = false;
    },

    async send() {
      try {
        this.error = null;
        this.isSending = true;
        const input = { id: this.comparisonId, to: this.email, message: this.message };
        const variables = { input };
        await this.$apollo.mutate({ mutation: SEND_REPORT_EMAIL, variables });
        this.sent = true;
      } catch (e) {
        this.error = new GraphQLError(e);
      } finally {
        this.isSending = false;
      }
    },
  },
};
</script>
