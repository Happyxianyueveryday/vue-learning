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
  
  
  ### 2.2 生命周期钩子函数的一般用途。
  
  
  
  ### 2.3 生命周期钩子详细示例
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
  
  + beforeCreate(): 这时Vue实例尚未创建，因此实例中的属性均为空。
  ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234022.png)
  
  + created(): 这时Vue实例创建完成，实例中除了el属性，其他属性均已经与对应的数据绑定，并开始监听数据的变化。
  ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234034.png)
  
  + beforeMount(): 这时el属性已经与对应的DOM绑定，但是尚未将数据进行挂载。（挂载指的是使用vm.$data.message的真实值代替{{message}}）
  ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234047.png)
  
  + mounted(): 这时数据已经挂载。
   ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234103.png)
  
  + beforeUpdate():
   ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234103.png)
  
  + updated():
   ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/Part%202%EF%BC%9AVue%E5%AE%9E%E4%BE%8B/2.%20%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E4%B8%8E%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%87%BD%E6%95%B0/%E6%88%AA%E5%9B%BE%E6%96%87%E4%BB%B6/QQ%E6%88%AA%E5%9B%BE20190719234158.png)
   
  
  
  
  
  
  
  
