var endorseConfig = {
	"IEG":{
			"title":"<translate><!--T:1-->
						Endorse this idea</translate>",
			"description":"<translate><!--T:2-->
						Why do you support this idea?</translate>",
			"placeholder":"<translate><!--T:3-->
						Click here to add your comment</translate>",
			"button-submit":"<translate><!--T:4-->
						Endorse</translate>",
			"button-cancel":"<translate><!--T:5-->
						Cancel</translate>",
			"feedback":"<translate><!--T:6-->
						Thank you for adding your endorsement!</translate>",
			"section-header":"<translate><!--T:7-->
						Endorsements</translate>",
			"message-1":"<translate><!--T:8-->
						Your signature will be automatically added to your comment.</translate>",
			"error":"<translate><!--T:9-->
						There was an error, please try again</translate>",
	}
};
/*
Custom interface messages for other grant types can be be enabled by copying the above dictionary in full
and editing the values to be changed. The key has to be the name of the set of pages in the namespace Grants:
Eg:
https://meta.wikimedia.org/wiki/Grants:IdeaLab/Build/Tools, here it would be just 'Idealab' or in the case of 
meta.wikimedia.org/wiki/Grants:IEG, it would be 'IEG'

Lets say the dict looks like 
var endorseConfig = {
	"IEG":{
			"title":"<translate><!--T:1-->
						Endorse this idea</translate>",
			"description":"<translate><!--T:2-->
						Why do you support this idea?</translate>",
			"placeholder":"<translate><!--T:3-->
						Click here to add your comment</translate>",
			"button-submit":"<translate><!--T:4-->
						Endorse</translate>",
			"button-cancel":"<translate><!--T:5-->
						Cancel</translate>",
			"feedback":"<translate><!--T:6-->
						Thank you for adding your endorsement!</translate>",
			"section-header":"<translate><!--T:7-->
						Endorsements</translate>",
			"message-1":"<translate><!--T:8-->
						Your signature will be automatically added to your comment.</translate>",
			"error":"<translate><!--T:9-->
						There was an error, please try again</translate>",
	}
};
So now on adding Idealab the it would look like

var endorseConfig = {
	"IEG":{
			"title":"<translate><!--T:1-->
						Endorse this idea</translate>",
			"description":"<translate><!--T:2-->
						Why do you support this idea?</translate>",
			"placeholder":"<translate><!--T:3-->
						Click here to add your comment</translate>",
			"button-submit":"<translate><!--T:4-->
						Endorse</translate>",
			"button-cancel":"<translate><!--T:5-->
						Cancel</translate>",
			"feedback":"<translate><!--T:6-->
						Thank you for adding your endorsement!</translate>",
			"section-header":"<translate><!--T:7-->
						Endorsements</translate>",
			"message-1":"<translate><!--T:8-->
						Your signature will be automatically added to your comment.</translate>",
			"error":"<translate><!--T:9-->
						There was an error, please try again</translate>",
	}
	"IdeaLab":{
			"title":"<translate><!--T:1-->
						Endorse this budding idea</translate>",
			"description":"<translate><!--T:2-->
						Why do you support it?</translate>",
			"placeholder":"<translate><!--T:3-->
						Comments </translate>",
			"button-submit":"<translate><!--T:4-->
						Endorse</translate>",
			"button-cancel":"<translate><!--T:5-->
						Cancel</translate>",
			"feedback":"<translate><!--T:6-->
						Thank you for adding the feedback!</translate>",
			"section-header":"<translate><!--T:7-->
						Endorsements</translate>",
			"message-1":"<translate><!--T:8-->
						Your signature will be added to your comment.</translate>",
			"error":"<translate><!--T:9-->
						Opps we hit the wall, srry</translate>",
	}
};

the text in the gadget can be made to show different messages for different grant types etc.