import { HxComponent } from './HxComponent';
export class HxInteractionTarget extends HxComponent {
    constructor() {
        super();
        let shadow = this.shadowRoot ? this.shadowRoot : this.attachShadow({ mode: 'open' });
        if (this.shadowRoot) {
            shadow = this.shadowRoot;
        }
        ;
        this.container = document.createElement('div');
        this.container.className = 'container';
        shadow.appendChild(this.container);
    }
}
