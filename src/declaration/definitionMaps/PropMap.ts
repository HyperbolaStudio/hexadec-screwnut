import { AbstractMap } from "./AbstractMap";

interface Prop{
    descriptor:PropertyDescriptor;
}

export interface PropMap extends AbstractMap<Prop>{}