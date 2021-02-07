<template>
  <report :public-id="$route.params.hash" />
</template>

<script>
import Report from '../../../components/crop-comparison/report.vue';

export default {
  components: {
    Report,
  },
};
</script>
