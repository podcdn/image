var loading = false;
var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

window.onload=function (){
	load();
}

function load() //����ҳ��ʱ����
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
	
	//�ʺ������ʽ���
	if(user.length < 5)
	{
		myFunction("�ʺŲ��ܳ��Ȳ���С��5");
		return;
	}
	
	if(pass.length < 6)
	{
		myFunction("��Կ���ܳ��Ȳ���С��6");
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
			myFunction("��¼�ɹ�");
			$("#login_main").attr("style","display:none;");
			$("#video_list").attr("style","display:block;");
			
			return;
        }else if(json.code == 901)
		{
			myFunction("�ʺŻ��������");
		}else if(json.code == 902)
		{
			myFunction("�ǻ�Ա������������ȴ�" + json.msg + "����");
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
	for(i = 0; i < 35; i++)
	{
		$(".L").append('<div class="item"><a href="#{����ҳ��}" style="background: url(&quot;/img/('+i+').jpg&quot;);padding-bottom: 75%;"></a> <a href="#{����ҳ��}" class="else" style="background: rgba(221, 179, 179, 0.3);"><s>{��ǩ}</s> <h3>{����}</h3> <p class="here"><i class="icon-comment">142</i> <i class="icon-images">15</i> <i class="icon-key">2</i> <!----></p></a></div>');
	}
	
}

function calcHeight(imgUrl) //�����߱��ʲ�����2λС��
{
	var image = new Image();
	image.src = imgUrl;
	return (image.height / image.width * 100).toFixed(2);
}
