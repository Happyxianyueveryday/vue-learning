<!-- 基本组件: NewsCom，新闻导航首页-->
<!-- html5的默认实现中总是会将所有的列表项目一并载入，在实际的新闻客户端中这样的实现需要耗费大量的资源，在实际应用上时不可能的-->
<!-- 因此这里实现的滚动列表的策略如下：

-->

<template>
    <div id="NewsCom">
        <div class="weui-panel weui-panel_access" v-for="element in newslist" v-bind:key="element.index">
            <div class="weui-panel__bd">
                <a v-on:click="reader(element.index)" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" v-bind:src="element.img" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">{{element.title}}</h4>
                        <p class="weui-media-box__desc">{{element.summary}}</p>
                    </div>
                </a>
            </div>
        </div>
        <div class="weui-panel__ft">
            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                <div class="weui-cell__bd" v-on:click="getMoreData">加载更多</div>
                <span class="weui-cell__ft"></span>
            </a>    
        </div>
    </div>
</template>

<script>
export default {
    name: "NewsCom",
    data() {
        // newslist: 从后端获取初始的微博文章标题滑动列表
        // note: 在后端完成后，需要重写此属性，根据微博的类别this.$route.params.title从后端获取初始的若干个数据
        return {
            newslist: [
                {index: 1, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},    // index为微博的唯一id
                {index: 2, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 3, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 4, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 5, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 6, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 7, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 8, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
            ],
        }
    },
    methods: {
        // getMoreData: 点击加载更多按钮时从后端api请求更多的微博文章标题等
        // note: 在后端完成后，需要重写该方法，根据微博的类别this.$route.params.title从后端获取数据
        getMoreData() {
            let i=0;
            for(i=0;i<5;i++)
            {
                this.newslist.push({index: 9, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"});
            }
        },

        // reader: 点击滑动列表中的微博文章标题时，跳转到阅读器，展示微博的具体内容
        reader(index) {
            this.$router.push('/artical/'+index);   // 用户点击文章内容时，直接进行全屏组件跳转，将微博的唯一标识index作为参数传递给微博阅读器组件ArticalCom
        } 
    }
} 
</script>

<style>
#NewsCom {
    width: 100%
}
</style>
