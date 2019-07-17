  # 2. 条件与循环语句

  ## 2.1 Vue条件指令: v-if

  在Vue中使用指令v-if来实现条件语句，v-if指令作为html元素中的一个属性，该属性的值就是作为判断条件的变量。
  
  例如下列的Vue代码中通过判断Vue对象的data属性的seen子属性的值，来决定是否显示data属性的message子属性的值。
  
  
   ```
   <body>
        <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            <p v-if="seen">
                {{message}}
            </p>
        </div>
    </body>

    <script>
        // js代码中对应的Vue对象
        var vm=new Vue({
            el:"#app-1",
            data:{
                seen:true,
                message:"Hello, Vue!"
            }
        })
    </script>
   ```
   
   ## 2.2 Vue循环指令: v-for
   
   在Vue中使用指令v-for来实现循环语句，v-for同样作为所在的html元素的一个属性，属性值以"for element in elements"的形式给出，其中elements为需要遍历的列表。
   
   例如下列的Vue代码中循环访问列表messages中的每个信息。
   
   ```
   <body>
        <!-- html代码段中的DOM/html元素-->
        <div id="app-1">
            <p v-for="message in messages">
                {{message}}
            </p>
        </div>
    </body>

    <script>
        // js代码中对应的Vue对象
        var vm=new Vue({
            el:"#app-1",
            data:{
                messages: [
                    "Hello, Vue!",
                    "Hello, Vue!",
                    "Hello, Vue!"
                ]
            }
        })
    </script>
   ```
