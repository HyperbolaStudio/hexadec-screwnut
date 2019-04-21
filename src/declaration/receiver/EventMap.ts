import {AbstractDefinitionMap} from '../definitionMaps/AbstractDefinitionMap';
import { Receivable } from '../../cmpNode/Receivable';
interface EventPost<ArgType = any>{
    arg:ArgType;
    path:Receivable[]; /*TODO after implemented Receivable, change its type to Receivable*/
    postDirection:'emit'|'broadcast'|'none';
}
interface EventDeclaration{
    on:(eventPost:EventPost) => any;
}
interface EventMap extends AbstractDefinitionMap<EventDeclaration>{}

export {EventPost,EventDeclaration,EventMap};