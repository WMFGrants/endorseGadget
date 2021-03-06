/*  _____________________________________________________________________________
 * |                                                                             |
 * |                    === WARNING: GADGET FILE ===                      |
 * |                  Changes to this page affect many users.                    |
 * | Please discuss changes on the talk page or on [[MediaWiki_talk:Gadgets-definition]] before editing. |
 * |_____________________________________________________________________________|
 *
 * "Endorse" feature, to be used by the Wikimedia Foundation's Grants Programme, 
 */
//<nowiki>
importStylesheet('User:Jeph paul/endorse.css');

var endorseGadget = function(){
	/* Variables */
	var dialog = null;
	//The path to the config file
	this.endorseConfigPage = 'User:Jeph_paul/endorseConfig.js';
	//The time taken for the page to scroll to the feedback (milliseconds)
	var feedbackScrollTime = 2000;
	//The time taken for the feedback to disappear (milliseconds)
	var feedbackDisappearDelay = 10000;
	var api = new mw.Api();	
	var that = this;
	/* Functions */
	//To set cookie after feedback/endorsement has been added
	var setFeedbackCookie = function(){
		$.cookie('endorseFeedback',true);
	};
	
	//To add the page to the user's watch list
	var watchPage = function (){
		return api.watch(mw.config.get('wgCanonicalNamespace')+':'+mw.config.get('wgTitle'));
	};
	
	//To display error message in case of an error
	var errorMessage =  function(){
		$('.endorseError').show();
	};
	
	//To detect the type of grant/page type. IEG,PEG etc
	var grantType = function(endorseConfig){
		var grant = mw.config.get('wgTitle').split('/')[0];
		if (grant in endorseConfig){
			return endorseConfig[grant];
		}
		else{
			return endorseConfig['IEG'];
		}
	};
	//To add the endorsement thank you message
	this.endorseFeedback = function(){
		var li = $('#Endorsements').parent().next().find('li').eq(-1);
		speechBubble = li.append($('<div class="endorseSpeechBubbleContainer"></div>').html('<div class="endorseSpeechBubble">\
		<span localize="feedback">Thank You</span></div><div class="endorseArrowDown"></div>')).find('.endorseSpeechBubbleContainer');
		var width = li.css('display','inline-block').width();
		li.css('display','');
		li.css('position','relative');
		speechBubble.css('left',width/2+'px');
		$('[localize=feedback]').html(grantType(endorseConfig)['feedback']);
		$("body, html").animate({ scrollTop : li[0].offsetTop}, feedbackScrollTime);
		setTimeout(function(){ speechBubble.hide();},feedbackDisappearDelay);
	};
	//To check if feedback has been added & has been set so in the cookie
	this.checkFeedbackCookie = function(){
		if($.cookie('endorseFeedback')){
			$.cookie('endorseFeedback',null);
			return true;
		}
		else{
			return false;
		}
	};
	//To detect the language fo the page
	this.languageType = function(){
		return $(mw.config.get('wgTitle').split('/')).eq(-1)[0];
	};
	//To localize the gadget interface messages based on the language detected above
	var localizeGadget = function (localizeDict){
		$('[localize]').each(function(){
			var localizeValue = $.trim(localizeDict[$(this).attr('localize')]);
			if($(this).attr('value')){
				$(this).attr('value',localizeValue);
			}
			else if($(this).attr('placeholder')){
				$(this).attr('placeholder',localizeValue);
			}
			else{
				$(this).html(localizeValue);
			}
		});
	};
	//To remove extra spaces from the endorsement string
	var cleanupText = function(text){
			text = $.trim(text)+' ';
			var indexOf = text.indexOf('~~~~');
			if ( indexOf == -1 ){
				return text;
			}
			else{
				return text.slice(0,indexOf)+text.slice(indexOf+4);
			}	
	};
	//To create the dialog box. It is created once on the time of page load 
	var createDialog = function(){
		dialog = $( "<div id='endorseDialog'></div>" )
				.html(
					'<div localize="description" class="endorseDescription">Explaining your endorsement improves process</div>' + '\
					 <div class="error endorseHide endorseError" localize="error">An error occured</div>\
					 <textarea rows="5" cols="10" placeholder="Add your comment" id="endorseComment" class="" localize="placeholder"></textarea>\
					 <span localize="message-1" class="gadgetSignature">Your signature will be added automatically</span>\
					 <div class="gadgetControls">\
						<a href="#" localize="button-cancel" class="mw-ui-button cancel mw-ui-quiet">Cancel</a>\
						<input type="submit" localize="button-submit" class="mw-ui-button mw-ui-constructive add-endorse" disabled localize="button" value="Ok"></input>\
					 </div>'
		).dialog({
				dialogClass: 'endorseGadget',
				autoOpen: false,
				title: 'Endorse Comment',
				width: '495px',
				modal: true,
				closeOnEscape: true,
				resizable: false,
				draggable: false,
				close: function( event, ui ) {
					$('#endorseComment').val('');
				}
			});
			$('.add-endorse').click(function(){
				that.addEndorsement(cleanupText($('#endorseComment').val()));
			});
			$('#endorseComment').on('change keyup paste',function(){
				$('.endorseError').hide();
					if($(this).val()){
						$('.add-endorse').attr('disabled',false);
						$('.gadgetSignature').css('visibility','visible');
					}
					else{
						$('.add-endorse').attr('disabled',true);
						$('.gadgetSignature').css('visibility','hidden');
					}
			});
			$('#ui-dialog-title-endorseDialog').attr('localize','title');
			$('.endorseGadget .cancel').click(function(){
				dialog.dialog('close');
			});
			localizeGadget(grantType(endorseConfig));
			$('.gadgetSignature').css('visibility','hidden');
	};
	this.endorseDialog = function () {
		if (dialog === null){
			createDialog();
		}
		else{
			dialog.dialog('open');
		}
	};
	/*
	 * The main function to add the feedback/endorsement to the page. It first checks if the page has an endorsement section.
	 * If it dosent it creates a new section called Endorsements and appends the fedback/endorsement to that section, 
	 * else it appends the feedback/endorsement to existing Endorsements section. 
	 */
	this.addEndorsement = function( text ) {
		var endorseComment = '\n*' + text + '~~~~' + '\n';
		api.get({
					'format':'json',
					'action':'parse',
					'prop':'sections',
					'page':mw.config.get('wgPageName'),
				}).then(function(result){
					var sections = result.parse.sections;
					var sectionCount = 1;
					var sectionFound = false;
					for (var section in sections ){
						if (sections[section]['anchor'] == 'Endorsements' ){
							sectionFound = true;
							break;
						}
						sectionCount++;
					}
					if (sectionFound){
						api.get({
						'format':'json',
						'action':'parse',
						'prop':'wikitext',
						'page': mw.config.get('wgPageName'),
						'section': sectionCount
						}).then(function(result){
							var wikitext = result.parse.wikitext['*'];
							var endorsementSection = wikitext + endorseComment;
							api.post({
										'action' : 'edit',
										'title' : mw.config.get('wgPageName'),
										'text' : endorsementSection,
										'summary' : 'Endorsement from' + mw.user.getName(),
										'section': sectionCount,
										'token' : mw.user.tokens.values.editToken
									}).then(function(){
											$.when(watchPage()).then(function(){
											window.location.reload(true);
											setFeedbackCookie();	
										});
									},errorMessage);
							});
					}
					else{
						var sectionHeader = grantType(endorseConfig)['section-header'];
						api.post({
							action: 'edit',
							title: mw.config.get('wgPageName'),
							section: 'new',
							summary: sectionHeader,
							text: endorseComment,
							token: mw.user.tokens.get('editToken')
						}).then(function () {
								location.reload();
								feedbackCookie();
							}, errorMessage);
					}			
			},errorMessage);
	};
};
	
/* End of functions */
mw.loader.using( ['jquery.ui.dialog', 'mediawiki.api', 'mediawiki.ui'], function() {	
	$(function() {
		(function(){if ( mw.config.get('wgCanonicalNamespace') == "Grants" ) {
			var endorse = new endorseGadget();		
			var api = new mw.Api();
			var endorseConfigPageTitle = endorse.endorseConfigPage+'/'+endorse.languageType();
			//To detect if we have the gadget translations in the language of the page.
			api.get({'action':'query','titles':endorseConfigPageTitle,'format':'json'}).then(function(data){
				if(Object.keys(data.query.pages) == -1 ){
					endorseConfigPageTitle = endorse.endorseConfigPage+'/en';
				}

				var endorseConfigPageUrl = 'https://meta.wikimedia.org/w/index.php?title='+endorseConfigPageTitle+'&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400';
				//Get the config for the detected language
				jQuery.getScript(endorseConfigPageUrl).then(function(){
				endorse.endorseDialog();
				$('.wp-endorse-button').click(endorse.endorseDialog);
					if(endorse.checkFeedbackCookie()){
						endorse.endorseFeedback();
					}	
				});
			});
		}
		})();
	}); 
});

//</nowiki>
