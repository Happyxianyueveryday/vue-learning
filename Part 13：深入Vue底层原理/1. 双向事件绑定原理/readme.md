## Vue双向绑定原理详解

Vue双向绑定包括从数据到视图的绑定和视图到数据的绑定，其中从视图到数据的绑定是较为简单的，当视图变化时，直接使用js中的事件监听即可完成。但是从数据到视图的绑定是难度较大的。如何实现当数据变化时视图随之更新，是本文档说明的重点。

本文档编写时的参考资料为: https://www.cnblogs.com/libin-1/p/6893712.html 。

在Vue中，从数据到视图的绑定是基于数据劫持和发布者-订阅者模式两种重要技术实现的。

### 1. 数据劫持
在js中，使用Object.defineProperty()方法实现数据劫持的，该方法的原型是：

```
/** 
 * Object.defineProperty: 精确添加或者修改对象的属性
 * param obj: 要在其上定义属性的对象
 * param prop: 要定义或修改的属性的名称
 * param descriptor: 将被定义或修改的属性描述符
 */
Object.defineProperty(obj, prop, descriptor)
```
在双向绑定的实现中，则只需要关注两个方法属性get和set，（不熟悉这两个方法属性的话可以参考https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty ） 一个示例用法如下，下述示例中劫持了Person的name属性，name属性值发生改变时指定set方法，获取name属性值时执行get方法：

```
<script>
    
    var Person={
        name: "",
    };

    Object.defineProperty(Person, "name", {   
        set: function(newname) {        // 给Person的name属性增加一个set属性，当name属性被改变时，触发执行set方法
            name=newname;
            console.log("setter已经被调用");
        },

        get: function() {               // 给Person的name属性增加一个get属性，当name属性被读取时，触发执行get方法
            console.log("getter已经被调用");
            return name;
        }
    });

</script>
```

### 2. 发布者-订阅者模式的应用
利用上述的数据劫持机制，结合发布者-订阅者模式，我们将整个过程的实现划分为五个组件：观察者Observer，收集器Dep，订阅者Watcher，解释器Complie和集成器MVVM：
+ **Observer: Observer是发布者。Observer利用Object.defineProperty劫持所有响应式对象的所有属性，并通过内部的Dep对象持有着所有的Watcher对象，当存在监听的属性发生变化时，将变化广播给所有的Watcher。**

+ **Dep: 位于Observer内部，Dep中存放所有的Watcher，并将从Observer收到的属性改变的消息转发给对应的Watcher。**

+ **Watcher: Watcher是订阅者。Watcher被通知时，检查自己所负责监视的属性是否确实变化（因为Observer通知是广播发送），若变化则调用对应渲染函数进行重新渲染。**。

+ **Complie: 解释器的工作是解析html模板，分析出一些其中含有Vue指令和响应式属性的DOM，并为其分别生成渲染函数，然后通过为每个DOM创建Watcher，从而将Vue实例属性和对应的DOM渲染函数绑定到一起。**

+ **MVVM: 集成器将上述的四个组件组装，主要步骤为：(1) 使用Observer劫持Vue对象的所有实例数据，(2) 使用Complie解析html页面，将Vue响应式实例属性和对应DOM的渲染函数绑定，从而初始化Watcher对象（初始化创建的Watcher对象将会自动触发添加到Observer中的容器Dep中）。**

三者间的结构图如下所示：

 ![avatar](https://images2015.cnblogs.com/blog/938664/201705/938664-20170522225458132-1434604303.png)


### 3. 观察者Observer的实现
Observer作为发布者-订阅者模式中的发布者，其主要任务有：
+ 属性劫持：对于给定的单个对象，Observer通过Object.defineProperty()方法劫持该对象的所有属性，从而监听该对象中所有属性的变化。
+ 收集Watcher：Observer在内部创建一个收集器Dep对象，将所有新产生的Watcher对象加入到收集器中（这通过触发Observer的getter来实现）。
+ 监听属性：属性劫持完成后，Observer监听对象的所有属性，若有某个属性值发生变化，在对应的setter中通知所有Dep中的Watcher对象。

因此，总结而言，Observer在一侧监听着给定对象的所有属性，在另一侧持有着所有的Watcher，当监听的属性发生变化，立刻通知持有的所有Watcher对象。

```
/**
 * Observer: Observer的构造函数
 * @param {*} obj: 需要劫持其所有属性的对象
 */
function Observer(obj) {    
    this.obj=obj;
    this.walk(obj);   
}

Observer.prototype = {
    /**
     * walk: 劫持给定对象的所有属性
     * @param obj: 劫持对象, Object
    */
    walk: function(obj) {
        // 1. 遍历给定对象的每个直接子属性
        let lis=Object.keys(obj);       // Object.keys获取目标对象的子属性列表
        lis.forEach((element) => {      // 这里推荐使用箭头函数，箭头函数捕获该函数所在的上下文的this，并将其作为自己的this，注意只有大括号能够分隔上下文，而小括号不行
            this.defineReactive(obj, element, obj[element]);   // 对列表中的每个子属性，调用defineReactive方法依次进行劫持
        });                  
    },

    /**
     * defineReactive: 对某个属性对象中的给定属性进行劫持
     * @param obj: 需要劫持的属性名所在的属性对象, Object
     * @param key: 需要劫持的属性名, str
     * @param val: 属性名key对应的属性对象, Object
    */
    defineReactive: function(obj, key, val) {
        // 1. 创建一个收集器Dep
        var dep=new Dep();
 
        // 2. 递归地访问并劫持目标属性的所有子属性
        objObserver=observe(val);

        // 3. 使用Object.defineProperty劫持目标属性
        // 3.1 在get中，判断当Watcher对象的缓存Dep.target不为空时，将缓存的新Watcher对象加入收集器Dep，然后重新将缓存清空
        // 3.2 在set中，判断属性的新值不等于旧值时，将消息通知收集器Dep中存放的所有的Watcher对象
        Object.defineProperty(obj, key, {
            set: function(newval) {
                if(newval!=val) {         // 若属性值发生改变
                    console.log("监听到属性发生改变");
                    val=newval;           
                    objObserver=observe(newval); // 易错点: 如果属性改变后的值是一个对象，则需要重新进行监听（因为原来的属性只是单独的一个属性） 
                    dep.notify();                // 通知收集器Dep中的所有的Watcher对象
                }
            },
            get: function() {
                if(Dep.target) {          // 若缓存中存在新的Watcher对象
                    console.log(Dep.target);
                    dep.add(Dep.target);  // 将新的Watcher对象加入收集器Dep
                    Dep.target=null;      // 重新清空缓存，等待下一个新的Watcher对象的到来
                }
                return val;     // 返回属性对象的值
            }
        });
    },
}

/**
 * observe: 外部调用接口，类似于单例模式，仅有传入对象为非空才返回Observer对象
 * @param {*} obj: 要进行劫持的目标对象
 */
function observe(obj) {
    if(!obj||typeof obj!="object") {   // 若传入的需要劫持的对象为空或者传入的不是对象，则不做处理直接返回
        return null;
    }
    else {                             // 传入的需要劫持的对象符合要求时，进行劫持操作
        return new Observer(obj);
    }
}

```

### 4. 订阅器Watcher的实现
订阅器Watcher作为发布者-订阅者模式中的订阅者，其主要任务有：
+ 绑定属性和渲染函数：每个Watcher将一个响应式属性和对应DOM的渲染函数绑定在一起，从而在收到Observer的通知后，根据绑定的属性值是否变化来判断是否需要调用的渲染函数。
+ 自发加入收集器：每个Watcher对象创建时将自己加入Observer的Dep中。
+ 重新渲染：每个Watcher对象绑定了一个属性和一个渲染函数，收到Observer的通知后，检查属性是否改变，属性改变时调用渲染函数进行重新渲染。。

因此，总结而言，订阅器Watcher的一侧是Observer，另一侧是所绑定的属性对应的DOM渲染函数。当收到Observer的通知时，Watcher确认响应式属性值是否发生变化，若变化则调用渲染函数重新渲染对应的DOM。

```
/**
 * Watcher: Watcher原型的构造函数
 * @param {*} cb: 当前Watcher对象所需要绑定的渲染函数
 * @param {*} vm: 当前Watcher对象所绑定到的Vue实例对象
 * @param {*} exp: 当前Watcher对象所绑定的属性名
 */
function Watcher(vm, exp, cb) {
    this.cb=cb;             // 当前Watcher所绑定的DOM的渲染函数
    this.vm=vm;             // 当前Watcher所绑定到的Vue实例对象
    this.exp=exp;           // 当前Watcher所负责绑定的属性名
    this.value=this.get();  // 调用get方法获取当前Watcher所绑定的属性值，并将Watcher自身加入到Dep中
}

Watcher.prototype = {
    /**
     * get: 获取当前Watcher所负责渲染的属性的值，并将当前Watcher对象加入到收集器Dep中
    */
    get: function() {
        // 将当前Watcher对象加入到收集器的步骤只需要配合Observer中的设定即可
        // 1. 将当前Watcher对象写入全局缓存Dep.target
        Dep.target=this;
        // 2. 设法触发所负责渲染的属性的getter
        var value=this.vm.data[this.exp];       // this.vm就是绑定的Vue实例对象，所有属性均在其中，该Watcher所负责渲染的属性名为exp，因此vm[exp]就是目标的属性值
        // 3. 清空全局缓存Dep.target
        Dep.target=null;       // note: 实际上清空缓存的工作在Observer劫持属性的getter中已经做了，这里是一步冗余操作
        
        return value;
    },

    /**
     * update: 重新渲染所绑定的组件
     * note 1: update方法并不是直接重新渲染组件，这样的开销非常大，因为Observer只要一个属性变化就会通知所有的Watcher
     * note 2: 因此，首先应该判断数据是否真正发生了改变，若真的改变则重新渲染组件；否则无需重新渲染组件
     */
    update: function() {
        var newvalue=this.vm.data[this.exp];   // 当前绑定属性的最新值，this.value为绑定属性的旧值
        if(newvalue!==this.value) {        // 若绑定属性值确实改变，调用对应的渲染函数进行重新渲染
            let oldvalue=this.value;
            this.value=newvalue;
            this.cb.call(this.vm, newvalue, oldvalue);
        }
    }
}
```

### 5. 解析器Complie的实现
解析器Complie的主要任务有：
+ 解析html代码：解析器必须从html代码文件中解析出含有Vue指令和挂载文本（mustache语法）的DOM，以及这些DOM中指令所绑定的Vue实例属性。
+ 创建Watcher：解析html代码完成后，解析器根据解析出的含有Vue指令的DOM和对应绑定的Vue实例属性，生成DOM的渲染函数并创建Watcher，从而将Vue实例属性和渲染函数绑定。

总而言之，解析器Compile从html文件中解析出含有Vue指令或者特性的DOM结点，以及这些所绑定的Vue实例属性，从而生成渲染函数，最后再将渲染函数和对应的绑定属性作为参数，构造出对应的Watcher对象。

```
// Compile: Vue代码解释器

/**
 * Compile: Compile原型构造函数
 * @param {*} el: Vue实例对象所挂载的DOM的id
 * @param {*} vm: Vue实例对象
 */
function Compile(el, vm) {
    this.el=document.querySelector(el);     // Vue实例对象挂载的DOM对象
    this.vm=vm;                             // Vue实例对象
    this.fragment=null;                     // 文档碎片对象，文档碎片是一个小型的文档（或者说html元素/DOM）缓存器，请参见MDN上的在线教程
    this.init();                            // 调用初始化函数, 构造文档碎片对象fragment
}

Compile.prototype = {
    /**
     * init: 初始化文档碎片
     */
    init: function() {
        if(this.el) {   // 若能够找到指定id的DOM结点，则将其加载到文档碎片中，然后编译文档碎片
            this.fragment=this.nodeToFragment(this.el);   
            console.log(this.fragment);
            this.compileElement(this.fragment);           
            this.el.appendChild(this.fragment);           
        }
        else {          // 若找不到给定id的DOM结点，则挂载过程失败，直接不进行后续解析
            return;
        }
    },

    /**
     * nodeToFragment: 将原始的DOM对象转换称为文档碎片的形式
     * @param {*} el: Vue实例绑定的原始DOM对象
     */
    nodeToFragment: function(el) {
        var fragment=document.createDocumentFragment();   // 创建空的初始文档碎片

        // 使用循环依次提取原始DOM对象中的所有子DOM，例如对于测试的html，依次从其中取出<h2>,<input>,<h1>,<button>等html元素，并将这些html元素保存到文档碎片对象中
        var child=el.firstChild;                          
        while(child) {
            // console.log(child);
            fragment.appendChild(child);
            child=el.firstChild;
        }

        return fragment;
    },

    /**
     * compileElement: 解析文档片段对象
     * @param {*} el: 由nodeToFragment方法生成的fragment对象
     * @note: compileElement编译并且解析上述方法生成的fragment对象，识别出其中的Vue指令等
     */
    compileElement: function(el) {
        var childNodes=el.childNodes;  // 提取所有子DOM结点对象，例如<h1>,<h2>,<button>等
        // console.log(childNodes);

        [].slice.call(childNodes).forEach((node) => {   // [].slice.call(childNodes)实际上是把childNodes转化为列表对象
            // 对列表中的每个html元素(DOM)对象，使用正则表达式文本进行解析，注意此处需要使用箭头函数
            var reg=/\{\{(.*)\}\}/;          // 捕获mustache语法（例如{{data}}）的正则表达式文本
            var text=node.textContent;       // 将DOM对象转化为纯html代码文本形式

            // 若判断为元素结点，调用下面自定义的compile方法进行进一步解析
            // note: 关于DOM结点分类，请参见MDN上的相关文档说明
            if(this.isElementNode(node)) {  
                this.compile(node);    
            }
            // 若判断为文本结点（其中包含mustache语法的正则匹配规则），则解析出对应mustache语法的参数，并调用文本结点解析方法compileText进行进一步解析
            else if(this.isTextNode(node) && reg.test(text)) {  
                this.compileText(node, reg.exec(text)[1]);  // node为要渲染文本的结点，reg.exec(text)[1]为解析出的要显示的属性，例如'{{data}}'解析得到的reg.exec(text)[1]就是'data'
            }

            // 如果当前处理的DOM对象还有子DOM对象，则调用自身进行递归处理
            if (node.childNodes && node.childNodes.length) {
                this.compileElement(node);
            }
        })      
    },

    /**
     * compile: 解析元素DOM结点
     * @param {*} node: 输入的元素DOM结点
     */
    compile: function(node) {
        var nodeAttrs = node.attributes;                      // 获取html元素的属性列表
        Array.prototype.forEach.call(nodeAttrs, (attr) => {   // 依次处理列表中的每个html属性
            // attr就是html元素中的各个属性文本，例如v-on:click="myFunction"
            // attr.name就是html属性名文本，例如v-on:click
            var attrName = attr.name;
            if (this.isDirective(attrName)) {      
                var exp = attr.value;               // html属性值（即Vue里所绑定的对象属性名）
                var dir = attrName.substring(2);    // dir即指令值（例如"on:click", "bind:src")

                if (this.isEventDirective(dir)) {   // 处理v-on指令
                    this.compileEvent(node, exp, dir);    // 调用v-on指令的解析函数
                } 
                else {                              // 处理v-model指令
                    this.compileModel(node, exp);    // 调用v-model指令的解析函数
                }
                node.removeAttribute(attrName);
            }
        });
    },

    /**
     * compileText: 文本DOM结点的解析函数
     * @param {*} node: 文本DOM结点对象
     * @param {*} exp: 解析出的mustache语法的属性名称
     */
    compileText: function(node, exp) {
        var initText = this.vm[exp];         // 因为exp就是文本结点的属性名，因此直接从Vue对象vm中取出vm[exp]就是mustache语法中的属性值
        this.updateText(node, initText);     // 调用updateText刷新DOM

        // 关键步骤：创建该文本DOM对应的Watcher对象（该Watcher对象的构造函数会自动触发加入到Observer的Dep中，请参见Watcher的源代码），创建的Watcher将DOM和对应的渲染函数绑定。
        new Watcher(this.vm, exp, (value) => {
            this.updateText(node, value);
        });
    },

    /**
     * compileEvent: 解析v-on指令的元素DOM结点
     * @param {*} node: 事件DOM结点对象
     * @param {*} exp: 解析出的所绑定的Vue实例方法(methods)名称
     * @param {*} dir: Vue指令名，例如"bind:src","on:click"
     */
    compileEvent: function (node, exp, dir) {
        var eventType = dir.split(':')[1];          // 事件名称
        var cb = this.vm.methods && this.vm.methods[exp];   // 提取v-on指令所绑定的Vue实例方法(methods)
        
        // 关键步骤：使用DOM的addEventListener内置方法，增加事件监听器，监听到事件时触发方法cb
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(this.vm), false);    //cb.bind方法的具体细节请参见MDN对应文档，该文档在函数cb的基础上创建一个新函数，该新函数的this绑定到bind的第一个参数上
        }
    },

    /**
     * compileModel: 解析v-model指令的元素DOM结点
     * @param {*} node: DOM结点对象
     * @param {*} exp: 解析出的所绑定的Vue实例方法(methods)名称
     */
    compileModel: function (node, exp) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);  // 完成挂载，{{ }}中的值被渲染为data中的值
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function(e) {   
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    },

    /**
     * updateText: 文本DOM更新器
     * @param {*} node: 文本DOM结点
     * @param {*} value: 新的文本值
     */
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    /**
     modelUpdater: 模型DOM更新器
     * @param {*} node: 元素DOM结点
     * @param {*} value: 新的元素值
     */
    modelUpdater: function(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },

    /**
     * isDirective: 判断输入的html文本是否含有Vue动态指令
     * @param {} attr: 需要判断的DOM的html文本
     */
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    /**
     * isEventDirective: 判断输入的html文本是否含有v-on指令
     * @param {*} dir: 需要判断的DOM的html文本
     */
    isEventDirective: function(dir) {
        return dir.indexOf('on:') === 0;
    },

    /**
     * isElementNode: 判断输入DOM结点是否为元素DOM结点
     * @param {*} node: DOM结点
     */
    isElementNode: function (node) {
        return node.nodeType == 1;
    },

    /**
     * isTextNode: 判断输入的DOM结点是否为文本DOM结点
     * @param {*} node: DOM结点
     */
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}
```

### 6. 集成器MVVM的实现
集成器MVVM的主要任务包括：
+ Vue对象原型：集成器MVVM实际上就是Vue对象原型，因此需要根据用户参数初始化data, methods等属性，并对这些属性设置代理，当用户输入参数改变时，Vue对象实例的对应属性也应当被触发改变。  

+ 协调各组件工作：成员属性初始化完毕后，集成器MVVM首先创建Observer绑定自身的所有属性，然后调用Compile对html文件进行解析从而创建Watcher。

总而言之，集成器MVVm主要负责初始化工作，包括初始化自身（Vue对象实例）属性，初始化Observer绑定自所有属性，解析html从而初始化Watcher。

