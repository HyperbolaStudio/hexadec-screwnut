import { AbstractDefinitionMap } from "./AbstractDefinitionMap";

interface Prop{
    descriptor:PropertyDescriptor;
    bindStateName:string;
}

export interface PropMap extends AbstractDefinitionMap<Prop>{}