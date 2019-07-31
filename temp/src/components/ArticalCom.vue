<!-- AriticalView: 微博内容阅读器组件-->
<template>
    <article class="weui-article">
        <div id="title">
            <h1>{{artical.title}}</h1>
        </div>

        <div id="section">
            <section>
                <h2 class="title">{{artical.author}}</h2>
                <section>
                    <h3>{{artical.summary}}</h3>
                    <p>
                        {{artical.content}}
                    </p>
                    <p>
                        <img v-bind:src="artical.imgsrc" alt="">
                    </p>
                </section>
            </section>
        </div> 

        <div id="btndiv" v-on:click="changeActionFlag">
            <img src="./../../static/ellipsis.png" style="width:48px; height:48px;">
        </div>

        <div id="actionlist" v-if="actionflag">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" v-on:click="thumb">点赞({{artical.thumbcount}})</div>
                <div class="weui-actionsheet__cell" v-on:click="forward">转发({{artical.forwardcount}})</div>
                <div class="weui-actionsheet__cell" v-on:click="comment">评论({{artical.commentcount}})</div>
                <div class="weui-actionsheet__cell" v-on:click="follow">关注作者</div>
            </div>
        </div>
    </article>
</template> 

<script>
export default {
    name: "ArticalCom",
    data() {
        return {
            actionflag: false,
        }
    },
    computed: {
        // artical: 根据跳转路径参数也即文章的唯一标识index，从后端api中获取微博文章内容对象。
        // note: 本方法需要在后端搭建完成后进行重写，从后端提供的api中获取数据
        artical() {
            // 从参数中获取微博的id，根据id访问后端api获取文章内容
            let id=this.$route.params.id;
            let art={                 // 微博的数据库表结构
                id: 1,                // 微博id
                title: "标题",        // 微博标题
                author: "作者",       // 微博作者
                tag: "标签",          // 微博类别标签
                summary: "摘要",      // 微博摘要
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                imgsrc: "./../../static/ads/ad2.jpg",    // 微博配图链接
                thumbcount: 10,       // 微博点赞数量
                forwardcount:10,      // 微博转发数量
                commentcount:10,      // 微博评论数量
                comments:[],          // 微博评论
            };

            // 返回从后端api得到的文章
            return art;
        },
    },
    methods: {
        // thumb: 处理用户点赞微博的操作
        // note: 本方法需要在后端搭建完成后进行重写，从后端提供的api中提交点赞操作
        thumb() {
             
        },

        // follow: 处理用户关注微博作者的操作
        // note: 本方法需要在后端搭建完成后进行重写，从后端提供的api中提交关注操作
        follow() {

        },

        // comment: 处理用户评论微博的操作
        // note: 本方法需要在后端搭建完成后进行重写，从后端提供的api中提交评论操作
        comment() {
            
        },

        // forward： 处理用户转发微博的操作
        // note: 本方法需要在后端搭建完成后进行重写，从后端提供的api中提交转发操作
        forward() {

        },

        // changeActionFlag: 显示选项菜单
        changeActionFlag() {
            this.actionflag=!this.actionflag;
            console.log("!!!");
        }
    }
}
</script>

<style>
</style>
