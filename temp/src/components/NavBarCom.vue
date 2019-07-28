<!-- NavbarCom: 顶部导航栏和底部导航栏组件 -->

<template>
    <div id="NavBarCom">
        <!-- 1. 顶部导航栏组件--> 
        <div id="TopBarPart">
            <h1 style="text-align:center;">{{nowButtonText}}</h1>
        </div>

        <!-- 2. 页面内容组件-->
        <div id="SliderPart">
            <router-view></router-view>
        </div>

        <!-- 3. 导航栏组件-->
        <div id="NavBarPart" class="weui-tabbar">  
            <a id="firstNav" v-on:click="firstClick" href="javascript:;" class="weui-tabbar__item">
                <img v-bind:src="onFirst?firstButtonImgClicked:firstButtonImg" style="width:48px; height:48px" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">{{firstButtonText}}</p>
            </a>
            <a id="secondNav" v-on:click="secondClick" href="javascript:;" class="weui-tabbar__item">
                <img v-bind:src="onSecond?secondButtonImgClicked:secondButtonImg" style="width:48px; height:48px" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">{{secondButtonText}}</p>
            </a>
            <a id="thirdNav" v-on:click="thirdClick" href="javascript:;" class="weui-tabbar__item">
                <img v-bind:src="onThird?thirdButtonImgClicked:thirdButtonImg" style="width:48px; height:48px" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">{{thirdButtonText}}</p>
            </a>
            <a id="fourthNav" v-on:click="fourthClick" href="javascript:;" class="weui-tabbar__item">
                <img v-bind:src="onFourth?fourthButtonImgClicked:fourthButtonImg" style="width:48px; height:48px" alt="" class="weui-tabbar__icon">
                <p class="weui-tabbar__label">{{fourthButtonText}}</p>
            </a>
        </div>
    </div>
</template>


<script>
import HorizontalSlider from './HorizontalSlider';
export default {
    name: "NavBarCom",
    data() {
        return {
            // 本组件为整个项目的根组件，故这里直接将参数固定
            onFirst: true,
            onSecond: false,
            onThird: false,
            onFourth: false,
            
            // 导航栏按钮文本
            firstButtonText: "要闻",
            secondButtonText: "推荐",
            thirdButtonText: "动态", 
            fourthButtonText: "我",

            // 导航栏按钮图像url
            firstButtonImg: "./../../static/icon_news.png",
            firstButtonImgClicked: "./../../static/icon_news_clicked.png",
            secondButtonImg: "./../../static/icon_recommend.png",
            secondButtonImgClicked: "./../../static/icon_recommend_clicked.png",
            thirdButtonImg: "./../../static/icon_dongtai.png",
            thirdButtonImgClicked: "./../../static/icon_dongtai_clicked.png",
            fourthButtonImg: "./../../static/icon_me.png",
            fourthButtonImgClicked: "./../../static/icon_me_clicked.png",

            // 导航栏按钮路由地址
            firstButtonUrl: "/navigation/news",
            secondButtonUrl: "/navigation/recommend",
            thirdButtonUrl: "/navigation/track",
            fourthButtonUrl: "/navigation/me"
        }
    },
    components: {
    },
    methods: {
        firstClick() {
            this.onFirst=true;
            this.onSecond=false;
            this.onThird=false;
            this.onFourth=false;
            this.$router.push(this.firstButtonUrl);
        },

        secondClick() {
            this.onFirst=false;
            this.onSecond=true;
            this.onThird=false;
            this.onFourth=false;
            this.$router.push(this.secondButtonUrl);
        },

        thirdClick() {
            this.onFirst=false;
            this.onSecond=false;
            this.onThird=true;
            this.onFourth=false;
            this.$router.push(this.thirdButtonUrl);
        },

        fourthClick() {
            this.onFirst=false;
            this.onSecond=false;
            this.onThird=false;
            this.onFourth=true;
            this.$router.push(this.fourthButtonUrl);
        }
    },
    computed: {
        nowButtonText() {
            if(this.onFirst)
            return this.firstButtonText;
            else if(this.onSecond)
            return this.secondButtonText;
            else if(this.onThird)
            return this.thirdButtonText;
            else if(this.onFourth)
            return this.fourthButtonText;
        }
    }
}
</script>

<style scoped>
#TopBarPart {
    width: 100%;       /* 顶部导航栏占满屏幕宽度*/
    height: 7%;        /* 顶部导航栏占屏幕高度7%*/
    position: fixed;   /* 底部导航栏位置设置为相对于浏览器固定*/
    top: 0;            /* 顶部导航栏显示在最顶端，距离上边缘距离为0px*/
    background: #1296db;  /* 顶部导航栏颜色*/ 
    color: white;     /* 导航栏字体颜色*/
    opacity: 0.8;      /* 顶部导航栏色彩透明度*/
}

#SliderPart {
    position: absolute;   /* 横向滚动栏使用绝对定位，绝对定位使用top, bottom, left, right四个属性进行定位*/
    top: 7%;              /* 由于顶部导航栏占高度7%，因此横向滚动栏距离顶部7%*/
}

#NavBarPart {
    width: 100%;       /* 底部导航栏占满屏幕宽度*/
    position: fixed;   /* 底部导航栏位置设置为相对于浏览器固定*/
    bottom: 0;         /* 底部导航栏显示在最底端，距离下边缘距离为0px*/
}
</style>
