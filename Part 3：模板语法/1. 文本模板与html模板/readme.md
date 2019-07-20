## 1. 文本模板与html模板

## 1.1 文本模板
Vue中的文本模板使用标准的Mustache语法，即用双大括号将属性框起，作为挂载时的模板占位符。例如要在DOM中输出vm.$data.message，则对应在html模板中的语法是: {{message}}。
如下的代码就是一个简单的文本模板语法的示例。

```
<body>
        <div id="app-1">
            <p>{{message}}</p>
        </div>
    </body>

    <script>
        var vm=new Vue({
            el:"#app-1",
            data:{
                message:"这是一条消息"
            }
        })
    </script>
```

## 1.2 html模板: v-html指令
如果需要显示Vue实例中data属性下的html代码字符串字段，则不能使用Mustache语法，而需要使用v-html指令，该指令同样作为html元素中的一个参数，参数的值就是Vue实例data属性中html代码段所在的字段的键名。

如下的代码提供了一个简单的html模板的示例。
```
 <body>
        <div id="app-2">
            <p v-html="htmlcode"></p>
        </div>
    </body>

    <script>
        var vm2=new Vue({
            el:"#app-2",
            data:{
                message:"这是一条消息",
                htmlcode:"<button>这是一个按钮</button>"
            }
        })
    </script>
```



## 1.3 html特性的处理



