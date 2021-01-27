<template>
    <nuxpresso-moka-template v-if="articles && component" :doc="component.json" :article="articles" :pagination="true"/>
</template>

<script>
import articlesPaginationQueries from '@/apollo/queries/article/articles-by-category'
import categoryQuery from '@/apollo/queries/category/categories-slug'
import componentTemplateQuery from '@/apollo/queries/component/component.loop'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'    
import { mapState } from 'vuex'

export default {
    name: 'NuxpCategories',
    data:()=>({
        start: 0,
        limit: 10,
        component:null,
        articles: null
    }),
    components: { NuxpressoMokaTemplate },
    computed:{
        ...mapState ( ['settings','loop_action','categories'] ),
        action(){
            return this.loop_action
        },
        setLimit(){
            if ( this.component.hasOwnProperty('loop_limit') ){
                this.limit = parseInt(this.component.loop_limit)
            }
        },
        category(){
            return this.categories.filter ( cat => { cat.slug === this.$route.params.slug })[0]
        }
    },
    head(){
        return {
            title: this.settings.site_name + ' - ' + this.$route.params.slug,
            meta: [
                { 
                hid: this.$route.params.slug, 
                name: this.$route.params.slug, 
                content: this.settings.site_title + ' ' +  this.$route.params.slug }
            ]
        }
    },
    watch:{
        action(v){
            if ( v === 'next' ){
                this.start += this.limit
                this.$fetch()
                this.$store.dispatch ( 'set_loop_action' , null )
            } 
            if ( v === 'prev'){
                this.start -= this.limit
                if ( this.start < 0 ) this.start = 0
                this.$fetch()
                this.$store.dispatch ( 'set_loop_action' , null )
            }
        }
    },
    async fetch(){
        //this.$nuxt.$loading.start()
        this.$apolloProvider.defaultClient.query({
            query: componentTemplateQuery,
            variables:{
                loop_type : this.$route.params.slug
            }
        }).then ( resp => {
            if ( !resp.data.length ){
                this.$apolloProvider.defaultClient.query({
                    query: componentTemplateQuery
                }).then ( response => {
                    console.log ( response.data )
                    this.component = response.data.components[0]
                })
            } else {
                this.component = resp.data.components[0]
            }
            
            this.$apolloProvider.defaultClient.query({
            query: articlesPaginationQueries,
            variables: {
                start: this.start,
                limit: this.limit,
                slug: this.$route.params.slug
            }
            }).then ( resp => {
                this.articles = resp.data.articles
                //this.$nuxt.$loading.finish() 
            })
        })
        
    },
    mounted(){
        
        this.$fetch()
    }
}
</script>