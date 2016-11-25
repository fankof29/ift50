/*
*创建一个数据生成函数,里面有一个数组,数组包含所有选项的内容,
*采用二位数组的方法,来对应数组的更新.
*
*根据 点击目标(单选 复选 文本) 进行不同的数据生成,然后加入到总数组中.然后调用样式生成函数.
*
*本部分由样式生成 数据生成 增删改上移动,下移动 四个部分组成.
**/


// 数据生成函数

function CompileDateCenter(index,createArea){
	this.index = index; //代表总数组的第几个数组
	this.createArea =  createArea;//存放创建后的选项的区域
	this.init();//初始化,对transfer.arrbox进行处理 
	this.even();
	//加载所有的触发事件
}

CompileDateCenter.prototype = {
	 //用来存储信息

	save:false,//用来判断是否保存
	init:function() {
		if(this.index !== null) {//如果是将传递进来的编辑
			$('.compile_title_box input').val(transfer.arrbox[0].title),
			$('#date_box input').val(transfer.arrbox[0].time);

			transfer.arrbox.splice(0,1);
			this.createBox(transfer.arrbox);
		} else {
			this.createBox(transfer.arrbox);
		}
	},
	radiobox:function() {//生成单选所需要的                                                   资料,然后将资料加入到总数组,然后把总数组传递给生成样式的函数.
		var self = this;

		var obj = {
			type:'radio',
			name:'单选',
			box:['选项','选项'],
			data:[0,0]
		};

		transfer.arrbox.push(obj);
		console.log(transfer.arrbox)
		self.createBox(transfer.arrbox);
	},

	checkbox:function() {
		var self = this;

		var obj = {
			type:'checkbox',
			name:'多选',
			box:['选项','选项','选项','选项'],
			data:[0, 0, 0, 0]
		};
		transfer.arrbox.push(obj);

		self.createBox(transfer.arrbox);
	},

	textbox:function() {
		var self = this;

		var obj = {
			type:'textarea',
			name:'文本',
			text:'',
			box:['填写','未填写'],
			data:[0, 0]
		};
		transfer.arrbox.push(obj);

		self.createBox(transfer.arrbox);
	},

	createBox:function(arr){ //根据传递进来的数组创建选项
		var self = this
		//解除所有绑定事件防止重复绑定
		
		self.createArea.html('');
		for(let i = 0,length = arr.length; i < length; i ++) {
			switch(arr[i].type) {
				case 'radio'://如果是radio 创建一个radio选项 然后加入到createArea中.
					var div = $('<div></div>')
						.addClass('createArea_main_box')
						.appendTo(self.createArea); //总的div
					var text = $('<div></div>')//存放标题的div
						.html('Q'+ (i+1))
						.appendTo(div);
					var nametxt = $('<input>')
						.addClass('createArea_input_title')
						.attr('value',arr[i].name)
						.css('marginBottom','10px')
						.appendTo(text);

					for(let a = 0, length = arr[i].box.length; a < length; a++) { //生成选项
												var divinput = $('<div>').appendTo(div);//存放选项的div
						var inputbox = $('<input>')
							.attr('value',arr[i].box[a])
							.addClass('createArea_input_select')
							.css('marginBottom','10px')
							.appendTo(divinput);
						var delespan = $("<span>")
							.css('cursor','pointer')
							.appendTo(divinput)
						var red_x = $('<b>')
							.addClass("red_x")
							.appendTo(delespan);
					}
					//如果是第一个 不生成上移 如果是最后一个不生成下移
					$('<div>') //添加一个div 作为点击后增加一个选项 只限于多选 和单选出现
						.addClass('createArea_add_select')
						.html('增加选项')

						.appendTo(div)
					if (i === 0) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
					} 
					else if (i === arr.length - 1) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
					} else {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
	
					}
					

					break;

				case 'checkbox':
					var div = $('<div></div>')//checkbox的创建思路跟radio一样
						.addClass('createArea_main_box')
						.appendTo(self.createArea); //总的div
					var text = $('<div></div>')//存放标题的div
						.html('Q'+ (i+1))
						.appendTo(div);
					var nametxt = $('<input>')
						.addClass('createArea_input_title')
						.attr('value',arr[i].name)
						.css('marginBottom','10px')
						.appendTo(text);

					for(let a = 0, length = arr[i].box.length; a < length; a++) { //生成选项
												var divinput = $('<div>').appendTo(div);//存放选项的div
						var inputbox = $('<input>')
							.attr('value',arr[i].box[a])
							.addClass('createArea_input_select')
							.css('marginBottom','10px')
							.appendTo(divinput);
						var inuptDele = $('<span>')
							.html('点击删除')
							.css('cursor','pointer')
							.appendTo(divinput);
					}
					//如果是第一个 不生成上移 如果是最后一个不生成下移
					$('<div>') //添加一个div 作为点击后增加一个选项 只限于多选 和单选出现
						.addClass('createArea_add_select')
						.html('增加选项')

						.appendTo(div)
					if (i === 0) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
					} 
					else if (i === arr.length - 1) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
					} else {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
	
					}
					break;
				case 'textarea':
					var div = $('<div></div>')//创建textarea部分
						.addClass('createArea_main_box')
						.appendTo(self.createArea); //总的div
					var text = $('<div></div>')//存放标题的div
						.html('Q'+ (i+1))
						.appendTo(div);
					var nametxt = $('<input>')
						.addClass('createArea_input_title')
						.attr('value',arr[i].name)
						.css('marginBottom','10px')
						.appendTo(text);


					var textAreaBox = $('<textarea>')
						.addClass('createArea_textArea')
						.appendTo(div)

					if (i === 0) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
					} 
					else if (i === arr.length - 1) {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
					} else {
						var movebutton = $('<div>')
							.addClass('createArea_button_text')
							.appendTo(div);
						var deletebutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_delete')
							.html('删除')
							.appendTo(movebutton);
						var copybutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_copy')
							.html('复用')
							.appendTo(movebutton);
						var downbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_down')
							.html('下移')
							.appendTo(movebutton);
						var upbutton = $('<span>')
							.addClass('createArea_four_button')
							.addClass('createArea_four_button_up')
							.html('上移')
							.appendTo(movebutton);
					
					}
					break;
				default:
					alert("创建选项出现了错误.");
			}
		}
	},

	//上移 下移 复用 删除

	goUp:function(e){// 讲数组中的数据交换,然后重新生成样式
		var self = this;

		var target = e.target,
			parent = $('#createArea').find('.createArea_main_box'),
			index = $(parent).index($(target).parent().parent());

		var a = transfer.arrbox[index],
			b = transfer.arrbox[index - 1]; //前一个

		transfer.arrbox[index - 1] = a;
		transfer.arrbox[index] = b;

		//重新生成样式
		self.createBox(transfer.arrbox);
	},

	goDown:function(e) {// 讲数组中的数据交换,然后重新生成样式 思路同goUp

		var self = this;

		var target = e.target,
			parent = $('#createArea').find('.createArea_main_box'),
			index = $(parent).index($(target).parent().parent());
		
		if(index === 0 && parent.length === 1){//当只有一个选项的时候 不能下移
			return false;
		} 
		else {
			var a = transfer.arrbox[index],
			b = transfer.arrbox[index + 1]; //前一个

			transfer.arrbox[index + 1] = a;
			transfer.arrbox[index] = b;

			//重新生成样式
			self.createBox(transfer.arrbox);
		}
		

	},
	goCopy:function(e) {//复制当前数组,然后重新生成

		var self = this;

		var target = e.target,
			parent = $('#createArea').find('.createArea_main_box'),
			index = $(parent).index($(target).parent().parent());
		
		var a = $.extend(true,{},transfer.arrbox[index])

		transfer.arrbox.splice(index,0,a);

		self.createBox(transfer.arrbox);
	
		
	},
	godelete:function(e) {//删除当前数组内容,然后重新生成样式

		var self = this;

		var target = e.target,
			parent = $('#createArea').find('.createArea_main_box'),
			index = $(parent).index($(target).parent().parent());

		transfer.arrbox.splice(index,1);
		if(index === 0 & transfer.arrbox.length === 1) {//如果是最后一个,直接清空
			self.createArea.html('');
		}else {
			self.createBox(transfer.arrbox);
		}
	
		
		
	},
	spanDelete:function(e){//点击删除事件
		var self = this;
		var target = e.target;

			var sitebox = $(target).parent().parent().find('div'),
				bigsitebox = $(target).parent().parent().parent().find('.createArea_main_box');

			var index = $(sitebox).index($(target).parent()),
				bigIndex = $(bigsitebox).index($(target).parent().parent());

			if (index > 0) {
				index = index -1;
			}else {
				index = 0
			}
			console.log(index)
			transfer.arrbox[bigIndex].box.splice(index, 1);
			self.createBox(transfer.arrbox);
		
	},
	addselect:function(e){//增加一个选项
		var self = this;
		var target = e.target;
		var index = $('.createArea_main_box')
			.index($(target).parent());

			transfer.arrbox[index].box.push('选项');
			transfer.arrbox[index].data.push(0);
			console.log(transfer.arrbox)
			self.createBox(transfer.arrbox);
		
	},
	changeTitle:function(e) {//更改选项标题名词
		var target = e.target,
			index = $('.createArea_main_box').index($(target).parent().parent());

		transfer.arrbox[index].name = $(target).val();
		
	},
	changeSelect:function(e) {//更改选择的名称
		var target = e.target,
			bigIndex = $('.createArea_main_box').index($(target).parent().parent()),
			index = $(target).parent().parent().find('div').index($(target).parent())

		transfer.arrbox[bigIndex].box[index-1] = $(target).val();
		
	},
	saveButton:function() {//点击后保存数据到sessionStorage.bigArr
		//保存标题名词 和事件
		var title = $('.compile_title_box input').val(),
			date = $('#date_box input').val();

		if(title === '') {
			alert('请输入标题');
		} else if (date === '') {
			alert('请选择日期');
		} else if (this.save === true) {
			return false;
		} else {
			var obj = { //记录标题和日期
				title:title,
				time:date,
				state:"on"
			}
			//更新数组,根据有无index选择,将新数组加入到bigArr的哪个位置.
			transfer.arrbox.unshift(obj)

			if(this.index === null) {//添加到总数组的后面
				var oldBigArr = JSON.parse(sessionStorage.bigArr);

				oldBigArr.push(transfer.arrbox);
				jsonOldBigArr = JSON.stringify(oldBigArr);

				sessionStorage.bigArr = jsonOldBigArr;
				sessionStorage.tempArr = null;
				this.save = true;
				alert('保存成功');
			} else {
				var oldBigArr = JSON.parse(sessionStorage.bigArr);

				
				oldBigArr[this.index] = transfer.arrbox;
				jsonOldBigArr = JSON.stringify(oldBigArr);

				sessionStorage.bigArr = jsonOldBigArr;
				sessionStorage.tempArr = null;
				sessionStorage.transferIndex = null;
				this.save = true;
				alert('保存成功');
			}

			
		}

	},
	//发布数据
	publishButton:function() {
		if(this.save === false) {
			alert('保存数据后再发布')
		} else {
			this.save =false;
			window.location.href="./index.html";		
		}
	},

	even:function() {
		var self = this;
		$(document).on('click','.createArea_input_select + span',function(e){
			self.spanDelete(e);
		})

		//建立增加选项事件
		$(document).on('click','.createArea_add_select',function(e) {
			self.addselect(e);
		})

		//上移事件

		$(document).on('click','.createArea_four_button_up',function(e){
			self.goUp(e);
		});

		//下移事件
		$(document).on('click','.createArea_four_button_down',function(e) {
			self.goDown(e);
		});

		//复用事件

		$(document).on('click','.createArea_four_button_copy',function(e){
			self.goCopy(e);
		});

		//删除事件

		$(document).on('click','.createArea_four_button_delete',function(e){
			self.godelete(e);
		});


		//文字
		//更改单选 多选 文本的名称
		$(document).on('change','.createArea_input_title',function(e){
			self.changeTitle(e);
		
		});

		//更改选项 的名字

		$(document).on('change','.createArea_input_select',function(e) {
			self.changeSelect(e);
		});

		//单选事件
		$(document).on('click','#compile_radio',function(){
			self.radiobox();
		})
		//多选事件
		$(document).on('click',"#compile_multiple",function(){
			self.checkbox();
		})
		//文本框事件

		$(document).on("click","#compile_textbox", function(){
			self.textbox();
		})

		//点击后提交数据
		$(document).on('click','.button_style_white',function(){
			self.saveButton();
			
		})
		//点击后发布数据
		$(document).on('click','.button_style_blue', function() {
			self.publishButton();
		})
		//单选 多选 文本框 生成按钮的mouseenter事件带来的样式更改
		$(document).on('mouseenter','#compile_radio, #compile_multiple, #compile_textbox', function(e) {
			$(e.target)
			.css('border',"1px solid #3476C5")
			.css("color", "#3476C5");
		})

		//单选 多选 文本框 生成按钮的mouseleave事件带来的样式更改
		$(document).on("mouseleave", "#compile_radio, #compile_multiple, #compile_textbox", function(e) {
			$(e.target)
			.css("border", "1px solid #000")
			.css("color", "#000");
		})

		//保存问卷 发布问卷的mouseenter带来的样式更改
		$(document).on("mouseenter", '.button_style_white, .button_style_blue', function(e) {
			$(e.target)
			.css('box-shadow','1px 1px 3px #3476C5');
		})

		//保存问卷 发布问卷的mouseleave带来的样式更改
		$(document).on('mouseleave', '.button_style_white, .button_style_blue', function(e) {
			$(e.target)
			.css('box-shadow','none');
		})

		//上移 复用 删除 下移 mouseenter 和 mouseleave 事件.
		$(document).on("mouseenter mouseleave", ".createArea_four_button",function() {
			$(this).toggleClass("bule_text ");
		})

		//增加选项按钮 mouseenter 加入一个阴影 mouseleave去掉阴影

		$(document).on("mouseenter mouseleave", ".createArea_add_select", function() {
			$(this).toggleClass("box_shadow")
		})
	}
}