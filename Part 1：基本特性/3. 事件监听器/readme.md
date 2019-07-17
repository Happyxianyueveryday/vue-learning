## 3. 事件监听器

  ### 3.1. Vue事件监听器指令: v-on

  Vue的事件监听器和Android中的事件监听器非常相似。

  在Vue中，需要在一个DOM（html元素）上设置事件监听器，只需要为该DOM增加一个v-on:xx属性即可，':'后的'xx'为具体要监听的事件，例如v-on:click监听一个点击事件。v-on属性的值为事件发生时需要调用的所绑定的Vue对象的成员函数名。
  
  例如，v-on:click="targetFunction"表示为所在的html元素设置一个点击监听器，当该元素被点击时，将调用该html元素所绑定的Vue对象的targetFunction成员函数。
  
  Vue事件监听器的一个简单的示例代码如下，当用户点击按钮时，将输出的信息进行反转。
  
  ```
  <body>
        <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            <p>
                {{message}}
            </p>

            <button v-on:click="reverseMessage">
                点击反转消息
            </button>
        </div>
    </body>

    <script>
        // js代码中对应的Vue对象
        var vm=new Vue({
            el:"#app-1",
            data:{
                message:"Hello, Vue!"
            },
            methods: {
                reverseMessage:function() {
                    this.message=this.message.split('').reverse().join('')    // 和cpp类似，this指向成员方法所在的类的对象
                }
            },
        })
    </script>
  ```
  
  

