<template>
<button id="myBtn" @click="handleRemote">
    <i class="fa fa-arrow-up" style="font-weight : bold; font-size: 20px"></i>
</button>
<div id="loading"> 
    <img id="loading-image" src="@/assets/images/loader.svg" alt="Loading..." /> 
</div>
<Header />
<transition name="fade" mode="out-in">
    <keep-alive>
        <slot />
    </keep-alive>
</transition>
<Footer />
</template>

<script>
import Footer from '../components/footer/Footer.vue'
import Header from '../components/header/Header.vue'
import $ from 'jquery'

export default {
    data() {
        return {
            API: 'https://segici.fyle-group.com/js/main.js',
            swiperJs: 'https://segici.fyle-group.com/js/swiper.js',
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        handleRemote() {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        scrollFunction() {
            let mybutton = document.getElementById('myBtn');
            // alert(document.body.scrollTop)
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "flex";
            } else {
                mybutton.style.display = "none";
            }
        },
        myMethod() {
            // alert ('Method')
            window.addEventListener('touchmove', this.scrollFunction)
            window.addEventListener('scroll', this.scrollFunction)
        }
    },
    mounted() {
        window.scrollTo({top: 0,left: 0,behavior: 'smooth'})

        // this.$loadScript('https://code.jquery.com/jquery-2.2.4.js').then(() => {
        //     this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.0.0-beta.2.4/owl.carousel.js').then(() => {
        //         this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js').then(() => {
        //             this.$loadScript('https://unpkg.com/swiper/swiper-bundle.js');
        //             this.$loadScript('https://unpkg.com/aos@2.3.1/dist/aos.js');
        //             this.$loadScript('https://unpkg.com/swiper/swiper-bundle.min.js').then(() => {
        //                 // this.$loadScript(this.swiperJs);
        //             })

        //             this.$loadScript('https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js');
        //             this.$loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js')
        //             // this.$loadScript(this.API);
        //         })
        //     })
        // }).catch((e) => {
        //     console.log(e)
        // });

        setTimeout(() => {
           $('#loading').hide ();
        }, 500);

        // $(window).load(function () {
            // $('#loading').hide ();
        // });

        this.myMethod()
        
    }

}
</script>

<style>

</style>
