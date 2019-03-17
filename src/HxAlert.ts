import {HxComponent} from './HxComponent';
import {HxAlertBuilder,EmotionTypes} from './HxAlertBuilder';
export class HxAlertBar extends HxComponent{
    constructor(){
        super();
    }
    iconElement:HTMLImageElement = document.createElement('img');
    titleElement:HTMLDivElement = document.createElement('div');
    detailElement:HTMLDivElement = document.createElement('div');
    buttonContainer:HTMLDivElement = document.createElement('div');
    
    //MVVM getter/setter
    _emotion:keyof EmotionTypes = 'none';
    set alertTitle(title:string){
        this.titleElement.textContent = title;
    }
    get alertTitle():string{
        return this.titleElement.textContent||'';
    }

    set alertDetail(detail:string|null){
        this.detailElement.textContent = detail;
        
    }
    get alertDetail():string|null{
        return this.detailElement.textContent;
    }

    set alertEmotion(emotion:keyof EmotionTypes){
        this.setAttribute('emotion',this._emotion = emotion);
    }
    get alertEmotion():keyof EmotionTypes{
        return this._emotion;
    }

    set alertIconSrc(iconSrc:string|null){
        if(iconSrc){
            this.iconElement.style.display = '';
            this.setAttribute('alert-icon-src',iconSrc);
            this.iconElement.src = iconSrc
        }else{
            this.removeAttribute('alert-icon-src');
            this.iconElement.src = '';
            this.iconElement.style.display = 'none';
        }
    }

    build(builder:HxAlertBuilder):void{
        this.alertEmotion = builder.emotion||'none';
        this.alertTitle = builder.title;
        this.alertDetail = builder.detail||null;
        this.alertIconSrc = builder.iconSrc||null;
    }
}