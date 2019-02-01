class HxButton extends HxIA{
    constructor(){
        super();
        let shadow:any = this.shadowRoot;
        let style:any = shadow.querySelector('style');
        style.textContent=`
            .container{
                position:relative;
                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));
                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));
                border:none;
                box-shadow:0 0 4px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
                transition:box-shadow 0.2s,border 0.2s;
            }
            @media(min-width:800px){
                .container:hover{
                    box-shadow:0 0 8px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
                }
            }
            .container:active{
                box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-secondary-color));
            }
        `;
        let container:any = shadow.querySelector('.container');
        container.style.borderRadius = '2px';
        container.style.padding='0 10px';
        container.style.margin='8px';
        container.style.lineHeight='36px';
        container.style.backgroundColor = 'var(--hx-button-bgcolor,var(--hx-global-theme-main-color))';
        container.style.color = 'var(--hx-button-fgcolor,var(--hx-global-theme-fgcolor))';
        container.style.alignItems = 'center';
        container.querySelector('slot[name = area]').remove();
        let imgSlot:HTMLSlotElement = document.createElement('slot');
        imgSlot.setAttribute('name' , 'img');
        let titleSlot:HTMLSlotElement = document.createElement('slot');
        titleSlot.setAttribute('name' , 'title');
        container.appendChild(imgSlot);
        container.appendChild(titleSlot);
    }
    attributeChangedCallback(name:string , oldVal:string , newVal:string){
        if(name === 'inline'){
            let shadow:any = this.shadowRoot;
            let container:any = shadow.querySelector('.container');
            if(newVal === null){
                container.style.display = 'flex';
            }else{
                container.style.display = 'inline-flex';
            }
        }
    }
}
customElements.define("hx-button" , HxButton);