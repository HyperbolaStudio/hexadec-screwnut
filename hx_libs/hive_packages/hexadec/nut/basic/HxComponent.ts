class HxComponent extends HTMLElement{
    componentTagName:string = '';
    constructor(){
        super();

        //shadow attachment
        this.attachShadow({mode:'open'});

        //add style handler links list
        let styleLinksList:HTMLDivElement = document.createElement('div');
        
    }
}
class NutDesignDeclaration{
    _CSSFilesMap:Map<string,string> = new Map();
    constructor(){
        //test code
        this._CSSFilesMap.set('hx-button','./hx_libs/hive_packages/hexadec/nut/basic/HxButton.css')
        //test code end
    }
    get CSSFilesMap():Map<string,string>{
        return this._CSSFilesMap
    }
}