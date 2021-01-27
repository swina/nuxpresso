<template>
    <form
        @submit.prevent="onSubmit" 
        :id="doc.hasOwnProperty('anchor')? doc.anchor : doc.id"
        v-if="doc"
        :class="$classe(doc.css)" :style="$stile(doc) + ' ' +  $background(doc)" :ref="doc.id">
        
        <template v-for="(block,b) in doc.blocks">
             
            <moka-element
                :article="$attrs.article"
                v-if="$isMokaElement(block)"
                :key="block.id"
                :element="block"/> 

            <moka-container
                :key="block.id"
                :form="false"
                :loop="$attrs.loop"
                :article="$attrs.article"
                v-if="$isMokaContainer(block,doc)"
                :doc="block"/>
        </template>
        <div v-if="response" :class="responseClass">{{ response }}</div>
    </form>

</template>

<script>
import MokaElement from '@/components/mokastudio/moka.element'
import MokaContainer from '@/components/mokastudio/moka.preview.container'
import { mapState } from 'vuex'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];

export default {
    name: 'MokaPreviewForm',
    components: { MokaElement , MokaContainer  },
    props: [ 'doc'  ],
    data:()=>({
        form: null,
        action: null,
        response: '',
        enabled: true,
        responseClass: ''
    }),
    computed:{
        ...mapState(['moka']),
        animations(){
            return gsapEffects
        }
    },
    methods:{
        async onSubmit(event) {
            if ( !this.enabled ) return
            let formData = new FormData(event.target);
            var data = {}; 
            formData.forEach(function(v,k) { data[k]=v; })
            let vm = this
            this.enabled = false
            this.$axios.$post ( 
                '/' + vm.doc.action, data ).then ( resp => {
                vm.responseClass = 'text-green-400'
                vm.response = vm.doc.success || 'Your form was successfully submitted'
                //vm.clearForm()
                vm.enabled = true
            }).catch ( error => {
                vm.response = vm.doc.error || 'An error occured. Please retry later.'
                vm.responseClass = 'text-red-500'
                vm.enabled = true
            })
            
            return null
        },
        
        animate(element,id){
            let vm = this
            if ( this.$refs && element.hasOwnProperty('gsap') && element.gsap.animation ){
                //console.log ( 'animation for => ' , id , this.$refs[id] )
                let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                    trigger: this.$refs[id],
                    duration: parseFloat(element.gsap.duration),
                    delay: parseFloat(element.gsap.delay),
                    ease: element.gsap.ease
                })
                ScrollTrigger.create({
                    id: id,
                    start: "top 99%",
                    trigger: this.$refs[id],
                    toggleActions: "play pause restart none",
                    animation:ani,
                    onEnter: ()=>{ 
                        //console.log ( 'start playing animation')
                        if ( element.gsap.delay ){
                            ani.play()
                        } else {
                            ani.play(0)
                        }
                    },
                    
                });
                    
            }
        },
    },
    mounted(){
        window.scrollTo(0,0)
        if ( this.doc.hasOwnProperty('gsap') && this.doc.gsap.animation ){
            //console.log ( 'REFS=>' , this.$refs , ' => animation => ' , this.doc.gsap.animation )
            this.animate ( this.doc , this.doc.id )
        }
        return
        /*
        this.doc.blocks.forEach ( block => {
            if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                this.animate(block, block.id)
            }
            if ( block.hasOwnProperty('blocks') ){
                block.blocks.forEach ( container => {
                    if ( container.hasOwnProperty('gsap') && container.gsap.animation ){
                        this.animate ( container , container.id )
                    }
                    if ( container.hasOwnProperty('blocks') ){
                        container.blocks.forEach ( el => {
                            if ( el.hasOwnProperty('gsap') && el.gsap.animation ){
                                this.animate ( el , el.id   )
                            }
                                if ( el.hasOwnProperty('blocks') ){
                                el.blocks.forEach ( element => {
                                        if ( element.hasOwnProperty('gsap') && element.gsap.animation ){
                                        this.animate ( element , element.id   )
                                    }
                                })
                            }
                            
                        })
                    }
                })
            }
        })
        */
    }
}
</script>