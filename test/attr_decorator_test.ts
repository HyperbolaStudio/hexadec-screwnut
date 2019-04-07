import {ComponentBuilder} from '../src/builder/ComponentBuilder';
import {attr} from '../src/decorators/attr';
export class A extends ComponentBuilder{
    build(){
        return {
            tag:'div',
            id:'a',
        }
    }
    @attr()
    x = 5;
}