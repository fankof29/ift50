//根据总数据中的临时数组和index生成一个表单的样式
//这个不用考虑空数组的情况,因为空数组是没有发布的机会的

//建立一个对象保存index 以及 temp数组,还有fromdate数组(用来统计点击次数)

var transfer = {
	arrbox:[],
	index:null
}

transfer.arrbox = JSON.parse(sessionStorage.tempArr);
transfer.index = JSON.parse(sessionStorage.transferIndex);

function CreateFrom(contain)  {
	this.contain = contain //存放表单的位置
	this.init();//初始化,生成数组
	this.even();//加载所有的事件
}

CreateFrom.prototype = {

	init:function() {//遍历数组 根据type不同生成不一样的表单生成表单.
		//首先生成标题

		$('#form_title').html(transfer.arrbox[0].name);

		for(let i = 1; i < transfer.arrbox.length; i++) {
			switch(transfer.arrbox[i].type) {
				case 'radio':
					this.createRadio(i)
					break;
				case 'checkbox':
					this.createCheckbox(i);
					break;
				case 'textarea':
					this.createTextAear(i);
					break;
				default:
					console.log('数据类型出现错误');
			}
		}

	},
	createRadio:function(i) {//创建单选选
		var div = $('<div>')
			.addClass('form_area')
			.appendTo($(this.contain));

		var titleDiv = $('<div>')
						.html('Q' + i +'&nbsp;&nbsp;'+transfer.arrbox[i].name)
						.appendTo(div);

		var  context = $('<ul>')
						.appendTo(div);
		
		for(let l = 0; l < transfer.arrbox[i].box.length; l++) {
			var li = $('<li>')
					.appendTo(context);
			var radio = $('<input>')
						.attr('type','radio')
						.attr('name',transfer.arrbox[i].name + i)
						.attr('value', l)
						.attr('id',transfer.arrbox[i].name + i + l)
						.css('margin-right','10px')
						.appendTo(li)
			var label = $('<label>')
						.html(transfer.arrbox[i].box[l])
						.attr('for',transfer.arrbox[i].name + i + l)
						.appendTo(li)
		}

	},
	createCheckbox: function(i) {//创建多选选项
		var div = $('<div>')
			.addClass('form_area')
			.appendTo($(this.contain));

		var titleDiv = $('<div>')
						.html('Q' + i +'&nbsp;&nbsp;'+transfer.arrbox[i].name)
						.appendTo(div);

		var  context = $('<ul>')
						.appendTo(div);
		
		for(let l = 0; l < transfer.arrbox[i].box.length; l++) {
			var li = $('<li>')
					.appendTo(context);
			var checkbox = $('<input>')
						.attr('type','checkbox')
						.attr('name',transfer.arrbox[i].name + i)
						.attr('value',l)
						.attr('id',transfer.arrbox[i].name + i + l)
						.css('margin-right','10px')
						.appendTo(li)
			var label = $('<label>')
						.attr('for',transfer.arrbox[i].name + i + l)
						.html(transfer.arrbox[i].box[l])
						.appendTo(li)
		}
	},
	createTextAear: function(i) {//创建文本框
		var div = $('<div>')
			.addClass('form_area')
			.appendTo($(this.contain));

		var titleDiv = $('<div>')
						.html('Q' + i +'&nbsp;&nbsp;'+transfer.arrbox[i].name)
						.css('margin-bottom','6px')
						.appendTo(div);

		var textarea = $('<textarea>')
						.addClass('createArea_textArea')
						.appendTo(div)
	},
	even: function() {
		/***
		 * 点击后根据选择的数据,将表单的点击数据加载到专门处理表单数据的函数中
		 * 
		 */
		 var self = this;

		 $('.button_box button').on('click', function(){
		 	self.collectingDate();
		 })


		 // 提交问卷的按钮 Mouseenter 和 mouseleave 触发的事件

		 $(".button_box button").on({
		 	mouseenter: function() {
		 		$(this).css('box-shadow','1px 1px 4px #3476C5')
		 	},
		 	mouseleave: function() {
		 		$(this).css('box-shadow','none')
		 	}
		 }
		 )


		 //鼠标移动到某个选项框 改选项框的颜色就会变色

		 $('.form_area').on({
		 	mouseenter:function() {
		 		$(this).css('border','1px solid #3476C5')
		 	},

		 	mouseleave: function() {
		 		$(this).css("border","1px solid #ccc")
		 	}
		 })
	},
	collectingDate: function() {
		//处理所有的选项
		var inputArr = $(':input');
		//选项被选中,负责统计选项选中次数的数组找到那个选项,然后+1
		for(let i = 0; i < inputArr.length; i ++) {
			if($(inputArr[i]).prop('checked') === true) {
				var index = $('.form_area').index($(inputArr[i]).parent().parent().parent()),
					value = parseInt($(inputArr[i]).val());

				transfer.arrbox[index + 1].data[value] += 1;

			}
		}
		var textarea = $('textarea')

		//判断textarea的内容是否为空,根据是否为空,将相应的数组增加一

		for (let i = 0; i < textarea.length; i++) {
			if($(textarea[i]).val()) {
				var index = $('.form_area').index($(textarea[i]).parent());

				transfer.arrbox[index +1].data[0] += 1;
			} else {
				var index = $('.form_area').index($(textarea[i]).parent());

				transfer.arrbox[index+1].data[1] += 1;
			}

		}
		
		//处理完成后 将transfer 根据index 更新sessionStore.bigArr中的数据
		//首先调出来sessionStore.bigArr[index]的数据
		//然后将transfer.arrbox = sessionStore 然后回到首页

		var bigDate = JSON.parse(sessionStorage.bigArr);

		bigDate[transfer.index] =transfer.arrbox;

		sessionStorage.bigArr = JSON.stringify(bigDate)
		sessionStorage.tempArr = null;
		sessionStorage.transferIndex = null;
		console.log(sessionStorage.bigArr)
		window.location.href="./index.html";
	}
}

var newform = new CreateFrom($('#form_create'))