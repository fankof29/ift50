
var transfer = { //将传递来的函数存放到这个对象中,避免全局污染.
	arrbox:[],
	index:null
}



//获取sessionStorage.tempArr 如果为null 进行创建数组 如果不为null使用编辑数组


function listenArr() { 

	if(JSON.parse(sessionStorage.tempArr) === null) {
		$('.compile_button').click(function(){ // 单选 多选 文本 三个按钮 点击出现 再次点击隐刺
			$('.compile_space_hidebutton').toggle();
		});

		$('.compile_space_hidebutton').hide();
		transfer.arrbox = [];
		var area = $('#createArea');

		var compile = new CompileDateCenter (transfer.index,area);
	} else {
		var tempArr = JSON.parse(sessionStorage.tempArr) //传递过来一个非空对象的时候 将要修改的tempArr 赋值到 transfer.arrboxz
		transfer.arrbox = tempArr;
		transfer.index = JSON.parse(sessionStorage.transferIndex);
		var area = $('#createArea');
		//生成数组中的内容
		console.log(transfer.arrbox)
		var compile = new CompileDateCenter (transfer.index,area);

		$('.compile_button').click(function(){ // 单选 多选 文本 三个按钮 点击出现 再次点击隐刺
			$('.compile_space_hidebutton').toggle();
		});

		$('.compile_space_hidebutton').hide();
	}
}


window.onload = function(){
	listenArr();
}