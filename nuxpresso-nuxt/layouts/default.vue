<template>
  <div id="nuxpresso-page">
    <nuxt/>
  </div>
</template>

<script>
export default {
  middleware: 'load-initial-data',
  name: 'NuxpLayout'
}
</script>
