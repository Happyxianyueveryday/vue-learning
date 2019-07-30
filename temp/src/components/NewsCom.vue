<!-- 基本组件: NewsCom，新闻导航首页-->
<!-- html5的默认实现中总是会将所有的列表项目一并载入，在实际的新闻客户端中这样的实现需要耗费大量的资源，在实际应用上时不可能的-->
<!-- 因此这里实现的滚动列表的策略如下：

-->

<template>
    <div id="NewsCom">
        <div class="weui-panel weui-panel_access" v-for="element in list_all" v-bind:key="element.index">
            <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
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
                <div class="weui-cell__bd">加载更多</div>
                <span class="weui-cell__ft"></span>
            </a>    
        </div>
    </div>
</template>

<script>
export default {
    name: "NewsCom",
    data() {
        return {
            list_all: [
                {index: 1, title:"标题1", summary:"简介1", img:"./../../static/icon_news.png"},
                {index: 2, title:"标题2", summary:"简介2", img:"./../../static/icon_news.png"},
                {index: 3, title:"标题3", summary:"简介3", img:"./../../static/icon_news.png"},
                {index: 4, title:"标题4", summary:"简介4", img:"./../../static/icon_news.png"},
                {index: 5, title:"标题5", summary:"简介5", img:"./../../static/icon_news.png"},
                {index: 6, title:"标题6", summary:"简介6", img:"./../../static/icon_news.png"},
                {index: 7, title:"标题7", summary:"简介7", img:"./../../static/icon_news.png"},
                {index: 8, title:"标题8", summary:"简介8", img:"./../../static/icon_news.png"},
                {index: 9, title:"标题9", summary:"简介9", img:"./../../static/icon_news.png"},
                {index: 10, title:"标题10", summary:"简介10", img:"./../../static/icon_news.png"},
                {index: 11, title:"标题11", summary:"简介11", img:"./../../static/icon_news.png"},
                {index: 12, title:"标题12", summary:"简介12", img:"./../../static/icon_news.png"},
                {index: 13, title:"标题13", summary:"简介13", img:"./../../static/icon_news.png"},
            ],
        }
    },
} 
</script>

<style>
#NewsCom {
    width: 100%
}
</style> 
