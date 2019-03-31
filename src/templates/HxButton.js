export let component = {
	tagName:"HxButton",
	attrListener:{
		"inline":(newVal,oldVal,target) => {
			//target.slotFrom("btn-elem").classList.
		}
	}
}
export let view = {
	tagName:"button",
	revealElemSlotName:"btn-elem",
	child:[{
		tagname:"img",
		revealElemSlotName:"btn-icon-elem",
		attr:{
			src:{
				DOMSlot:"btn-icon-src"
			}
		}
	},{
		tagname:"div",
		revealElemSlotName:"btn-title-elem",
		child:{
			text:{
				DOMSlot:"btn-title",
			}
		}
	}],
};