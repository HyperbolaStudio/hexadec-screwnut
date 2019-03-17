import { HxComponent } from './HxComponent';
export class HxAlert extends HxComponent {
    constructor() {
        super();
        this.iconElement = document.createElement('img');
        this.titleElement = document.createElement('div');
        this.detailElement = document.createElement('div');
        this.buttonContainer = document.createElement('div');
        this._emotion = 'none';
    }
    set alertTitle(title) {
        this.titleElement.textContent = title;
    }
    get alertTitle() {
        return this.titleElement.textContent || '';
    }
    set alertDetail(detail) {
        this.detailElement.textContent = detail;
    }
    get alertDetail() {
        return this.detailElement.textContent;
    }
    set alertEmotion(emotion) {
        this.setAttribute('emotion', this._emotion = emotion);
    }
    get alertEmotion() {
        return this._emotion;
    }
    set alertIconSrc(iconSrc) {
        if (iconSrc) {
            this.iconElement.style.display = '';
            this.setAttribute('alert-icon-src', iconSrc);
            this.iconElement.src = iconSrc;
        }
        else {
            this.removeAttribute('alert-icon-src');
            this.iconElement.src = '';
            this.iconElement.style.display = 'none';
        }
    }
    _build(builder) {
        this.alertEmotion = builder.emotion || 'none';
        this.alertTitle = builder.title;
        this.alertDetail = builder.detail || null;
        this.alertIconSrc = builder.iconSrc || null;
        if (builder.buttons) {
            for (let b of builder.buttons) {
                let btn = document.createElement('hx-button');
                btn.build(b);
                this.buttonContainer.appendChild(btn);
            }
        }
    }
}
