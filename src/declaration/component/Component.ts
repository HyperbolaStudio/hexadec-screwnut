import {PropMap} from '../definitionMaps/PropMap'
import { EventMap } from '../receiver/EventMap';
import { ComponentNode } from '../../cmpNode/ComponentNode';
import { AnyMap } from '../definitionMaps/AbstractDefinitionMap';
export abstract class Component<PropTypesMap extends AnyMap>{
    static componentNodeConstructor:(new() => ComponentNode<any>)|null = null;
    builtComponent:ComponentNode<PropTypesMap>|null = null;

    constructor(builtComponent:ComponentNode<PropTypesMap>){
        this.builtComponent = builtComponent;
    }
    abstract receivers():EventMap;
    abstract props():PropMap<PropTypesMap>;
}