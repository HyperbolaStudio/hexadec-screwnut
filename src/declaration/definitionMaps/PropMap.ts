import { AbstractMap } from "./AbstractMap";

interface Prop{
    descriptor:PropertyDescriptor;
    bindStateName:string;
}

export interface PropMap extends AbstractMap<Prop>{}