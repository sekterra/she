<template >
    <b-container fluid class="px-0">
      <b-card 
        header-bg-variant="transparent"
        class="mx-0 px-0"
        >
        <div slot="header" bg-variant="white">
            <strong>{{pageTitle}}</strong>
          </div>
        <b-row>
          <b-col sm="12">
            <router-view />
          </b-col>
        </b-row>
      </b-card>
    </b-container>
</template>

<script>
export default {
  computed: {
    pageTitle () {
      return this.$t('route.' + this.$route.meta.title);
    }
  },
}
</script>
