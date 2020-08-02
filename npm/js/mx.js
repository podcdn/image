var loading = false;
var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

window.onload=function (){
	load();
}

function load() //载入页面时调用
{
	token = getCookie("token");
	if(token != "")
	{
		$.post("mx.php",
		{t: 0},
		function(data,status){
			var json = eval('(' + data + ')');
			sleep(1000);
			if(json.code == 900)
			{
				testAdd();
				$(".border_main").attr("style","display:none;");
				$("#video_list").attr("style","display:block;");
			}else{
				$(".border_main").attr("style","display:none;");
				$("#login_main").attr("style","display:block;");
			}
		});
	}else{
		$(".border_main").attr("style","display:none;");
		$("#login_main").attr("style","display:block;");
	}
}



$("#log").click(function(){
	var user = $('.username').val();
	var pass = $('.password').val();
	
	//帐号密码格式检查
	if(user.length < 5)
	{
		myFunction("帐号不能长度不能小于5");
		return;
	}
	
	if(pass.length < 6)
	{
		myFunction("密钥不能长度不能小于6");
		return;
	}
	
	
	
	
	
	
	if(loading == false)
	{
		loading = true;
		$("#log").attr({"disabled":"disabled"});
		$.post("mx.php",
		{
		t: 1,
		u: user,
		p: pass
		},
		function(data,status){
		var json = eval('(' + data + ')');
		if(json.code == 900){
			myFunction("登录成功");
			$("#login_main").attr("style","display:none;");
			$("#video_list").attr("style","display:block;");
			
			return;
        }else if(json.code == 901)
		{
			myFunction("帐号或密码错误");
		}else if(json.code == 902)
		{
			myFunction("非会员更换归属地需等待" + json.msg + "分钟");
		}
		
		$("#log").removeAttr("disabled");
		loading = false;
		});
		
	}

	
});

function myFunction(tip) {
    var x = document.getElementById("tip")
    x.className = "show";
	x.innerHTML = tip;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return "";
}

function testAdd()
{
	for(i = 0; i < 40; i++)
	{
		$(".L").append('<div class="item"><a href="#{播放页面}" style="background: url(&quot;/img/('+ i +').jpg&quot;);padding-bottom: ' + calcHeight("http://127.0.0.1/img/(" + i + ").jpg") + '%;"></a> <a href="#{播放页面}" class="else" style="background: rgba(221, 179, 179, 0.3);"><s>{标签}</s> <h3>{标题}</h3> <p class="here"><i class="icon-comment">142</i> <i class="icon-images">15</i> <i class="icon-key">2</i> <!----></p></a></div>');
	}
	
}

function calcHeight(imgUrl) //计算宽高比率并保留2位小数
{
	var image = new Image();
	image.src = imgUrl;
	return (image.height / image.width * 100).toFixed(2);
}
