## Part 6: 条件渲染

### 1. 条件渲染主要指令: v-if/v-else-if/v-else
条件渲染主要的指令包括v-if，v-else-if，v-else，其中三个指令的值都可以是任意的关于值的js表达式，若js表达式的值为真，则显示绑定的DOM，否则不显示绑定的DOM。

一个简单的例子如下，根据Vue实例属性flag的值来决定显示哪部分内容。

```
<body>
    <div id="app1">
        <!-- 1. 最主要的条件渲染表达式就是: v-if，v-else-if和v-else，这三个Vue指令的值可以是关于值的任意js表达式--->
        <div v-if="flag===1">
            <p>变量flag的值为1</p>
        </div>

        <div v-else-if="flag===2">
            <p>变量flag的值为2</p>
        </div>

        <div v-else-if="flag===3">   <!-- ===为严格相等，禁止类型转换-->
            <p>变量flag的值为3</p>
        </div>

        <div v-else>   
            <p>变量flag的值为除了1，2，3外的其他值</p>
        </div>
    </div>
</body>

<script>
    var vm=new Vue({
        el: "#app1",
        data: {
            flag: 6,
        }
    });
</script>
```


### 2. 条件渲染中的复用机制
在Vue的条件渲染中，当条件渲染所绑定的Vue实例属性发生变化时，只会重新渲染变化前后有改变的DOM，对于没有改变的DOM则会直接复用。这是通过虚拟DOM树中，比较渲染前后的DOM组件成员来实现的。

下面提供一个简单的例子，在属性值改变后，只有实际改变的部分进行了重新渲染，其余组件均是直接进行复用的。

```
<body>
    <!-- 例如在下面的例子中，点击button后，只有<p>进行了重新渲染，其他的<img>，<button>等组件都会复用原来点击前的组件-->
    <div id="app2">
        <div v-if="flag==1">
            <img src="https://cn.vuejs.org/images/logo.png">
            <p>变量flag的值为1</p>
            <button v-on:click="change">点击逆转flag的值</button>
        </div>
        <div v-else>
            <img src="https://cn.vuejs.org/images/logo.png">
            <p> 变量flag的值不为1</p>
            <button v-on:click="change">点击逆转flag的值</button>
        </div>
    </div>
</body>

<script>
    var vm=new Vue({
        el: "#app2",
        data: {
            flag:1,
        },
        methods: {
            change() {
                this.flag=!this.flag;
            }
        },
    })
</script>
```

#### 3. v-if和v-show指令对比
v-show指令同样可以用于控制组件的显示和隐藏，而且使用方法基本和v-if一致，但是区别在于v-if指令在显示时会重新渲染一遍所修饰的DOM，在隐藏时会销毁DOM。但是v-show指令仅仅是通过修改所修饰的DOM的css中的可见属性来改变DOM的显示或者隐藏状态。  
因此对于各个不同需求的组件，需要仔细考虑是否需要在切换可见状态时进行重新渲染，以达到最佳的性能。


