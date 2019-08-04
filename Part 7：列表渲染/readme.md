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
就地复用机制是指，当v-for指令所遍历的列表元素值发生改变时，

### 3. 避免就地复用机制——使用v-bind:key绑定DOM和数据


### 4. 列表筛选与渲染——v-for和v-if指令配合使用


### 5. 非响应式的列表更新



