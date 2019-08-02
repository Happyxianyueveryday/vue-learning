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
<script>
    var app1=new Vue({
        el: "#app1",
        data: {
            str: "Hello, World!",
        },
        methods: {
            reverseStr() {
                return this.str.split('').reverse().join('');
            }
        }
    })
</script>
```

但是在实际上计算属性和方法在内部实现和功能上完全不相同，这是一个在Vue开发时非常容易出现的错误，具体区别如下。
+ 计算属性是有缓存的，若计算属性中所关系的响应式属性的值没有变化，则调用计算属性时直接返回上次缓存的结果。例如上述的计算属性reverseStr，若响应式属性this.str的值不变，则每次执行时直接从缓存中返回上次计算的结果。
+ 方法是无缓存的，不论方法中关系的响应式属性的值有没有变化，都会重新执行一遍计算结果并返回。例如上述的方法reverseStr，每次调用都会完整执行一遍。

因此，需要在恰当的时候使用计算属性或方法，常用的两个场景如下。

+ 计算量较大的操作，例如遍历大型列表获得结果等，应该使用计算属性表示。
+ 需要从后端获取数据的操作，必须使用方法表示，因为从后端取数据的操作不是响应式的。（这一点在之前的项目中都存在些许问题，需要进行修正，并且从服务器取数据的操作一般都使用Vuex统一写在action.js或者mutation.js中，具体请参见Vuex的文档。）
