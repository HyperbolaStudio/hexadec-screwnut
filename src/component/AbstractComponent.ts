import {PropMap} from '../declaration/definitionMaps/PropMap'
abstract class AbstractComponent{
    abstract build():any;
    abstract prop():PropMap;
    // abstract state();
}