<!-- 基本组件: HomeCom，应用起始界面-->
<!-- 应用起始界面仅仅显示关于应用logo的一幅图片，在3s后自动跳转到应用主页'/news'-->
<!-- Vue中的定时器一般使用setInterval或者setTimeout进行定时任务，setInterval每过一段指定的时间执行指定的函数，setTimeout从页面启动开始过一段时间后执行一次某个任务-->

<template>
    <div id="HomeCom">
        <!-- 1. 上方3/4区域: 广告区域-->
        <div id="adPart" style="height:85%; width: 100%; position:fixed; top:0;">
            <img v-bind:src="adsrc">
        </div>
        <!-- 2. 下方1/4区域: 应用logo区域和跳转按钮-->
        <div id="logoPart" style="height:15%; width:100%; position:fixed; bottom:0; background-color:white;"> 
            
            <div style="height:5%; width:15%; position:fixed; bottom:5%; right:5%">  <!--附注:bottom计算方法，因为logo区域的高度为15%而按钮高度为5%，因此距离底部的距离为(15%-5%)/2=5%-->
                <img src="./../../static/jump_ad.png" v-on:click="onclick" style="width:40px; height:40px">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomeCom",
    methods: {
        onclick() {    // 处理按钮点击事件
            this.$router.push('/navigation/news');
        },

        jump() {       // 跳转至应用的真正主页'/navigation/news'
            this.$router.push('/navigation/news');
        }
    },
    computed: {
        adsrc() {       // 计算属性，随机选择一个预先确定的广告图片显示
            // 所有广告图片的路径和对应的网址都放在static下的
        }
    },

    // mounted: 生命周期钩子函数
    // note 1: 因为要实现的功能是在欢迎页面启动2秒后跳转至应用主页
    // note 2: 因此开始计时的时刻必须是页面挂载(挂载就是把Vue实例完成后，因此开始设定定时器必须是在mounted这个钩子函数里
    mounted() {
        setTimeout(this.jump, 3000);    // mounted钩子函数开始执行3s后，从欢迎页面切换到主页面
    }
} 
</script>
