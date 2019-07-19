  ## 2. 实例生命周期和生命周期函数
  
  ### 2.1 生命周期和生命周期函数详解
  Vue的生命周期函数有beforeCreate()和created()，beforeMount()和mounted()，beforeUpdate()和updated()，beforeDestroy()和destroyed()总共四组，这四组生命周期钩子函数都是Vue实例的成员方法。
  这四组生命周期函数与Vue实例的生命周期的关系如下图。
  
  ![avatar](https://cn.vuejs.org/images/lifecycle.png)
  
  结合上图详细解释，这四对生命周期钩子函数在调用之间的情况为：
  + beforeCreate()和created(): 在此之间，初始化Vue实例中除了el属性之外的所有其他属性，并开始监控Vue实例中data属性的变化。
  + beforeMount()和mounted(): 在此之间，首先将Vue实例的el属性和对应的DOM元素绑定，最后将对应的属性值进行挂载到DOM元素上（挂载即将对应的数据替换原来的双大括号占位符）。
  + beforeUpdate()和updated(): 在此之间，将Vue实例中发生变化和更新的数据重新挂载到对应的DOM元素上。（即重新渲染DOM以更新显示的数据）
  + beforeDestroy()和destroyed(): 在此之间，完成Vue实例的销毁工作，同时销毁该Vue实例的所有子实例，最后拆除该实例的所有监听器。
  
  
  ### 2.2 生命周期钩子详细示例
  下面以一个示例来详细解释各个生命周期钩子发生的时间，该示例的核心源代码为：
  
  ```
  <body>
        <div id="app-1">
            {{message}}
        </div>
    </body>

    <script>
        var vm=new Vue({
            el:"#app-1",

            data:{
                message:"这是一条通知信息"
            },

            beforeCreate() {
                console.log("beforeCreate: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            created() {
                console.log("created: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            beforeMount() {
                console.log("beforeMount: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            mounted() {
                console.log("mounted: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            beforeUpdate() {
                console.log("beforeUpdate: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            updated() {
                console.log("updated: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            beforeDestroy() {
                console.log("beforeDestory: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },

            destroyed() {
                console.log("destoryed: \n");
                console.log("el = ", this.$el);
                console.log("data = ", this.$data);
                console.log("");
            },
        })
    </script>
  ```
  
  运行上述代码，可见的结果是：
  
  
  
  
  
  
