$.fn.equals = function(A) {
	return this.length == 1 && A.length == 1 && this.get(0) == A.get(0)
};
$.fn.hasParent = function(A) {
	return jQuery.inArray(A[0], this.parents()) > -1
};
function InlineForm(A) {
	this.initialize(A)
}
jQuery.extend(InlineForm.prototype, {
	defaultOptions : {
		title : "",
		submitBtnValue : "",
		showCancel : true,
		closeOnOutsideClick : true,
		formClass : "",
		timelineChangedEvents : false,
		pageHeightChangedEvents : false
	},
	overrideDefaultOptions : {},
	initialize : function(A) {
		this.options = jQuery.extend({}, this.defaultOptions);
		jQuery.extend(this.options, this.overrideDefaultOptions);
		jQuery.extend(this.options, A);
		this.$form = $('<div class="inline-form ' + this.options.formClass
				+ '"></div>');
		this.$buttonParent = $('<div class="inline-form-buttons"></div>');
		this.$button = $('<button type="button" class="btn">'
				+ this.options.submitBtnValue + "</button>");
		if (this.options.showCancel) {
			this.$cancel = $('<span class="cancel">&nbsp;</span>')
		}
		this.$form_inner = $('<div class="inline-form-inner"></div>');
		this.$input = $('<textarea class="inline-form-input"></textarea>');
		this.$inputsPrompt = $('<div class="inline-inputs-prompt"></div>');
		this.$title = $('<div class="title">' + this.options.title + "</div>");
		this.$body = $('<div class="body">' + (this.options.body || "")
				+ "</div>");
		this.initEvents()
	},
	initEvents : function() {
		this.buttonEvent = this.submitForm.pBind(this);
		this.closeEvent = this.close.pBind(this);
		this.outsideClickEvent = this.destroyFromEvent.pBind(this);
		this.timelineEvent = this.timelineEvent.pBind(this);
		if (this.options.timelineChangedEvents) {
			$.Timeline.registerTimelineEvent(this.timelineEvent)
		}
		if (this.options.pageHeightChangedEvents) {
			this.pageHeightChangedEvent = this.pageHeightChangedEvent
					.pBind(this);
			$.Timeline
					.registerPageHeightChangedEvent(this.pageHeightChangedEvent)
		}
	},
	addEvents : function() {
		this.$button.click(this.buttonEvent);
		if (this.options.showCancel) {
			this.$cancel.click(this.closeEvent)
		}
		if (this.options.closeOnOutsideClick) {
			$(window).click(this.outsideClickEvent)
		}
	},
	removeEvents : function() {
		this.$button.unbind("click", this.buttonEvent);
		if (this.options.showCancel) {
			this.$cancel.unbind("click", this.closeEvent)
		}
		if (this.options.closeOnOutsideClick) {
			$(window).unbind("click", this.outsideClickEvent)
		}
		if (this.options.timelineChangedEvents) {
			$.Timeline.unregisterTimelineEvent(this.timelineEvent)
		}
		$.Timeline
				.unregisterPageHeightChangedEvent(this.pageHeightChangedEvent)
	},
	onSendError : function(A) {
		if (this.sendNotification) {
			this.sendNotification.cancel()
		}
		(new InfoNotification())
				.setMessage(_("Whoops! Something went wrong. Please refresh the page and try again!"))
				.show();
		this.close()
	},
	onSendSuccess : function(A) {
	},
	formAction : function() {
	},
	timelineEvent : function() {
	},
	pageHeightChangedEvent : function() {
		this.positionForm()
	},
	postData : function() {
	},
	beforePost : function() {
	},
	onComplete : function() {
	},
	submitForm : function() {
		this.$button.disable();
		var A = {
			authenticity_token : twttr.form_authenticity_token
		};
		jQuery.extend(A, this.postData());
		if (this.progressNotificationText) {
			this.sendNotification = (new ProgressNotification())
					.setProgressMessage(this.progressNotificationText)
					.setCompletedMessage(_("Ok, done.")).show()
		}
		this.beforePost();
		$.ajax({
					type : "POST",
					dataType : "json",
					dataFilter : function(B) {
						if (!jQuery.trim(B)) {
							return null
						}
						return B
					},
					url : this.formAction(),
					data : A,
					error : function(B) {
						this.onSendError(B)
					}.pBind(this),
					success : function(B) {
						this.onSendSuccess(B);
						this.close();
						if (this.sendNotification) {
							this.sendNotification.done()
						}
					}.pBind(this),
					beforeSend : twttr.loading,
					complete : function() {
						twttr.loaded();
						this.onComplete()
					}.pBind(this)
				})
	},
	arrange : function() {
		var A = $('<div class="inline-form-inputs"></div>');
		if (this.options.showCancel) {
			this.$buttonParent.append(this.$cancel)
		}
		this.$buttonParent.append(this.$button);
		this.$form_inner.append(A.append(this.$title).append(this.$body)
				.append(this.$inputsPrompt).append(this.$input))
				.append(this.$buttonParent);
		this.$form.append(this.$form_inner);
		this.$form.hide();
		this.baseElement().append(this.$form)
	},
	baseElement : function() {
		return this.$parentNode || $(document.body)
	},
	show : function(A) {
		this.addEvents();
		this.$targetNode = A.targetNode;
		this.$parentNode = A.parentNode;
		this.positionForm();
		this.arrange();
		this.$form.fadeIn(100);
		this.currentlyShown = true;
		this.afterShow()
	},
	afterShow : function() {
	},
	positionForm : function() {
		var C = this.position();
		var B = C[0];
		var A = C[1];
		this.$form.css("top", B).css("left", A)
	},
	close : function() {
		this.removeEvents();
		this.$form.remove();
		this.currentlyShown = false;
		this.afterClose()
	},
	afterClose : function() {
	},
	destroyFromEvent : function(B) {
		var A = $(B.target);
		if (A.equals(this.$targetNode)
				|| jQuery.inArray(this.$targetNode.get(0), A.parents()) != -1
				|| A.equals(this.$form) || A.hasParent(this.$form)) {
			return
		}
		this.close()
	},
	position : function() {
		var A = this.$targetNode.offset();
		return [A.top, A.left]
	}
});
RetweetInlineForm = function() {
	var A = _("Yes");
	var B = _("Retweet to your followers?");
	this.initialize({
				title : B,
				submitBtnValue : A
			})
};
RetweetInlineForm.prototype = new InlineForm();
jQuery.extend(RetweetInlineForm.prototype, {
			overrideDefaultOptions : {
				formClass : "retweet-dlg",
				pageHeightChangedEvents : true
			},
			formAction : function() {
				var B = getListItemFromChild(this.$targetNode);
				var A = getStatusIdFromListItem(B);
				return "/statuses/" + A + "/retweet"
			},
			postData : function() {
				return {
					controller_name : page.controller_name,
					action_name : page.action_name
				}
			},
			beforePost : function() {
				this.close();
				twttr.setRetweetingStyles(this.$targetNode, _("Updating..."))
			},
			onSendSuccess : function(A) {
				twttr.animateStatusReplacement(this.$targetNode, A)
			},
			onComplete : function() {
				twttr.unsetRetweetingStyles(this.$targetNode)
			},
			afterShow : function() {
				getListItemFromChild(this.$targetNode).addClass("perma-hover");
				this.$targetNode.find("a").blur()
			},
			afterClose : function() {
				getListItemFromChild(this.$targetNode)
						.removeClass("perma-hover")
			},
			position : function() {
				var A = this.$targetNode.offset();
				return [parseInt(A.top) + 20, parseInt(A.left) - 220]
			}
		});
RetweetContextDlgForm = function() {
	var B = _("Close");
	var C = _("Wondering who this is?");
	var A = _("Someone you follow thought this was worth retweeting, which is why you are seeing it in your Home timeline.");
	this.initialize({
				title : C,
				body : A,
				submitBtnValue : B
			})
};
RetweetContextDlgForm.prototype = new InlineForm();
jQuery.extend(RetweetContextDlgForm.prototype, {
			overrideDefaultOptions : {
				showCancel : false,
				closeOnOutsideClick : false,
				formClass : "retweet-ctx-dlg",
				timelineChangedEvents : true
			},
			formAction : function() {
				return "/users/" + page.sessionUserId
			},
			postData : function() {
				return {
					_method : "put",
					"user[has_dismissed_retweet_contextual_dialog]" : "1"
				}
			},
			position : function() {
				return [this.$parentNode.height(), -9]
			},
			timelineEvent : function() {
				if (!this.currentlyShown) {
					this.showIfElementExists()
				}
			},
			afterShow : function() {
				this.$targetNode.css("z-index", "300");
				var A = parseInt($.cookie("retweet_contextual_count")) || 0;
				if (A < 5) {
					$.cookie("retweet_contextual_count", A + 1)
				} else {
					this.close();
					this.submitForm();
					$.cookie("retweet_contextual_count", null)
				}
			},
			afterClose : function() {
				this.$targetNode.css("z-index", null)
			},
			showIfElementExists : function() {
				var A = $(".rt-dlg");
				if (A.length) {
					this.show({
								targetNode : A,
								parentNode : A
							})
				}
			}
		});
$(document).ready(function() {
			new RetweetContextDlgForm().showIfElementExists()
		});
$(document).ready(function() {
			try {
				var A = "share-text-active";
				$(".status").each(function() {
							var E = $(this);
							var C = E.find(".retweet-link");
							var D = E.find(".share-text");
							C.hover(function() {
										D.addClass(A)
									}, function() {
										D.removeClass(A)
									})
						})
			} catch (B) {
			}
		});