class HxTest extends HTMLElement{
    constructor(){
        super();
        const shadow=this.attachShadow({mode:"open"});
        let para=document.createElement("p");
        let attrPara=document.createElement("p");
        let style=document.createElement("style");
        attrPara.className="attr-para";
        para.textContent="Hello World! Change the CSS property '--hx-test-hov-color' and hover me!";
        style.textContent= `
            p:hover{
                background-color: var(--hx-test-hov-color);
            }
            p{
                transition:background-color 0.2s;
                background-color:unset;
            }
            p:active{
                background-color:unset;
            }
        `;
        shadow.appendChild(para);
        shadow.appendChild(attrPara);
        shadow.appendChild(style);
        let testSlot=document.createElement("slot");
        testSlot.setAttribute("name","test");
        shadow.appendChild(testSlot);
    }
    connectedCallback(){
        console.log("hxtest connected");
    }
    static get observedAttributes() {
        return ['test','hov-color'];
    }
    attributeChangedCallback(name, oldValue, newValue){
        console.log(`hxtest attr "${name}" has changed from "${oldValue}" to "${newValue}"`);
        const shadow=this.shadowRoot;
        if(name=='test'){
            const attrPara=shadow.querySelector(".attr-para");
            attrPara.textContent=`Attr 'test' is ${this.getAttribute("test")}`;     
        }
    }
}
customElements.define("hx-test",HxTest);