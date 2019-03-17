import { HxComponent } from './HxComponent';
export class HxAlertBar extends HxComponent {
    constructor() {
        super();
        this.iconElement = document.createElement('img');
        this.titleElement = document.createElement('div');
        this.detailElement = document.createElement('div');
        this.buttonContainer = document.createElement('div');
        //MVVM getter/setter
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
    build(builder) {
        this.alertEmotion = builder.emotion || 'none';
        this.alertTitle = builder.title;
        this.alertDetail = builder.detail || null;
        this.alertIconSrc = builder.iconSrc || null;
    }
}
