<template>
  <row
    :left-attrs="{ class: 'w-1/3', ...headerClasses }"
    :right-attrs="{ class: 'w-2/3', ...headerClasses }"
  >
    <template #right>
      <table class="min-w-full table-fixed">
        <tr>
          <td class="w-1/3">
            Per Acre
          </td>
          <td class="w-1/3">
            Total
          </td>
          <td class="w-1/3 text-right">
            Per Bushel
          </td>
        </tr>
      </table>
    </template>
  </row>
</template>

<script>
import Row from './common/row.vue';

export default {
  components: { Row },

  data: () => ({
    headerClasses: {
      color: 'logo-blue',
      fontWeight: 'semibold',
      fontSize: 'xs',
      paddingY: 'xs',
    },
  }),
};
</script>
