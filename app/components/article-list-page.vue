<template>
  <div class="pt-2 pb-6 md:py-6">
    <div class="max-w-7xl mx-auto sm:px-6 md:px-8">
      <div class="p-4">
        <article-grid-list :alias="alias">
          <template #grid-before>
            <slot name="grid-before" />
          </template>
          <template #grid-after>
            <slot name="grid-after" />
          </template>
        </article-grid-list>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleGridList from './article-grid-list.vue';

export default {
  components: {
    ArticleGridList,
  },

  props: {
    path: {
      type: String,
      required: true,
    },
  },

  computed: {
    alias() {
      return this.path.replace(/^\//, '');
    },
  },
};
</script>
