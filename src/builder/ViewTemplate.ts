import {SlotDeclaration} from './slot/SlotDeclaration';
import { BasicTypes } from '../BasicTypes';
export interface ViewTemplate<T = BasicTypes|SlotDeclaration>{
    tag:string;
    id:string;
    classList?:string[];
    attr?:{
        [property:string]:T;
    }
    style?:{
        [property:string]:T;
    }
    child?:Array<ViewTemplate>|T;
}