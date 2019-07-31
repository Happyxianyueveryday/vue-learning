<!-- AriticalView: 微博内容阅读器组件-->
<template>
    <article class="weui-article">
        <h1>{{artical.title}}</h1>
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
    </article>
</template> 

<script>
export default {
    name: "ArticalCom", 
    computed: {
        // artical: 根据跳转路径参数也即文章的唯一标识index，从后端api中获取微博文章内容
        artical() {
            // 从参数中获取微博的id，根据id访问后端api获取文章内容
            let id=this.$route.params.id;
            let art={
                title: "标题",
                subtitle: "子标题",
                summary: "摘要",
                content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                imgsrc: "./../../static/icon_news.png",
            };

            // 返回从后端api得到的文章
            return art;
        },

        //thumbcount: 根据跳转路径参数也即文章的唯一标识index，从后端api中获取微博文章的点赞数量
        thumbcount() {

        }
    }
}
</script>
