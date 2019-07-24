  # 源码阅读笔记

  本部分主要记录一些华为终端移动端实习中接触的Vue项目中学到的项目实践知识，因为华为对内部源码有保密标准，因此本文档中所用的示例一般均为自己写的示例代码，不会涉及到华为的内部源码。
  
  ### 1. vue-cli脚手架项目结构与常用指令
  本处作为入门介绍，主要介绍脚手架项目下的src文件夹，该文件夹的结构如下：
  ![avatar](https://raw.githubusercontent.com/Happyxianyueveryday/vue-learning/master/%E5%8D%8E%E4%B8%BA%E6%BA%90%E7%A0%81%E9%98%85%E8%AF%BB%E7%AC%94%E8%AE%B0/QQ%E6%88%AA%E5%9B%BE20190724223120.png)
  
  + asset: 静态资源文件夹
  + components: Vue组件文件夹
  + 
  
  常用的指令包括：
  + $npm install: 安装所有的依赖包，观察到项目中没有node_modules文件夹时首先使用该命令
  + $npm install 
  
  
  ### 2. Vue单文件组件
  Vue的单文件组件由三个标准部分组成：<template>, <script>和<style>部分组成。
  + <template>中包含该组件的html模板，其他组件使用<组件名>的形式导入当前组件的html模板
  + <script>中包含该组件的Vue定义，其他组件使用import语句导入当前组件的Vue定义
  + <style>中包含该组件的css布局
  其中关于<script>中组件Vue的定义方法，请参见下面的导出组件部分。
  
  下面是一个非常经典的Vue计数器组件的标准vue-cli组件写法。
  
  ```
  ```
  
  ### 3. 导出组件: export和export default
  在vue-cli脚手架项目中，通常声明的组件需要进行导出，通常使用export或者export default语句进行导出。export和export default的主要区别在于：
  + 一个vue文件中可以存在多个export语句，但是仅能存在一个export default语句。
  + 导入使用export语句导出的对象时，需要在对象名外加上大括号；而export default的情况则不用。
  + 从某个vue文件导入使用export导出的对象时，不能省略要导入的对象名；而export default的情况则可以省略。
  
  通常在vue-cli的项目结构下，我们推荐一个vue文件中仅存在一个组件，直接使用export default语句进行导出。
  
  ```
  
  ```
  
  则在其他的组件中需要使用该组件时，只需要使用import语句即可，注意导入使用export语句导出的对象时需要加上大括号。
  ```
  ```
  
  
  ### 4. 父子组件动态组装
  父子组件的动态组装要求当父组件的数据发生变化时，数据的变化能够自然的传导至子组件，通常使用如下的动态组装进行父子组件的动态组装。
  + 将子组件的props属性在父组件中声明为计算属性。
  + 在html模板中，将父组件的这些计算属性作为html元素的属性值传入子组件中。
  + 完成父子组件的动态组装。
  
  下面提供一个简单的计数器示例，其中子组件通过props获取父组件的消息，然后显示获取的消息，当点击父组件的按钮反转消息后，子组件显示的消息也随之反转。
  
  
  
  
  
  ### 5. 全局状态管理模式——Vuex简单快速入门
  
  
  ### 6. 子组件到父组件的事件流——$emit方法
  
  ### 7. 
  
  
  ### 附录：其他组件化的注意事项与问题
  
  (1) 为什么Vue组件的data属性必须将初始值以return语句形式返回？
  
  
  
  
