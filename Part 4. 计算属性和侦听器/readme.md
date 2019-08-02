## Part 4. 计算属性和侦听器

### 1. 计算属性的基本概念
计算属性在Vue实例中，均声明在computed属性中，计算属性一般用于返回需要复杂处理才能得到的变量或数据。

每个计算属性都存在一个getter和一个setter方法，其中getter是必须的，setter仅当需要直接修改计算属性时才需要提供。具体而言：
+ getter: 任意地方需要获得计算属性的值，该计算属性的getter就会被隐式地调用，例如: {{reverseStr}}。
+ setter: 任意地方需要修改计算属性的值，该计算属性的setter就会被隐式地调用，例如: reverseStr="abc"。

下面提供一个计算属性的示例，计算属性reverseStr始终返回属性str的反转字符串。

```
<script>
    var app1=new Vue({
        el: "#app1",
        data: {
            str: "Hello, World!",
        },
        computed: {
            // 计算属性reverseStr的getter和setter
            reverseStr: {
                get() {    // 计算属性reverseStr的getter，getter将在任何使用到计算属性reverseStr的地方被隐式调用
                    console.log("getter被调用");
                    return this.str.split('').reverse().join('');
                },

                set(newvalue) {     // 计算属性reverseStr的setter，setter将在任何修改计算属性reverseStr的地方被隐式调用，例如: vm.reverseStr=""
                    this.str=newvalue;
                    console.log("setter被调用");
                }
            },
        },
    })
</script>
```

### 2. 计算属性与方法的对比
计算属性和方法在某种意义上非常相似，例如上述的计算属性reverseStr可以使用一个同名方法予以代替，如下所示：
```
methods: {
            // 作为方法的timestamp
            timestampByMethod() {
                console.log(Date.now());   // Date.now()虽然不是响应式的，但是方法是无缓存的，总是在每次被调用时重新计算并且执行一遍，因此每次执行都返回当前的时间 
},
```

但是在实际上计算属性和方法在内部实现和功能上完全不相同，这是一个在Vue开发时非常容易出现的错误，具体区别如下。
+ 计算属性是有缓存的，若
+ 方法是无缓存的，若
