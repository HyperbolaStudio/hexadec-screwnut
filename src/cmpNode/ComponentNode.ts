import { Receivable } from "./Receivable";
import { AnyMap } from "../declaration/definitionMaps/AbstractDefinitionMap";
import { Component } from "../declaration/component/Component";

export class ComponentNode<PropTypesMap extends AnyMap> extends Receivable{
    constructor(
        ComponentConstructor:(new() => Component<PropTypesMap>)
    ){
        super();
    }
}