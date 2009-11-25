Zenbox = {
	client_url : "twitter.zendesk.com",
	render : function() {
		if (!Zenbox.is_loaded || Zenbox.last_title != zenbox_params.title) {
			Zenbox.is_loaded = true;
			Zenbox.last_title = zenbox_params.title;
			var A = "//" + this.client_url + "/external/zenbox/index?x=5";
			if (zenbox_params.tag) {
				A += "&set_tags=" + escape(zenbox_params.tag)
			}
			if (zenbox_params.email) {
				A += "&set_email=" + escape(zenbox_params.email)
			}
			if (zenbox_params.subject) {
				A += "&set_subject=" + escape(zenbox_params.subject)
			}
			if (zenbox_params.subject_header) {
				A += "&subject=" + escape(zenbox_params.subject_header)
			}
			if (zenbox_params.email_header) {
				A += "&email=" + escape(zenbox_params.email_header)
			}
			if (window.location) {
				A += "&page=" + escape(window.location.href)
			}
			$("body")
					.append('<div id="zenbox_overlay" style="display:none">&nbsp;</div>');
			document.getElementById("zenbox_overlay").innerHTML = '<div id="zenbox_main"><div id="overlay_header"><span onclick="document.getElementById(\'zenbox_overlay\').style.display = \'none\';return false">close</span></div><div id="overlay_preamble"><h2 id="overlay_zenbox_title">'
					+ zenbox_params.title
					+ '</h2><p id="overlay_zenbox_text">'
					+ zenbox_params.text
					+ '</p></div><div id="overlay_loading"><center><h2><img src="//assets0.zendesk.com/images/medium_load.gif"/> Loading...</h2></center><br>&nbsp;</div><iframe src="'
					+ A
					+ '" id="zenbox_iframe" frameborder="0" scrolling="no" allowTransparency="true" style="border:0;"></iframe></div><div id="zenbox_screen" onclick="document.getElementById(\'zenbox_overlay\').style.display = \'none\';return false" ></div>';
			if (document.getElementById("zenbox_iframe").attachEvent) {
				document.getElementById("zenbox_iframe").attachEvent("onload",
						Zenbox.done)
			} else {
				if (document.getElementById("zenbox_iframe").addEventListener) {
					document.getElementById("zenbox_iframe").addEventListener(
							"load", Zenbox.done, false)
				}
			}
			document.getElementById("zenbox_screen").style.height = document.documentElement.scrollHeight
					+ "px";
			this.client_height = window.innerHeight
					|| document.documentElement.clientHeight;
			document.getElementById("zenbox_main").style.top = (0.15 * this.client_height)
					+ "px"
		}
		document.getElementById("zenbox_overlay").style.display = "block"
	},
	done : function() {
		document.getElementById("overlay_loading").style.display = "none";
		document.getElementById("zenbox_iframe").style.display = "block"
	},
	capture : function() {
	}
};