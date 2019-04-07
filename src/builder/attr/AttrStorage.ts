import {BasicTypes} from '../../BasicTypes';
export interface AttrStorage{
    val:BasicTypes;
    bindStateName?:string;
    onChanged?:(newVal:string,oldVal:string) => void;
}