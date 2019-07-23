  # Part 3. 模板语法

  ## 1. 文本渲染
  Vue中的文本渲染使用双大括号的mustache语法，在html模板中使用双括号括起要渲染的Vue实例文本属性名，从而进行文本渲染。
  
  需要特别说明的是，大括号内还可以是任意关于值的js语句（关于值的js语句就是执行后可以得到一个值的语句）。
  
  ```
  <div id="app-1">
    <p>{{message1+message2}}</p>
  </div>

  <script>
    var vm=new Vue({
      el:"#app-1",
      data:{
          message1:"这是",
          message2:"一个信息"
       }
    })
  </script>
  ```

  ## 2. html渲染
  Vue中对html代码的渲染不能使用mustache语法，而是必须使用v-html指令，v-html指令作为DOM的一个属性，属性值就是要渲染的Vue实例属性名。
  
  需要特别说明的是，v-html指令的值还可以是任意关于值的js语句。
 
  
  ```
  <div id="app-2">
    <p v-html="htmlcode1+htmlcode2"></p>
</div>

<script>
    var app2=new Vue({
        el:"#app-2",
        data:{
            htmlcode1:"<button>这是一个按钮</button>",
            htmlcode2:"<button>这是一个按钮</button>"
        }
    })
</script>
  ```

  ## 3. 绑定到html元素属性
  首先介绍Vue指令的一般形式，即: v-xxx:yyy="zzz"，其中v-前缀表示这不是普通DOM属性，而是Vue指令；xxx为指令名；yyy为该指令接受的参数；zzz为该指令的值。
  要将Vue实例中的某个属性和DOM元素的某个属性绑定，必须使用v-bind指令，v-bind指令的参数为要绑定的DOM的属性，v-bind指令的值为要绑定的Vue实例属性。
  
  ```
  ```

  ## 4. html元素的监听器

