  ## 1. 实例属性与方法

  ### 1.1 Vue实例属性
  Vue的实例属性就是Vue对象中的一级成员，例如data，el，methods等。在js代码中，如果要访问实例属性，通常在对应的属性名前加上"$"，例如假设Vue的实例/对象名为vm，则通过vm.$data访问该实例的data属性，通过vm.$el访问该实例的el属性。
  
  + 附注：在html代码段中不能通过上述的方法访问Vue对象成员，因为Vue的声明式渲染机制只是将data属性的值传递给了html中所绑定的DOM，不会将el等其他成员传递给html模板中的DOM。
  
  ```
    <body>
        <div id="app-1"></div>
    </body>

    <script>
        var app1=new Vue({
            el:"#app-1",
            data:{
                message:"这是一条信息"
            }
        });

        // 实例属性vm.$data和vm.$el
        console.log(app1.$data);
        console.log(app1.$el);
    </script>
  ```
  
  
  ### 1.2 Vue实例方法
  Vue的实例方法较多，且用法不像实例属性一样统一，因此需要使用时通常建议直接查阅官方文档。
  
  下面以vm.$watch为例介绍下实例方法的使用过程。vm.$watch(
  
  
  
  
