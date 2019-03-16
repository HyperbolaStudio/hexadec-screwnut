export interface HxButtonBuilder{
    btnIconSrc?:string;
    btnTitle:string;
    isPreferred?:boolean;
    onclick?:(e:MouseEvent)=>void;
}