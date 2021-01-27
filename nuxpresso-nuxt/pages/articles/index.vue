<template>
    <nuxpresso-moka-template v-if="articles && component" :template="component.json" :article="articles" :pagination="true"/>
    <!--<div>
        <client-only>
        {{ articles }}
        </client-only>
    </div>
    -->
</template>

<script>
import articlesPaginationQueries from '~/apollo/queries/article/articles-pagination'
import componentTemplateQuery from '~/apollo/queries/component/component.loop'
import NuxpressoMokaTemplate from '@/components/mokastudio/moka.preview'
import { mapState } from 'vuex'
export default {
    name: 'NuxpArticles',
    components: { NuxpressoMokaTemplate },
    data:()=>({
        start: 0,
        limit: 10,
        component:null,
        articles: null
    }),
    head(){
        return {
            title: this.settings.site_name + ' - ' + this.$route.name,
            meta: [
                { 
                hid: this.$route.name, 
                name: this.$route.name, 
                content: this.settings.site_title + ' ' +  this.$route.name }
            ]
        }
        
    },
    computed:{
        ...mapState ( ['settings','loop_action'] ),
        action(){
            return this.loop_action
        }
    },
    watch:{
        action(v){
            if ( v === 'next' ){
                this.start += this.limit
                //this.$fetch()
                this.$store.dispatch ( 'set_loop_action' , null )
            } 
            if ( v === 'prev'){
                this.start -= this.limit
                if ( this.start < 0 ) this.start = 0
                //this.$fetch()
                this.$store.dispatch ( 'set_loop_action' , null )
            }
        }
    },
    apollo: {
        component : {
            query: componentTemplateQuery,
            variables(){
                return {
                    loop_type: this.$route.params.slug
                }
            },
            update: data => data.components[0]
        },
        articles: {
            query: articlesPaginationQueries,
            variables(){
                return {
                    start: this.start,
                    limit: this.limit
                }
            },
        }
    }
   
    /*
    async fetch(){
        this.$apolloProvider.defaultClient.query({
            query: componentTemplateQuery,
            variables:{
                loop_type : this.$route.params.slug
            }
        }).then ( resp => {
            this.component = resp.data.components[0]

            if ( this.component && this.component.hasOwnProperty('loop_limit') ){
                this.limit = parseInt(this.component.loop_limit)
            }
            this.$apolloProvider.defaultClient.query({
            query: articlesPaginationQueries,
            variables: {
                start: this.start,
                limit: this.limit
            }
            }).then ( resp => {
                this.articles = resp.data.articles
            })
        })
        
    },
    mounted(){
        //this.$nuxt.$loading.start()
        this.$fetch()
    }
    */
}
</script>