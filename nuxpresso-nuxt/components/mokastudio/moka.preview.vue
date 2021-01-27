<template> 
    <div :ref="doc.id" :class="$classe(doc.css)" :style="$stile(doc) + ' ' + $background(doc)" id="content">
        <!-- 1st level - BLOCKS LOOP -->
            <template v-for="(block,b) in doc.blocks">
                <!-- video background -->
                <div :key="$randomID()" videobg v-if="block.image && (block.image.ext==='.mp4' || block.image.ext==='webm')" :class="'absolute ' + block.css.css">  
                    <video playsinline :poster="block.image.previewUrl" class="object-cover h-full w-full" autoplay loop>
                        <source :src="$imageURL(block.image)"/>
                    </video>
                </div>

                <!-- render page strutcture -->
                <moka-container
                    v-if="!block.loop && !block.hasOwnProperty('slider')"
                    :loop="doc.loop"
                    :article="$attrs.article" 
                    :key="block.id" 
                    :doc="block"
                    :pagination="$attrs.pagination||false"
                    />
                
                <!-- render slider -->
                <moka-slider :key="block.id" v-if="block && block.hasOwnProperty('slider')" :develop="true" :embeded="true" :doc="block" :editor="true"/> 
                    
            </template>
    </div>
</template>

<script>
//import MokaElement from '@/components/mokastudio/moka.element'
import MokaContainer from '@/components/mokastudio/moka.preview.container'
//import MokaSlider from '@/components/mokastudio/moka.slider'
import MokaSlider from '@/components/mokastudio/slider/moka.slider'
//import MokaArticlesLoop from '@/components/mokastudio/moka.preview.articles.loop'
//import MokaContainerLoop from '@/components/mokastudio/moka.preview.container.loop'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin ( ScrollTrigger )
const plugins = [ScrollTrigger];
import gsapEffects from '@/plugins/animations'

export default {
    name: 'MokaPreview',
    data:()=>({
        printScreen: null
    }),
    components: { 
        MokaContainer,
        MokaSlider ,
        /*
        MokaElement,
        MokaArticlesLoop,
        MokaContainerLoop
        */
    },
    computed:{
        animations(){
            //get animations array ( ./plugins/animations.js )
            return gsapEffects
        },
        doc(){
            return this.$attrs.template ?
                        this.$attrs.template : this.$attrs.article.blocks.json
        }
    },
    //props: [ 'doc' ],
    methods: {
        /*
        responsive(css){
            return this.$clean ( this.$cssResponsive ( css ) )
        },
        stile(block){
            let stl = ''
            if ( block.hasOwnProperty('fontFamily') ){
                stl += 'font-family:"' + block.fontFamily + '"'
            }
            stl += block.hasOwnProperty('style') ? block.style : ''
            return stl
        },
        background(block){
            return block.hasOwnProperty('image') ?
                block.image ? 
                    ' background-image:url(' + block.image.url + ');' : '' : ''
        },
        */
       
        animate(element,id   ){
                let vm = this
                !element.hasOwnProperty ( 'gsap' ) ?
                    element.gsap  = {
                        animation: '',
                        duration: .7,
                        delay:0,
                        ease:'none'
                    } : null  
                if ( this.$refs[id] ){      
                    let ani = gsap.effects[element.gsap.animation]( this.$refs[id] ,{
                        trigger: this.$refs[id],
                        duration: parseFloat(element.gsap.duration),
                        delay: parseFloat(element.gsap.delay),
                        ease: element.gsap.ease
                    })

                    //let ani = gsap.effects[element.animation]( this.$refs[id] ) 
                    
                    ScrollTrigger.create({
                        id: id,
                        start: "top 99%",
                        trigger: this.$refs[id],
                        toggleActions: "play pause restart none",
                        animation:ani,
                        onEnter: ()=>{ 
                            if ( element.gsap.delay ){
                                ani.play()
                            } else {
                                ani.play(0)
                            }
                        },
                        
                        
                    });
                }
                
        },
        
        animateSub(doc){
            doc.blocks.forEach ( block => {
                if ( block.hasOwnProperty('gsap') && block.gsap.animation  ){
                    this.animate(block, block.id)
                }
                if ( block.hasOwnProperty('blocks') ){

                    block.blocks.forEach ( el => {
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
    },
    mounted(){
        window.scrollTo(0,0)
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
    }

}
</script>
