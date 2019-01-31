class HxIA extends HxComponent{
    constructor(){
        super();
        const shadow:ShadowRoot = this.attachShadow({mode:"open"});
        let container:HTMLDivElement = document.createElement("div");
        container.className = "container";
        this.createStyle(`
            .container{
                position:relative;
                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
                border:none;
                transition:box-shadow 0.2s,border 0.2s;
            }
            @media(min-width:800px){
                .container:hover{
                    box-shadow:0 0 1px 1px var(--hx-ia-act-color,var(--hx-global-theme-color));
                }
            }
            .container:active{
                box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-color));
            }
        `);
        let areaSlot:HTMLSlotElement = document.createElement("slot");
        areaSlot.setAttribute("name","area");
        container.appendChild(areaSlot);
        shadow.appendChild(container);
    }
}
customElements.define("hx-ia",HxIA);