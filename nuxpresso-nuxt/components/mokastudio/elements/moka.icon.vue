<template>
    <i :ref="el.id" :class="'material-icons moka-icons ' + $cssResponsive(el.css)">{{el.content}}</i>
</template>
<script>
var gsap
export default {
    name: 'MokaIconElement',
    props: ['el'],
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>