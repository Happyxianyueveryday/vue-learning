## Part 7: 列表渲染

### 1. 列表渲染——v-for指令
在Vue中使用v-for指令来进行列表渲染，v-for指令的值为"item in items"的形式，其中items是要遍历的列表，item则为列表中所需要遍历的每个对象。v-for指令最多可使用三个参数来进行遍历过程。如下所示：

+ 使用一个参数：唯一的参数表示列表中的每个成员元素。
```
<p v-for="item in items">
    {{items}}
</p>

<script>
var vm=new Vue({
        el: "#app1",
        data: {
            items: {
                name1: "对象1",
                name2: "对象2",
                name3: "对象3",
            },

            kvlist: {
                key1: "value1",
                key2: "value2",
                key3: "value3",
            },
        }
    })
</script>
```

+ 使用两个参数：其中第一个参数表示每个列表元素的值value，第二个参数表示每个列表元素的键key。
```
<!-- 2. 双参数遍历，Vue指定的双参数从前到后依次为属性值，属性键-->
        <p v-for="(value, key) in kvlist">
            {{value}}: {{key}}
        </p>
```
使用和上述一个参数情况下相同的Vue实例，对应的输出为：
```
value1: key1
value2: key2
value3: key3
```

+ 使用三个参数：其中第一个参数表示每个列表元素的值value，第二个参数表示每个列表元素的键key，第三个参数表示每个列表元素的内部索引index。
```
<p v-for="(value, key, index) in kvlist">
            {{value}}: {{key}}: {{index}}
        </p>
```
使用和上述一个参数情况下相同的Vue实例，对应的输出为：
```
value1: key1: 0
value2: key2: 1
value3: key3: 2
```

### 2. 列表渲染的就地复用机制
下面简单介绍列表渲染的极重要的特性和机制——就地复用机制。
就地复用机制是指，当v-for指令所遍历的列表元素值发生改变时，仅仅只是改变文字的部分的显示，而不改动DOM的显示。这是因为数据仅仅和输出文有关，而和DOM之间无关。

例如，对于下面的代码，首先在两个输入框中输入不同的数值，当交换所渲染的列表元素时，两个输入框不会随着交换。因为列表悬案的就地复用机制决定了旧的DOM将会被直接使用，而非重新渲染。

```
<div id="app2">
        <div v-for="(value, key) in items">    <!--注意v-for所在的DOM包含与列表元素对应的一个文本框，当元素发生改变时，文本框不会随着元素而发生改变-->
            <p>{{value}}</p>
            <input>
        </div>
        <button v-on:click="changeSeq">点击交换数组元素的顺序</button>
    </div>
    
    <script>
    var vm2=new Vue({
        el: "#app2",
        data: {
            items: {
                key1: "value1",
                key2: "value2",
            }
        },
        methods: {
            changeSeq() {
                let temp=this.items.key1;
                this.items.key1=this.items.key2;
                this.items.key2=temp;
            }
        },
    })
    </script>
```

### 3. 避免就地复用机制——使用v-bind:key绑定DOM和数据
在默认情况下，v-for指令在渲染和更新时始终使用就地复用机制，如果需要就地复用机制，正确的方法是使用v-bind:key指令将v-for所在的DOM和显示的列表元素的某个无重复值的属性唯一绑定（最常见的无重复值的属性是列表元素索引）。
例如对于上述实例，关闭就地复用机制的代码为：
```
<div id="app2">
        <div v-for="(value, key, index) in items" v-bind:key="index">    <!--注意v-for所在的DOM包含与列表元素对应的一个文本框，当元素发生改变时，文本框不会随着元素而发生改变-->
            <p>{{value}}</p>
            <input>
        </div>
        <button v-on:click="changeSeq">点击交换数组元素的顺序</button>
    </div>
```
在该代码中使用v-bind:key将DOM绑定到不重复的列表元素属性上，这里使用的是列表元素的内部索引index。

### 4. 列表筛选与渲染——v-for和v-if指令配合使用
v-for和v-if配合使用同时实现列表筛选和渲染的方式主要存在如下两种。

+ v-for在外层，v-if在内层：如果需要对每一个遍历的元素进行条件判断，则一般将v-for语句和v-if语句写在同一个DOM的属性中，因为v-for指令的优先级高于v-if，因此相当于对每个列表元素使用v-if指令。
```
<div v-for="item in items" v-if="item.text!='元素1'">   <!-- 字符串中表示字符串只需要分别使用单引号和双引号两种不同写法即可-->
            {{item.text}}
        </div>
```

+ v-for在里层，v-if在外层：如果需要先进行条件判断，然后对满足条件的进行遍历，则直接将v-if写在较外层的DOM，将v-for写在较内层的DOM即可。
```
<template v-if="sign">
            <div v-for="item in items">
                {{item.text}}
            </div>
        </template>
```

### 5. 非响应式的列表更新
只有响应式的列表更新才会被Vue捕获并进行响应，非响应式的列表更新不会被Vue显示响应和更新，常见的非响应式的列表更新包括：
+ 对象属性的添加或删除
+ 利用索引直接设置一个数组项，例如：vm.items\[indexOfItem] = newValue
+ 修改数组的长度，例如：vm.items.length = newLength




