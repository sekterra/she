<template >
    <b-container fluid class="px-0">
      <b-card 
        header-bg-variant="transparent"
        class="mx-0 px-0"
        >
        <div slot="header" bg-variant="white">
            <strong>Title영역(자동으로 받아올 예정)</strong>
          </div>
        <b-row>
          <b-col sm="12">
            <router-view />
          </b-col>
        </b-row>
      </b-card>
    </b-container>
</template>
