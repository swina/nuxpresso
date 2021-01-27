<template>
    <component :ref="el.id" :is="component" :style="el.style" :class="css" :el="el" :child="child"/> 
</template>

<script>
import MokaText from '@/components/mokastudio/elements/moka.text'
import MokaVideo from '@/components/mokastudio/elements/moka.video'
import MokaAudio from '@/components/mokastudio/elements/moka.audio'
import MokaIframe from '@/components/mokastudio/elements/moka.iframe'
import MokaSvg from '@/components/mokastudio/elements/moka.svg'
import MokaImg from '@/components/mokastudio/elements/moka.img'
import MokaIcon from '@/components/mokastudio/elements/moka.icon'
import MokaMenu from '@/components/mokastudio/elements/moka.menu'
import MokaInput from '@/components/mokastudio/elements/moka.input'
import MokaTextarea from '@/components/mokastudio/elements/moka.textarea'
import MokaSimpleSvg from '@/components/mokastudio/elements/moka.simple.svg'
import MokaArticle from '@/components/mokastudio/elements/moka.article'
import MokaLink from '@/components/mokastudio/elements/moka.link'
export default {
    name: 'MokaRenderElement',
    components: {
        MokaText,
        MokaVideo,
        MokaAudio,
        MokaIframe,
        MokaSvg,
        MokaImg,
        MokaInput,
        MokaTextarea,
        MokaSimpleSvg,
        MokaArticle,
        MokaLink
    },
    data:()=>({
        css: '',
        child: null
    }),
    props: [ 'el' ],
    computed:{
        component(){
            let el = this.$attrs.element
            !el.link ?
                this.css = this.$cssResponsive(el.css) :
                    this.css = ''
            if ( ( el.tag === 'element' || el.type === 'button' ) && el.element != 'img' && el.type != 'video' && el.type != 'audio' ) {
                this.child = MokaText
                return el.link ? MokaLink : MokaText
                return MokaText
            }
            if ( el.tag === 'article' && el.type === 'element' ){
                this.$attrs.element.content = this.$attrs.article[el.label]
                this.child = MokaText
                return el.link ? MokaLink : MokaText
                return MokaText
            }
            if ( el.tag === 'article' && el.element === 'img' ){
                this.$attrs.element.image = this.$attrs.article.featured_img//this.$attrs.article[el.label]
                this.child = MokaImg
                return el.link ? MokaLink : MokaImg
            }
            if ( el.type === 'video' ) {
                if ( el.element != 'iframe' ){
                    this.child = MokaVideo
                    return el.link ? MokaLink : MokaVideo
                } else {
                    this.child = MokaIframe
                    return MokaIframe
                }
            }
            if ( el.type === 'audio' ) {
                this.child = MokaAudio
                return el.link ? MokaLink : MokaAudio
            }
            if ( el.type === 'svg' ){
                this.child = MokaSvg
                return el.link ? MokaLink : MokaSvg
            }
            if ( el.element === 'img' && el.image && el.image.url && el.image.ext != '.svg' && el.image.ext != '.mp4' ) {
                this.child = MokaImg
                return el.link ? MokaLink : MokaImg
            }
            if ( el.tag === 'icon' ){
                this.child = MokaIcon
                return el.link ? MokaLink : MokaIcon
            }
            if ( el.element === 'menu' ){
                return MokaMenu
            }
            if ( el.tag === 'input' && el.type!='button' ){
                return MokaInput
            } 
            if ( el.element === 'textarea' ){
                return MokaTextarea
            }
            if ( (el.element === 'img')  && el.image && el.image.ext === '.svg' ) {
                this.child = MokaSimpleSvg
                return el.link ? MokaLink : MokaSimpleSvg 
            }
        }
    },
    
}
</script>