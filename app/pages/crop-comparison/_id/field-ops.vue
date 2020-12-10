<template>
  <div class="p-4">
    <alert
      v-if="error"
      type="danger"
      class="mb-5 shadow-sm"
    >
      {{ error.message }}
    </alert>
    <section v-else>
      <div class="">
        <form
          id="modify-crop-comparison"
          ref="form"
          class="grid grid-cols-1 gap-4 md:grid-cols-2"
          @submit.prevent="save"
        >
          <expense-fieldset
            apply-to="COMPARED_CROP"
            :category-id="categoryId"
            :line-item-keys="lineItemKeys"
            :categories="comparedTo.expenses.categories"
            :crop-name="comparedTo.crop.label"
            :disabled="isLoading || isSaving"
            class="max-w-md"
            @input="setValue"
          />

          <expense-fieldset
            apply-to="OLEIC"
            :category-id="categoryId"
            :line-item-keys="lineItemKeys"
            :categories="oleic.expenses.categories"
            :crop-name="oleic.crop.label"
            :disabled="isLoading || isSaving"
            class="max-w-md"
            @input="setValue"
          />
        </form>
      </div>

      <alert
        v-if="savingError"
        type="danger"
        header="Save Failed"
        class="mt-6"
      >
        {{ savingError.message }}
      </alert>

      <div class="flex justify-start mt-6 pt-4 border-t border-secondary-5-200">
        <btn
          ref="submitButton"
          form="modify-crop-comparison"
          color="logo-green"
          type="submit"
          :loading="isSaving"
          :disabled="isLoading"
        >
          Save &amp; Continue
        </btn>
        <!-- <btn
          form="modify-crop-comparison"
          color="secondary-3"
          class="ml-4"
          :disabled="isLoading || isSaving"
          @click="reset"
        >
          Reset
        </btn> -->

        <btn
          class="ml-auto"
          :disabled="isLoading || isSaving"
          @click.prevent="$router.push(`/crop-comparison/report/${comparisonId}`)"
        >
          View Report
        </btn>
      </div>
    </section>
  </div>
</template>

<script>
import clone from 'lodash.clonedeep';
import { set } from 'object-path';
import Alert from '../../../components/common/alert.vue';
import Btn from '../../../components/common/button.vue';

import ExpenseFieldset from '../../../components/crop-comparison/modify-expense-fieldset.vue';

import { CROP_COMPARISON_EXPENSES } from '../../../graphql/queries';
import { UPDATE_CROP_COMPARISON_EXPENSES } from '../../../graphql/mutations';
import GraphQLError from '../../../utils/graphql-error';

export default {
  components: {
    Alert,
    Btn,
    ExpenseFieldset,
  },

  async beforeRouteLeave(to, from, next) {
    const { form, submitButton } = this.$refs;
    if (!form.checkValidity()) {
      // simulate the form submit (via click) to trigger the native validation UI.
      submitButton.$el.click();
    } else {
      // form is valid. save the form and continue
      await this.save({ redirect: false });
      next();
    }
  },

  apollo: {
    cropComparison: {
      query: CROP_COMPARISON_EXPENSES,
      fetchPolicy: 'cache-and-network',
      variables() {
        return { id: this.comparisonId };
      },
      update({ cropComparison }) {
        return clone(cropComparison);
      },
      error(e) { this.error = new GraphQLError(e); },
      watchLoading(isLoading) {
        this.isLoading = isLoading;
        this.$emit('loading', isLoading);
        if (isLoading) this.error = null;
      },
      prefetch: false,
    },
  },

  props: {
    comparisonId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    categoryId: 'fieldOps',
    lineItemKeys: ['sprayer', 'equipment', 'other'],
    error: null,
    isLoading: true,
    cropComparison: {
      comparedTo: { crop: {}, expenses: { categories: [] } },
      oleic: { crop: {}, expenses: { categories: [] } },
    },
    isSaving: false,
    savingError: null,
    values: {},
  }),

  computed: {
    comparedTo() {
      return this.cropComparison.comparedTo;
    },
    oleic() {
      return this.cropComparison.oleic;
    },
  },

  methods: {
    /**
     *
     */
    async save({ redirect = false } = {}) {
      try {
        this.savingError = null;
        this.isSaving = true;
        const { comparisonId } = this;
        const input = { id: comparisonId };
        Object.keys(this.values).forEach((type) => {
          if (!input[type]) input[type] = [];

          Object.keys(this.values[type]).forEach((applyTo) => {
            Object.keys(this.values[type][applyTo]).forEach((lineItem) => {
              input[type].push({
                applyTo,
                lineItem,
                value: parseFloat(this.values[type][applyTo][lineItem]),
              });
            });
          });
        });
        const variables = { input };
        await this.$apollo.mutate({ mutation: UPDATE_CROP_COMPARISON_EXPENSES, variables });
        if (redirect) this.$router.push(`/crop-comparison/${comparisonId}/grain-handling`);
      } catch (e) {
        this.savingError = new GraphQLError(e);
      } finally {
        this.isSaving = false;
      }
    },

    reset() {
      this.values = {};
      this.$apollo.queries.cropComparison.refresh();
    },

    setValue({
      category,
      lineItem,
      applyTo,
      costs,
      value,
    }) {
      const expenseField = lineItem.unit === 'PER_ACRE' ? 'perAcre' : 'perBushel';
      set(costs, expenseField, value);
      const lineItemType = lineItem[`${category.id}Type`];
      const path = `${category.id}.${applyTo}.${lineItemType}`;
      set(this.values, path, value);
    },
  },
};
</script>
