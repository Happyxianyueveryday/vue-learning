  ## 4. 双向绑定

  ### 1. Vue双向绑定: v-model指令
  
  Vue的双向绑定是指将DOM（html元素）绑定到Vue对象的同时，也将Vue对象绑定到对应的DOM上。两者中任何一个的值发生变换，另外一个的值也随之变化。
  
  具体而言，使用指令v-model指令作为html元素的一个属性来进行绑定，例如指令：v-model="message"将所在的html元素和对应Vue对象data中的message子属性进行绑定，当两者中任意一个的值发生变换，另外一个也随之变化。
  
  + 附注：Vue的单向绑定和双向绑定对比：在Vue中的声明式渲染中，只需要将
  
  例如，下面的Vue实例代码将ntml按钮元素，输入文本框元素和Vue对象data中的message子属性进行绑定，当输入文本框元素或者Vue对象中的属性发生变化（可通过控制台实现）时，所双向绑定的对象也发生变化。
  
  ```
  <body>
        <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            <input v-model="message"><input>
            <p>{{message}}</p>
            <button>{{message}}</button>
        </div>
    </body>

    <script>
        // js代码中对应的Vue对象
        var vm=new Vue({
            el:"#app-1",
            data:{
                message:"Hello, Vue!"
            },
        })
    </script>
  ```
  
  
