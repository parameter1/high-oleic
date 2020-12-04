<template>
  <slide-over
    v-model="show"
    :description="description"
    with-overlay
    wide
    @after-leave="returnToList"
    @after-enter="focus"
  >
    <template #title>
      <div class="flex items-center">
        Modify Scenerio
      </div>
    </template>

    <template #body>
      <modify-nav :comparison-id="$route.params.id" />
      <nuxt-child />
    </template>
  </slide-over>
</template>

<script>
import ModifyNav from '../../../components/crop-comparison/modify-nav.vue';
import SlideOver from '../../../components/overlays/slide-over.vue';

export default {
  components: { ModifyNav, SlideOver },

  data: () => ({
    description: 'Get started on a new crop comparison scenerio by filling in the information below.',
    show: false,
  }),

  mounted() {
    this.show = true;
  },

  methods: {
    /**
     *
     */
    focus() {
      console.log('implement focus');
      // const input = this.$refs.farmName.$el.querySelector('input');
      // if (input) input.focus();
    },

    /**
     */
    returnToList() {
      this.$router.replace('/crop-comparison');
    },
  },
};
</script>
