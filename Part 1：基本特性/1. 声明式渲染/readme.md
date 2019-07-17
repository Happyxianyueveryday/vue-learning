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
  <script>
        var vm=new Vue({
            el:"#app-1"
        })
    </script>
  ```


  ### 步骤2： 挂载

  在绑定过程结束后，Vue将
