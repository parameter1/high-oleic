<template>
  <report :comparison-id="$route.params.id" />
</template>

<script>
import Report from '../../../components/crop-comparison/report.vue';

export default {
  components: {
    Report,
  },
};
</script>
