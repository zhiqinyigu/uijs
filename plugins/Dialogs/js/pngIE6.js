



pngIE6();

function pngIE6()
{
	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);
	var img = document.getElementsByTagName("img");
	if ((version < 7) && (document.body.filters))
	{
		for(var i=0; i<img.length; i++)
		{
			if(img[i].getAttribute("_png"))
			{
				img[i].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img[i].src + "', sizingMethod='scale')";
				img[i].src = "images/gifPng.gif";
			}
		}
	}
}