import {HxButtonBuilder} from './HxButtonBuilder'
export interface HxAlertBuilder{
    emotion?:'info'|'warning'|'error'|'confirm';
    iconSrc?:string;
    title:string;
    detail?:string;
    buttons?:Array<HxButtonBuilder>;
}