//进入页面初始化

 //将总数组中的数据提取到arrbox


// 根据总数组,创建表单的目录.
sessionStorage.transferIndex = null;//临时索引
sessionStorage.tempArr = null;
console.log(sessionStorage.bigArr)
if(sessionStorage.bigArr == undefined) { //如果bigArr没定义,初始化
	var box = [];
	sessionStorage.bigArr = JSON.stringify(box);
	var bigarrbox = JSON.parse(sessionStorage.bigArr);
} else {
	bigarrbox = JSON.parse(sessionStorage.bigArr);
}



function CreateFormIndex(contain) {
	this.contain = contain;
	this.init();//初始化
	$(document).off();//解除所有绑定事件防止重复绑定
	this.event();

}

CreateFormIndex.prototype = {
	init:function(){
		if(bigarrbox.length === 0) {
			$('.create_question_body').show();
			$('article .compile_body').hide();
		} else {
			$('.create_question_body').hide();
			$('article  .compile_body').show();
			this.createForm();
		}
	},
	createForm:function(){//循环数组 根据数组的 title time state 生成样式.
		$(this.contain).html(''); //每次运行前清空
		console.log(bigarrbox[0][0].state)
		for(let i = 0,length = bigarrbox.length; i<length; i++) {
			var div = $('<div>')
						.addClass('all_form_area_div')
						.appendTo(this.contain);

			var check = $('<input>')
						.attr('type','checkbox')
						.css('margin-right','20px')
						.appendTo(div);

			var	title = $('<span>')
						.html(bigarrbox[i][0].title)
						.addClass('all_form_area_title')
						.appendTo(div);

			var time = $("<span>")
						.html(bigarrbox[i][0].time)
						.addClass('all_form_area_time')
						.appendTo(div);

			switch(bigarrbox[i][0].state) {
				case 'on':
					var state = $("<span>")
								.html('发布中')
								.addClass("all_from_area_state")
								.appendTo(div);

					var buttonB = $('<button>')
								.html("删除")
								.addClass('all_from_area_button_delete')
								.appendTo(div);
					var buttonD = $('<button>')
								.html("填写问卷")
								.addClass('all_from_area_button_look_from')
								.appendTo(div);
					var buttonC = $("<button>")
								.html('查看数据')
								.addClass('all_from_area_button_look_date')
								.appendTo(div);
						break;

				default:
					console.log('出现错误')



			}
		}
	},
	buttonMouseEnter: function(e) {
		$(e.target).css('background-color','#3460C5');
	},
	buttonMouseLeave: function(e) {
		$(e.target).css('background-color','#3476C5');
	},
	event:function() {//加载所有的事件
		//全选事件
		var self = this
		$('#all_select').on('click',function(){
			$("#all_form_area :checkbox")
			.prop('checked', $(this).prop('checked'))
		})


		//全选事件旁的删除按钮.
		$(".all_select_area button").on("click",function(){
			 $("#all_form_area :checkbox").each(function(index,ele){
			 	if($(ele).prop('checked')) {
			 		bigarrbox[index] = null;
			 	}
			 })

			//将要删除的数组变为null 然后把为null的全部删除.重新载入样式生成

			var newarr = [];
			for(let i = 0;i<bigarrbox.length; i ++) {
				if(bigarrbox[i] !== null) {
					newarr.push(bigarrbox[i])
				} 
			}

			bigarrbox = newarr;

			sessionStorage.bigArr = JSON.stringify(bigarrbox);//更新总数组
			self.init();
		})


		//单个删除

		$('.all_from_area_button_delete').on('click', function(e){ //找到点击按钮所在的div是整个all_form_area第几个,对应相应的数组
			var target = e.target,
				index = $('#all_form_area').find('.all_form_area_div').index($(e.target).parent());
			
			bigarrbox.splice(index,1);
			sessionStorage.bigArr = JSON.stringify(bigarrbox);
			self.init();
			self.event();
		})
		//新建问卷,点击后跳转到新建问卷页面
		$('.compile_body_span_button,.create_question_body button').on('click', function(){
			window.location.href="./compile.html";
		})

		//编辑事件 找到第几个数组,然后将index到sessionStorage.index中 让其他页面也能读取.
		$('.all_from_area_button_look_from').on('click', function(e) {
			var index = $('#all_form_area')
				.find('.all_form_area_div')
				.index($(e.target).parent());

			//更新完临时数组 和传送的index 打开编辑页面
			var bigArrbox = JSON.parse(sessionStorage.bigArr);

			sessionStorage.tempArr = JSON.stringify(bigarrbox[index]);
			sessionStorage.transferIndex = JSON.stringify(index);

			window.location.href="./from.html";
		})

		$('.all_from_area_button_look_date').on('click', function(e) {
			var index = $('#all_form_area')
				.find('.all_form_area_div')
				.index($(e.target).parent());

			//更新完临时数组 和传送的index 打开编辑页面
			var bigArrbox = JSON.parse(sessionStorage.bigArr);

			sessionStorage.tempArr = JSON.stringify(bigarrbox[index]);
			sessionStorage.transferIndex = JSON.stringify(index);

			window.location.href="./chart.html";
		})

		//为button 建立mouseenter事件
		$('.create_question_body button, .compile_body_span_button')
			.on('mouseenter',function(e) {
			self.buttonMouseEnter(e);
		})
		//为button 建立mouseleave 事件
		$('.create_question_body button, .compile_body_span_button')
			.on('mouseleave',function(e) {
			self.buttonMouseLeave(e);
		})

		//删除 填写问卷 查看数据的按钮mouseover mouseleave 事件
		//mouseenter

		$('.all_from_area_button_delete, .all_from_area_button_look_from, .all_from_area_button_look_date')
			.on('mouseenter', function(e) {
				$(e.target)
					.css("border","1px solid #3476C5");
			})

		//mouseleave

		$('.all_from_area_button_delete, .all_from_area_button_look_from, .all_from_area_button_look_date')
			.on('mouseleave', function(e) {
				$(e.target)
					.css("border-style", "none")
					.css("border-bottom", "1px solid #3476C5");
			})


		//全选左侧删除按钮mouseenter 和 mouseleave事件

		$('.all_select_area button').on('mouseenter', function(e) {
			$(e.target)
				.css('color','#3476C5')
				.css('border','1px solid #3476C5');
		})

		$(".all_select_area button").on('mouseleave', function(e) {
			$(e.target)
				.css('color','#000')
				.css('border', '1px solid #000');
		})
	}
}


var newFrom = new CreateFormIndex($("#all_form_area"),bigarrbox)