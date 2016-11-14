
var box = [[{title:'表单的名词',time:'2016',state:'go'}]];
sessionStorage.bigArr = JSON.stringify(box);
var arrbox = JSON.parse(sessionStorage.bigArr); //将总数组中的数据提取到arrbox

console.log(arrbox)




// 根据总数组,创建表单的目录.


function CreateFormIndex(contain) {
	this.contain = contain;
	this.init();//初始化
	$(document).off();//解除所有绑定事件防止重复绑定
	this.event();

}

CreateFormIndex.prototype = {
	init:function(){
		if(arrbox.length === 0) {
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
		for(var i = 0,length = arrbox.length; i < length; i++) {
			var div = $('<div>')
						.addClass('all_form_area_div')
						.appendTo(this.contain);

			var check = $('<input>')
						.attr('type','checkbox')
						.css('margin-right','20px')
						.appendTo(div);

			var	title = $('<span>')
						.html(arrbox[i][0].title)
						.addClass('all_form_area_title')
						.appendTo(div);

			var time = $("<span>")
						.html(arrbox[i][0].time)
						.addClass('all_form_area_time')
						.appendTo(div);

			switch(arrbox[i][0].state) {
				case 'ready':
					var state = $("<span>")
								.html('已结束')
								.addClass("all_from_area_state")
								.appendTo(div);

					var buttonA = $("<button>")
								.html('编辑')
								.addClass('all_from_area_button_compile')
								.appendTo(div);

					var buttonB = $('<button>')
								.html("删除")
								.addClass('all_from_area_button_delete')
								.appendTo(div);
					var buttonC = $("<button>")
								.html('查看数据')
								.addClass('all_from_area_button_look_date')
								.appendTo(div);
					break;

				case 'no':
					var state = $("<span>")
								.html('未发布')
								.addClass("all_from_area_state")
								.appendTo(div);

					var buttonA = $("<button>")
								.html('编辑')
								.addClass('all_from_area_button_compile')
								.appendTo(div);

					var buttonB = $('<button>')
								.html("删除")
								.addClass('all_from_area_button_delete')
								.appendTo(div);
					var buttonD = $('<button>')
								.html("查看问卷")
								.addClass('all_from_area_button_look_from')
								.appendTo(div);
						break;

				case 'go':
					var state = $("<span>")
								.html('正在发布')
								.css('color','#AEEEA6')
								.addClass("all_from_area_state")
								.appendTo(div);

					var buttonA = $("<button>")
								.html('编辑')
								.addClass('all_from_area_button_compile')
								.appendTo(div);

					var buttonB = $('<button>')
								.html("删除")
								.addClass('all_from_area_button_delete')
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
			 		arrbox[index] = null;
			 	}
			 })

			//将要删除的数组变为null 然后把为null的全部删除.重新载入样式生成

			var newarr = [];
			for(let i = 0;i<arrbox.length; i ++) {
				if(arrbox[i] !== null) {
					newarr.push(arrbox[i])
				} 
			}

			arrbox = newarr;
			self.init();
		})


		//单个删除

		$('.all_from_area_button_delete').on('click', function(e){ //找到点击按钮所在的div是整个all_form_area第几个,对应相应的数组
			var target = e.target,
				index = $('#all_form_area').find('.all_form_area_div').index($(e.target).parent());
			
			arrbox.splice(index,1);
			self.init();
			self.event();
		})
		//新建问卷,点击后跳转到新建问卷页面
		$('.compile_body_span_button,.create_question_body button').on('click', function(){
			window.open('./compile.html')
		})
	}
}

var newFrom = new CreateFormIndex($("#all_form_area"),arrbox)
