<!-- 基本组件: ConfirmCom，确认消息框-->

<template>
    <div id="ComfirmCom" class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div> <!-- 确认弹窗标题-->
        <div class="weui-dialog__bd">{{hint}}</div>    <!-- 确认弹窗提示消息-->
        <div class="weui-dialog__ft">
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-on:click="leftButtonClicked">{{leftButtonText}}</a>     <!-- 左侧点击按键-->
            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" v-on:click="rightButtonClicked">{{rightButtonText}}</a>   <!-- 右侧点击按键-->
        </div>
    </div>
</template>


<script>
export default {
    name: "ConfirmCom",

    data() {
        return {
        }
    },

    props: {
        title: String,       // 确认框标题
        hint: String,        // 确认消息提醒
        leftButtonText: String,  // 左侧按钮文本
        rightButtonText: String  // 右侧按钮文本
    },

    methods: {
        // 右侧按钮的监听器点击的触发方法，rightButtonClicked
        leftButtonClicked() {
            this.$emit("leftButtonClicked");
        },

        // 左侧按钮的监听器点击的触发方法， leftButtonClicked
        rightButtonClicked() {
            this.$emit("rightButtonClicked");
        }
    }
}
</script>


<style scoped>

</style>

