  # 源码阅读笔记

  本部分主要记录一些华为终端移动端实习中接触的Vue项目中学到的项目实践知识，因为华为对内部源码有保密标准，因此本文档中所用的示例一般均为自己写的示例代码，不会涉及到华为的内部源码。
  
  ### 1. 前端和后端的交互
  在大型项目中，一般将和后端交互的代码写在Vuex的action.js中，然后在当前页面的data中创建一个获取数据的变量data，在页面的生命周期钩子$mounted中，使用promise的方法调用action.js中的相应方法获得数据。
  
  ### 2. 前端逻辑层次设计规范（华为）
  在本组件中顺便自上到下介绍一下前端设计的通常使用的四个规范逻辑层:
    1. Popout层：该层用于容纳弹出组件，例如对话框，确认框和弹出菜单。
    2. Mask层：该层用于在屏幕上有弹出组件时，屏蔽所有的其他组件的活动和响应。通常实现该层的最简单方式就是将弹出性的html元素后增加一个半透明黑色图片模板，并在黑色模板上增加点击事件，点击黑色mask可以关闭mask和弹出菜单，并在黑色模板层上加上@touchmove.prevent禁用滚动功能。
    3. Navigation层：该层用于显示始终固定在屏幕某个位置的组件。通常实现该层的最简单方式是通过配置这些组件的css的fixed属性，将这些组件固定在屏幕中。
    4. Content层：用于显示实际内容的组件，会随着用户操作而变化，通常实现该层的最简单方式是通过将Content层的组件设定为Navigation层的嵌套子组件，通过嵌套路由进行切换。
  
  ### 3. vue-cli脚手架项目结构与常用指令
  本处作为入门介绍，主要介绍脚手架项目下的src文件夹，该文件夹的结构如下：  
  
  ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/%E5%8D%8E%E4%B8%BA%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0/QQ%E6%88%AA%E5%9B%BE20190724223120.png)
  
  + asset: 静态资源文件夹
  + components: Vue组件文件夹
  + 
  
  常用的指令包括：
  + $npm install: 安装所有的依赖包，观察到项目中没有node_modules文件夹时首先使用该命令
  + $npm run dev: 构建和执行项目，观察到项目中已经存在node_modules文件夹时首先使用该命令
  
  
  ### 4. Vue单文件组件
  Vue的单文件组件由三个标准部分组成：<template>, <script>和<style>部分组成。
  + <template>中包含该组件的html模板，模板中只能含有一个html元素，且该html元素的id属性必须和当前的Vue组件同名，其他组件使用<组件名>的形式导入当前组件的html模板
  + <script>中包含该组件的Vue定义，其他组件使用import语句导入当前组件的Vue定义
  + <style>中包含该组件的css布局  
  其中关于<script>中组件Vue的定义方法，请参见下面的导出组件部分。
  
  下面是一个非常经典的Vue计数器组件的标准vue-cli组件写法。
  
  ```
  <template>
    <div id="ChildCom">    
        <p>{{count}}</p>
        <button v-on:click="onClickAction">点击增加计数</button>
    </div>
</template>

<script>
export default {
    name: "ChildCom",
    data() {
        return {
            count: 0  
        }
    },
    methods: {
        onClickAction() {
            this.count+=1;  // js的函数this指针总是指向调用该函数的对象，而Vue实例的methods作为实例方法，总是被Vue实例调用
        }  
    },
}
</script>

<style>
</style>
  ```
  
  ### 5. 导出组件: export和export default
  在vue-cli脚手架项目中，通常声明的组件需要进行导出，通常使用export或者export default语句进行导出。export和export default的主要区别在于：
  + 一个vue文件中可以存在多个export语句，但是仅能存在一个export default语句。
  + 导入使用export语句导出的对象时，需要在对象名外加上大括号；而export default的情况则不用。
  + 从某个vue文件导入使用export导出的对象时，不能省略要导入的对象名；而export default的情况则可以省略。
  
  通常在vue-cli的项目结构下，我们推荐一个vue文件中仅存在一个组件，直接使用export default语句进行导出。
  
  ```
  // ./ChildCom.vue
  export default {
    name: "ChildCom",
    data() {
        return {
            count: 0  
        }
    },
    methods: {
        onClickAction() {
            this.count+=1;  // js的函数this指针总是指向调用该函数的对象，而Vue实例的methods作为实例方法，总是被Vue实例调用
        }  
    },
}
  ```
  
  则在其他的组件中需要使用该组件时，只需要使用import语句即可，注意导入使用export语句导出的对象时需要加上大括号。
  ```
  import ChildCom from './ChildCom';
  ```
  
  
  ### 6. 父子组件动态组装
  父子组件的动态组装要求当父组件的数据发生变化时，数据的变化能够自然的传导至子组件，通常使用如下的动态组装进行父子组件的动态组装。
  + 将子组件的props属性在父组件中声明为计算属性。
  + 在html模板中，将父组件的这些计算属性作为html元素的属性值传入子组件中。
  + 完成父子组件的动态组装。
  
  下面提供一个简单的父子组件动态组装示例。
  
  ```
  // 子组件
  <template>
    <div id="ChildCom">
        <p>{{value}}</p>
    </div>
</template>

<script>
export default {
    name: "ChildCom",
    props: {
        value:0    // value作为props所定义的自定义属性
    },
}
</script>

<style>
</style>
  ```
  
  ```
  // 父组件
  <template>
    <div id="FatherCom">
        <!-- 调用子组件ChildCom，该组件的html元素的属性旧对应于props-->
        <ChildCom v-bind:value="fullName"></ChildCom>    <!-- 注意动态绑定html属性必须使用v-bind指令-->
    </div>
</template>

<script>
import ChildCom from './ChildCom';

export default {
    name: "FatherCom",
    data() {
        return {
            firstName: "Mary",
            secondName: "Annie"
        }
    },
    components: {
        ChildCom
    },
    computed: {
        fullName() {  // 计算属性getter
            return this.firstName+" "+this.secondName;
        }
    },
}
</script>

<style>
</style>
  ```
  
  ### 7. 全局状态管理模式——Vuex简单快速入门
  
  
  ### 8. 子组件到父组件的事件流——$emit方法
  在Vue中，从父组件到子组件的数据传递通过props实现，也就是存在从父组件到子组件的数据流，但是不存在
  
  ### 9. 
  
  
  ### 附录：其他组件化的注意事项与问题
  
  (1) 为什么Vue组件的data属性必须将初始值以return语句形式返回？
  
  
  
  
