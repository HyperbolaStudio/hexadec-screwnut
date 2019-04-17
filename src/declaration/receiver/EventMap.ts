import {AbstractMap} from '../definitionMaps/AbstractMap';
interface EventPost{
    arg:any;
    path:any /*TODO after implemented Receivable, change its type to Receivable*/
    postDirection:'emit'|'broadcast';
}
interface EventDeclaration{
    on:(eventPost:EventPost) => any;
}
interface EventMap extends AbstractMap<EventDeclaration>{}

export {EventPost,EventDeclaration,EventMap};