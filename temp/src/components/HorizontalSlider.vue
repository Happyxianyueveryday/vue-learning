<!-- HorizontalSlider: 横向无限滑动组件 -->

<template>
	<div id="HorizontalSlider">
    	<nav id="nav">
			<ul class="clear">
				<li>
					<router-link to="/navigation/news/shishi" style="font-size:x-large;" v-on:click.native="onclick(1)" v-bind:style="{color: font_color_1}">时事</router-link>
				</li>
				<li class="active">
					<router-link to="/navigation/news/tiyu" style="font-size:x-large;" v-on:click.native="onclick(2)" v-bind:style="{color: font_color_2}">体育</router-link>
				</li>
				<li>
					<router-link to="/navigation/news/yule" style="font-size:x-large;" v-on:click.native="onclick(3)" v-bind:style="{color: font_color_3}">娱乐</router-link>
				</li>
				<li>
					<router-link to="/navigation/news/keji" style="font-size:x-large;" v-on:click.native="onclick(4)" v-bind:style="{color: font_color_4}">科技</router-link>
				</li>
				<li>
					<router-link to="/navigation/news/jiaoyu" style="font-size:x-large;" v-on:click.native="onclick(5)" v-bind:style="{color: font_color_5}">教育</router-link>
				</li>
				<li>
					<router-link to="/navigation/news/fangchan" style="font-size:x-large;" v-on:click.native="onclick(6)" v-bind:style="{color: font_color_6}">房产</router-link>
				</li>
				<li>
					<router-link to="/navigation/news/caijing" style="font-size:x-large;" v-on:click.native="onclick(7)" v-bind:style="{color: font_color_7}">财经</router-link>
				</li>
			</ul>
		</nav>

		<div id="newsList">
			<router-view></router-view>    <!-- 无限新闻内容滚动栏渲染在此处-->
		</div>
	</div>
</template>

<script>
export default {
	name: "HorizontalSlider",
	data() {
		return {
			font_color_1: "blue",
			font_color_2: "black",
			font_color_3: "black",
			font_color_4: "black",
			font_color_5: "black",
			font_color_6: "black",
			font_color_7: "black",
			// 注意不推荐使用: font_color:["blue", "black", "black", "black", "black", "black", "black"]，绑定到数组元素上不是响应式的，当数组元素变化时，DOM不会随之更新
		}
	},
	methods: {
		onclick(newindex) {
			this.font_color_1=(newindex==1)?"blue":"black";
			this.font_color_2=(newindex==2)?"blue":"black";
			this.font_color_3=(newindex==3)?"blue":"black";
			this.font_color_4=(newindex==4)?"blue":"black";
			this.font_color_5=(newindex==5)?"blue":"black";
			this.font_color_6=(newindex==6)?"blue":"black";
			this.font_color_7=(newindex==7)?"blue":"black";
		}
	}
}
</script>

<style scoped>
/* 本处的css布局需要详细解释下，一方面熟悉css语法，一方面讲解-webkit-scrollbar插件的用法*/
#nav::-webkit-scrollbar {     /* 将整个<nav>元素设置为滚动条*/
  display: none;   /**/
}

#nav { 						  /* 设置<nav>元素*/
  overflow-x: auto;           /* 指定当文本溢出边框时，对文本进行裁剪*/
  background-color:rgb(232, 238, 241); /* 设置横向滚动条为灰色*/
}

#nav ul {                     /* 设置每个<nav>中的<ul>元素*/
  display: inline-block;      /* 将各个块级元素设置为行内元素，从而使得各个<li>的内容可以在同一行显示*/
  white-space: nowrap;        /* 指定各个<li>元素之间不换行*/
}

#nav ul li {                  /* 设置每个<ul>中的<li>元素*/
  display: inline-block;      /* 将各个块级元素设置为行内元素，从而使得各个<li>的内容可以在同一行显示*/
  margin: 0 15px;             /* 设置每个<li>之间的距离*/
}

/* 下面配置横向导航栏和新闻展示列表的布局，由于这两个部分的滑动方式不同，因此一定是在本文件中进行布局的设置，而不是在NavBarCom文件中，NavBarCom文件中仅能设置两个组件的整体样式*/
/* 固定定位fixed相对于浏览器窗口进行定位，而绝对定位absolute相对于父组件进行定位，而且父组件变化时，当前组件的定位也会随之动态改变*/

#nav {
    width: 100%;
    position: fixed;      /* 页面内容部分使用固定定位，固定定位使用top, bottom, left, right四个属性进行定位*/
    top: 6%;              /* 由于顶部导航栏占高度6%，因此横向滚动栏距离顶部6%*/
}

#newsList {
    width: 100%;
    position: fixed;   /* 页面内容部分使用固定定位，固定定位使用top, bottom, left, right四个属性进行定位*/
	/* 需要特别注意，以下的四项: top, bottom, overflow-x和overflow-y都是使用固定定位fixed中所必须填的参数*/
    top: 11%;          /* 滚动部分距离浏览器顶端11%*/
	bottom: 10%;       /* 滚动部分距离浏览器底端10%*/ 
	overflow-y:scroll; /* 允许y轴滚动*/
    overflow-x:hidden; /* 禁止x轴滚动*/
}
</style>


