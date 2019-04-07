import {ComponentBuilder} from '../builder/ComponentBuilder';
import { BasicTypes } from '../BasicTypes';
export function attr<T extends ComponentBuilder>(
    bindStateName?:string,
    onChanged?:(newVal:string,oldVal:string) => void
){
    return (target:T,name:string) => {
        const descriptor = Object.getOwnPropertyDescriptor(target,name);
        if(descriptor){
            let val:BasicTypes = descriptor.value;
            target.attrMap[name] = {val,bindStateName,onChanged};
        }
    }
}