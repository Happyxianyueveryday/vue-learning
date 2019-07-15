var app1=new Vue({
    el: "#app-1", 
    data: {
        seen1: true,
        seen2: false
    }
})

var app2=new Vue({
    el: "#app-2", 
    data: {
        messages: [
            '信息1',
            '信息2',
            '信息3',
            '信息4',
            '信息5'
        ]
    }
})

var app1=new Vue({
    el: "#app-3", 
    data: {
        messages:[
            {info:'信息1', seen: true},
            {info:'信息2', seen: false},
            {info:'信息3', seen: true},
            {info:'信息4', seen: false},
            {info:'信息5', seen: true}
        ]
    }
})

