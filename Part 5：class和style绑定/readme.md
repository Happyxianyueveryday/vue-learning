## Part 5. class与style绑定（类型绑定和样式绑定）

### 1. class绑定（类型绑定）
v-bind指令可以用于绑定html DOM属性和Vue实例属性，这一指令同样常用于绑定class，称为类型绑定，通常使用v-bind:class="xxx"，将当前DOM的class属性和Vue实例属性xxx绑定。

下面提供了一个示例，点击按钮时，DOM的class属性发生变化，从而使得显示样式发生改变。

```
<body>
    <div id="app2">
        <div v-bind:class="divclass">标题</div>
        <button v-on:click="changeClass">点击切换标题的class</button>
    </div>
</body>
    
<script>
    var vm1=new Vue({
        el: "#app2",
        data: {
            divclass: "blackclass",
        },
        methods: {
            changeClass() {
                this.divclass="yellowclass";
            }
        },
    })
</script>

<style>
    .blackclass {     /* 注意css的class选择器以.开头，id选择器以#开头*/
        color: black;
        font-size: 18px;
    }

    .yellowclass {
        color: yellow;
        font-size: 18px;
    }
</style>
```

### 2. style绑定（样式绑定）
v-bind指令还可以进行样式绑定，常见的样式绑定写法风格有如下两种，需要注意在js代码中将html属性的kebab写法转化为camel写法。

+ 绑定到普通属性：在DOM中，使用v-bind:style="{fontSize: value}"；在Vue实例中创建普通属性value: "28px"。
+ 绑定到css结构化属性：在DOM中，使用v-bind:style=

虽然Vue指令的值处可以写入任意关于值的js语句，但是我们仍然在此处不推荐使用过于复杂的表达式，因此实际应用中，第二种写法更为规范。

下面提供了一个示例，使用样式绑定实现点击切换文字颜色。

```
<body>
    <div id="app2">
        <!-- A. class类别绑定机制-->
        <!-- 最常见的class绑定机制就是使用v-bind将DOM的class属性绑定到Vue实例中的一个普通属性或者是计算属性上-->
        <div v-bind:class="classname"></div>
        <button v-on:click="changeClass">点击修改class名</button>
        <p>{{classname}}</p>


        <!-- B. style样式绑定机制-->
        <!-- 1. 使用v-bind将style中的css属性绑定到对应的Vue实例属性上-->
        <h1 v-bind:style="{color: colorstyle, fontSize: fontsize}">标题</h1>

        <!-- 2. 使用v-bind将整个style属性绑定到一个css对象属性上-->
        <h2 v-bind:style="stylebody">标题</h2>
    </div>
</body>

<script>
    var vm1=new Vue({
        el: "#app2",
        data: {
            colorstyle: "yellow",
            fontsize: "18px",
            classname: "initial",

            stylebody: {
                color: "green",
                fontSize: "11px"
            }
        },
        methods: {
            changeClass() {
                this.classname="changed";
            }
        },
    })
</script>
```


