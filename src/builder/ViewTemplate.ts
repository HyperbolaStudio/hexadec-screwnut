import {SlotDeclaration} from './slot/SlotDeclaration';
import { SlotType } from './slot/SlotType';
export interface ViewTemplate<T = SlotType|SlotDeclaration>{
    tag:string;
    id:string;
    classList?:string[];
    attr:{
        [property:string]:T;
    }
    style:{
        [property:string]:T;
    }
    child:Array<ViewTemplate>|T;
}