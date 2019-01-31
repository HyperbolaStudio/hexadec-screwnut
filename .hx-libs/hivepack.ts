var hive = {
    _addToDoc(packageName:string , packagePath:string , isAsync:boolean = true):void{
        let script:HTMLScriptElement = document.createElement("script");
        script.setAttribute("src" , packagePath);
        script.setAttribute("pkg" , packageName);
        if(isAsync){
            script.setAttribute("async" , "");
        }
        document.head.appendChild(script);
    },
    packImport(packageName:string , isAutoRequire:boolean = true , queriedBy?:string){
        let packNameDeconstructed:string[];
        packNameDeconstructed = packageName.split(".");
        let packDepth:number = packNameDeconstructed.length;
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET" , "/.hx-libs/src.json" , true);
        xhr.send();
        xhr.onreadystatechange=()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                // console.log(xhr.responseText);
                let srcJSON:any = JSON.parse(xhr.responseText);
                for(let srcCount = 0 ; srcCount < srcJSON.src.length ; srcCount++){
                    let srcPath = srcJSON.src[srcCount];

                }
            }
        }
        for(let i = 0 ; i < packDepth ; i++){

        }
    }
}