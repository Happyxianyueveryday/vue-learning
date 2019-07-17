  ## 1. 声明式渲染

  Vue的声明式渲染过程是基于标签的，Vue的声明式渲染可以简单分为两个步骤

  ### 步骤1：绑定

  Vue中将html代码段中的一个DOM（可以理解成为一个html元素）和对应的js代码中的相同id的Vue对象绑定起来。
  + 在html元素中用id属性指定id，例如：id="app-1"
  + 在Vue对象中用el成员属性指定id，例如：el: "#app-1"
  需要特别注意，绑定时Vue对象中的id的值前需要加上'#'符号。
  
  例如下面的html代码段和js代码段中，就将Vue对象vm和html元素\<div\>绑定在一起。

  ```
  <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            <p>{{message}}</p>
        </div>
  ```
  
  ```
  // js代码段中的对应Vue对象
  <script>
        var vm=new Vue({
            el:"#app-1"
        })
    </script>
  ```


  ### 步骤2： 渲染

  在绑定过程结束后，Vue对象将其data属性的值传递给html对象，html对象使用双大括号的Mustache语法渲染需要的属性值，例如要显示data中的message字段的值，则在html代码中使用{{message}}代替。
  
  例如下面的代码段，在html页面上显示所绑定Vue对象data属性中的message子属性，Vue的渲染过程是实时和动态的，当Vue对象中的message属性的值发生变换时，html页面所显示的页面也会立即发生变换。
  
  ```
    <!-- html代码段中的DOM/html元素-->
    <body>
        <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            {{message}}
        </div>
    </body>
  ```
    

  ```
    // js代码段中的对应Vue对象
    <script>
        var vm=new Vue({
            el:"#app-1",
            data:{
                message:"Hello, Vue!"
            }
        })
    </script>
  ```
  
