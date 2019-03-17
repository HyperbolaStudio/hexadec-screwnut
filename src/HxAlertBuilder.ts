import {HxButtonBuilder} from './HxButtonBuilder';
export interface EmotionTypes{
    none:0;
    info:1;
    warning:2;
    error:3;
    confirm:4;
}
export interface HxAlertBuilder{
    emotion?:keyof EmotionTypes;
    iconSrc?:string;
    title:string;
    detail?:string;
    buttons?:Array<HxButtonBuilder>;
}