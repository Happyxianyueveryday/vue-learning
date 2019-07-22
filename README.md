# vue-learning

Vue入门学习代码，以熟悉基本特性为主。

<!DOCTYPE html>

<html>
    <head>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    </head>

    <body>
        <!-- 1. 文本挂载: mustache语法-->
        <div id="app-1">
            <p>{{message}}</p>
            <p>{{message+"的补充说明"}}</p>   <!-- mustache语法的大括号中接受任意的计算得到值的js代码语句-->
        </div>

        <!-- 2. html代码挂载: v-html指令-->
        <div id="app-2">
            <p v-html="htmlcode"></p>
        </div>

        <!-- 3. 将Vue对象的属性值绑定到html属性值: v-bind指令-->
        <!-- 注意html元素的属性绑定到Vue实例中对应的值时，不能使用mustache，而是需要使用v-bind指令，v-bind指令的参数是需要绑定的html元素属性，值是一个任意的关于值的js表达式-->
        <div id="app-3">
            <a v-bind:href="httphead+httpbody">这是一个链接</a>      <!-- v-bind:href="httphead+httpbody", 其中href就是指令参数，"httphead+httpbody"是一个计算得到值的表达式，称为关于值的js表达式，该指令的值就是任意的关于值的js表达式-->
            <a :href="httphead+httpbody">这是一个链接</a>            <!-- v-bind指令缩写形式，缩写成冒号:-->
        </div>

        <!-- 4. 为html元素设置监听器: v-on指令-->
        <div id="app-4">
            <p>{{message}}</p>
            <button v-on:click="onClickButton">点击反转消息</button>
            <button @click="onClickButton">点击反转消息</button>   <!-- v-on指令缩写形式，缩写成@符号-->
        </div>
    </body>

    <script>
        var app1=new Vue({
            el:"#app-1",
            data:{
                message:"这是一条消息"
            } 
        });

        var app2=new Vue({
            el:"#app-2",
            data:{
                htmlcode:"<button>这是一个按钮</button>"
            }
        })

        var app3=new Vue({
            el:"#app-3",
            data:{
                httphead:"http://",
                httpbody:"www.w3school.com.cn/"
            }
        })

        var app4=new Vue({
            el:"#app-4",
            data:{
                message:"这是一条消息",
            },
            methods: {
                onClickButton() {
                    this.message=this.message.split('').reverse().join('');
                }
            },
        })
    </script>
</html>
