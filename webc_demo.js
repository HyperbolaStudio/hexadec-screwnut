class HxWebcDemo extends HTMLElement{
	constructor(){
		super();
		const shadow=this.attachShadow({mode:"open"});
		const content=document.createElement("div");
		content.textContent=this.getAttribute("content");
		shadow.appendChild(content);
	}
	connectedCallback(){
		const shadow=this.attachShadow({mode:"open"});
		shadow.chileNodes[0].textContent=this.getAttribute("content");
	}
	attributeChangedCallback(attr,oldValue,newValue){
		if(attr="content"){
			shadow.chileNodes[0].textContent=newValue;
		}
	}
}
customElements.define("hx-demo",HxWebcDemo);
	