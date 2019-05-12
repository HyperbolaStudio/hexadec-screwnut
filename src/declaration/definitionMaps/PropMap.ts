import { AbstractDefinitionMap, AnyMap } from "./AbstractDefinitionMap";

interface Prop<T>{
    initVal:T;
    beforeWritten:(oldVal:T,writtenVal:T) => T;
    beforeRead:(readVal:T) => T;
}

export type PropMap<PropTypesMap extends AnyMap> = {
    [K in keyof PropTypesMap]:Prop<PropTypesMap[K]>;
}