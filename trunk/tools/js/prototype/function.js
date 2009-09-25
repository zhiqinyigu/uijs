function toggleDisabled(id) {	//ÇÐ»»ÊÇ·ñ¿É²Ù×÷
	for (i=0; i<$$(id).length; i++)
	{
		$$(id)[i].disabled=!$$(id)[i].disabled;
	}
}
/*function toggleCss(id,name,data) {
	var tmp = $$(id)[0].getStyle(name);
	*switch ($$(id)[0].style.color.value) {
		case data:
			$$(id)[0].style.color = data ;
			break;
		case tmp:
			$$(id)[0].style.color = data ;
			break;
	}*
	$$(id)[0].style.color = data ;
}*/