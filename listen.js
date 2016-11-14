var hehe = [{
			type:'radio',
			name:'单选',
			box:['选项','选项']
		},{
			type:'radio',
			name:'单选',
			box:['选项','选项']
		}];

sessionStorage.tempArr = JSON.stringify(hehe)

var transfer = { //将传递来的函数存放到这个对象中,避免全局污染.
	arrbox:[]
}



//判断是编辑 还是新建.

//获取sessionStorage.tempArr 如果为null 进行创建数组 如果不为null使用编辑数组


function listenArr() { 

	if(sessionStorage.tempArr === undefined || sessionStorage.tempArr === null) {
		$('.compile_button').click(function(){ // 单选 多选 文本 三个按钮 点击出现 再次点击隐刺
			$('.compile_space_hidebutton').toggle();
		});

		$('.compile_space_hidebutton').hide();

		var area = $('#createArea');

		var compile = new CompileDateCenter (area);
	} else {
		var tempArr = JSON.parse(sessionStorage.tempArr) //传递过来一个非空对象的时候 将要修改的tempArr 赋值到 transfer.arrboxz
		transfer.arrbox = tempArr;
		var area = $('#createArea');
		//生成数组中的内容
		var compile = new CompileDateCenter (area);

		$('.compile_button').click(function(){ // 单选 多选 文本 三个按钮 点击出现 再次点击隐刺
			$('.compile_space_hidebutton').toggle();
		});

		$('.compile_space_hidebutton').hide();
	}
}


window.onload = function(){
	listenArr();
}