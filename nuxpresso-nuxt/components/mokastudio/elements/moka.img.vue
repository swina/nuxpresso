<template>
    <!-- <img v-if="el.image" :src="el.image.url" :class="$cssResponsive(el.css)"/> -->
    <img v-if="el.image" :ref="el.id" :src="$imageURL(el.image)" :caption="el.image.caption||el.image.name" :alt="el.image.alternativeText||el.image.name" :title="el.image.name.split('.')[0]" :class="$cssResponsive(el.css)"/>
    <!--<div>{{ el }}</div>-->
</template>

<script>
var gsap
export default {
    name: 'MokaImgElement',
    props: ['el'],
    mounted(){
        gsap = this.$animation(this.el,this.el.id,this.$refs)
    },
    beforeDestroy(){
        if ( gsap ) gsap.timeline().kill()
    }
}
</script>