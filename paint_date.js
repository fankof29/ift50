//创建图表

//根据trempArr的数据,把trempArr中的数据整理成用来生成图标的数据,根据type的不同引用不用的图表生成

var transfer = {
	arrbox:[],
	index:null
}

transfer.arrbox = JSON.parse(sessionStorage.tempArr);
transfer.index = JSON.parse(sessionStorage.transferIndex);
	

var createChart = {
		/*
		 * canvasWidth: canvas的宽度
		 * canvasHeight: canvas的高度
		 * pieChartX: 饼图的x坐标
		 * pieChartY: 饼图的y坐标
		 * radius: 饼图的半径
		 * createText: 是否创建文字注释
		 * createColor: 是否创建颜色注释
		 * createAnimate: 是否创建动画效果
		 * dege: 饼图和canvas之间的空间
		 * canvasbox: 总盒子 用来装所有的area
		 * charbox: 用来存储整理后的数据
		 * textAble: 是否在饼图上生成注释文字
		 */
		canvasWidth:null,
		canvasHeight:null,
		arrbox:null,
		index:null,
	 	pie: {
 			pieChartY: null,
 			pieChartY: null,
 		 	radius: null
	 	},
	 	charbox:null,
	 	createAnimate: true,
	 	createColor: true,
	 	createText: true,
	 	dege: {
	 	 	width: 50,
	 	 	height: 50
	 	},
	 	textAble:true,
	 	canvasbox: $('#chart_create'),
	 	


	/*arr 为传递进来的用来生成图表的数组
	 * 讲传递进来的数组进行判断,选择生成什么样的图表.
	 */
	init: function(arr){

		this.arrbox = arr.arrbox;
		this.index = arr.index

		$('#chart_title').html(this.arrbox[0].title);

		for(let i = 1; i < this.arrbox.length; i++) {
			switch(this.arrbox[i].type) {
				case 'radio':
					this.pieChart(this.arrbox[i]);
					break;
				case 'checkbox':
					this.barChart(this.arrbox[i]);
					break;
				case 'textarea':
					this.pieChart(this.arrbox[i]);
					break
			}
		}
	},

	/*
	 * arr为传递进来的数组
	 * 根据数组创建饼图
	 */
	pieChart: function(arr){
		this.canvasWidth = 600;
		this.canvasHeight = 300;
		this.pie.x = this.canvasWidth / 2;
		this.pie.y = this.canvasHeight /2;
		this.pie.radius = Math.min(this.pie.x, this.pie.y) - Math.max(this.dege.width, this.dege.width);
		this.charbox = [];//用来存储经过整理后的arr数据
		//对数组进行处理,转换成饼图所需要的数据格式
		for(let i = 0; i < arr.box.length; i++) {
			var obj = {};
			obj.name = arr.box[i];
			obj.value = arr.data[i];
			obj.color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
			this.charbox.push(obj)
		}

		var div = $('<div>')
					.addClass('pie_chart')
					.appendTo(this.canvasbox);
		var h = $('<h1>')
					.html(arr.name)
					.appendTo(div)

		var canvas = $('<canvas>')
		 				.attr('width',this.canvasWidth)
		 				.attr('height',this.canvasHeight)
		 				.appendTo(div);
		var ctx = canvas[0].getContext("2d");

		this.renderBoder(ctx);


		//计算总合

		var sum = 0;
		var num = this.charbox.length;
		for(let i = 0; i < num; i++) {
			sum += this.charbox[i].value;
		}

		//计算百分比 同时绘画出扇形

		var angle = 0;

		for(let i = 0; i < num; i++) {
			var precent = this.charbox[i].value / sum;

			this.renderPie(ctx, i, precent, angle)

			angle += 2 * Math.PI * precent;	
		}

		ctx.save();
		this.renderLegend(ctx, sum);
		ctx.restore();
		
	},


	/*
	 * ctx: 用来绘制的canvas
	 * sum: 总数
	 * 函数用来绘制 颜色注释
	 */
	renderLegend: function(ctx,sum) { 
		var nums = this.charbox.length;
		ctx.font = "10pt Calibri";
		var pos = (this.canvasWidth/2 > (this.pie.radius + 50)) ? 50: (this.pie.x - this.pie.radius)
		for(let i = 0; i < nums; i++) {
			var x = this.charbox[i].value / sum;
			x = Math.round(x*100)/100;
			var str = this.charbox[i].name;
			ctx.fillStyle = this.charbox[i].color;
			ctx.fillRect(pos - 40, 20*i+10,10,10);
			ctx.fillStyle = 'black';
			ctx.fillText(str,pos-25,20*i+20);
		}
	},

	//ctx: 要绘制的canvas  绘制一个边框
	renderBoder: function(ctx){
		ctx.save();
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.strokeRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.restore();
	},

	/*
	 * ctx: 要进行绘制的canvas
	 * index: 第几个要绘制的扇形
	 * precent: 扇形的大小
	 * angle: 绘制扇形的开始角度
	 * 函数: 绘制扇形
	 */
	renderPie: function(ctx, index, precent, angle) { 
		var endAngle = angle + Math.PI * 2 * precent;
		ctx.beginPath();
		ctx.arc(this.pie.x, this.pie.y,this.pie.radius, angle, endAngle);
		ctx.moveTo(this.pie.x, this.pie.y);
		ctx.lineTo(this.pie.x + this.pie.radius * Math.cos(angle), this.pie.y + this.pie.radius * Math.sin(angle));
		ctx.lineTo(this.pie.x + this.pie.radius * Math.cos(endAngle), this.pie.y + this.pie.radius * Math.sin(endAngle));
		ctx.lineTo(this.pie.x, this.pie.y);
		ctx.closePath();
		ctx.fillStyle = this.charbox[index].color;
		ctx.fill();


		if(this.textAble) {//用来绘制注释文字
			var halfAngle = angle + Math.PI * precent;

			var hx = this.pie.x + this.pie.radius * Math.cos(halfAngle);
			var hy = this.pie.y + this.pie.radius * Math.sin(halfAngle);

			ctx.beginPath();
			ctx.moveTo(hx,hy);
			var line = (hx < this.pie.x)? (hx - this.dege.width) : (hx + this.dege.width);
			ctx.lineTo(line, hy);
			ctx.closePath();
			ctx.strokeStyle = 'black';
			ctx.stroke();

			var textPos = (hx < this.pie.x)? (hx - this.dege.width * 2) : (hx + this.dege.width);
			precent = Math.round(precent * 100) / 100;
			var str = this.charbox[index].name + ":" + (precent * 100).toFixed(0) + "%";
			ctx.font = "10pt Calibri";
			ctx.fillStyle = 'black';
			ctx.fillText(str, textPos, hy);
		}
	},

	/*
	 * 绘制直方图.\
	 * arr: 传递进来的数组参数,类型是多选
	 */
	barChart: function(arr) {
		this.canvasWidth = 600;
		this.charbox = [];//用来存储经过整理后的arr数据
		//对数组进行处理,转换成直方图所需要的数据格式
		for(let i = 0; i < arr.box.length; i++) {
			var obj = {};
			obj.name = arr.box[i];
			obj.value = arr.data[i];
			obj.color = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);
			this.charbox.push(obj)
		}

		var nums = this.charbox.length
		this.canvasHeight = (nums + 1) * 55;

		var sum = 0;
		for(let i = 0; i < nums; i++) {
			sum += this.charbox[i].value;
		}

		var div = $('<div>')
					.addClass('pie_chart')
					.appendTo(this.canvasbox);
		var h = $('<h1>')
					.html(arr.name)
					.appendTo(div)

		var canvas = $('<canvas>')
		 				.attr('width',this.canvasWidth)
		 				.attr('height',this.canvasHeight)
		 				.appendTo(div);
		var ctx = canvas[0].getContext("2d");

		this.renderBoder(ctx);	
		var precent = null;
		for(let i = 0; i < nums; i++) {
			precent = this.charbox[i].value/sum;
			this.createBar(ctx, precent, i);
		}	

	},

	/*
	 * ctx: 要绘制的canvas
	 * index: 对应charbox中数据的位置 
	 * precent: 百分比用来生成
	 */
	createBar: function(ctx, precent, index) {
		precent = Math.round(precent * 100)/100;

		var str = Math.round(precent * 100).toFixed(0) + "%";
		var name = this.charbox[index].name + ":";

		var width = 300 * precent;
		var strPos = width + 50 + this.dege.width;
		ctx.font = '10pt Calobri';
		ctx.fillStyle = 'black';
		ctx.fillText(name, this.dege.width, 20*index + 36);
		ctx.fillStyle = this.charbox[index].color;
		ctx.fillRect(this.dege.width + 40,20*index+24, width, 15) 
		ctx.fillStyle = 'black';
		ctx.fillText(str, strPos, 20 * index + 36)

	}
}

var event = {
	//返回主页
	returnEvent: function() {
		sessionStorage.tempArr = null;
		sessionStorage.transferIndex = null;
		window.location.href = './index.html';
	}
}


createChart.init(transfer)

$('.button_box button').on('click', function() {
	event.returnEvent();
})