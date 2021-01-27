<template>
    <div class="w-full flex flex-col px-12">
        <h1 class="text-center w-full">Welcome to nuxpresso</h1>
        <div v-if="!settings">
            In order to start you need to:

            <h3>1. Go to nuxpresso-cms click on <strong>Settings</strong></h3>
            <h3>2. Input just some basic info and click <strong>Save</strong></h3>
            <h3>3. Refresh this page</h3>
        </div>
        <div v-else>
            <p>Name: <strong>{{settings.site_name}}</strong></h3>
            <h3>Headline: {{    settings.site_title}}</h3>
            <h3>Credits: {{settings.footer}}</h3>    
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'NuxpressoStartup',
    layout: 'startup',
    computed:{
        ...mapState ( ['settings'] )
    },
    mounted(){
        this.$store.dispatch ( 'loadSettings' )
    }
}
</script>