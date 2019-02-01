var hive = {
    _addToDoc(packageName:string , packagePath:string , isAsync:boolean = true):void{
        let script:HTMLScriptElement = document.createElement('script');
        script.setAttribute('src' , packagePath);
        script.setAttribute('pkg' , packageName);
        if(isAsync){
            script.setAttribute('async' , '');
        }
        document.head.appendChild(script);
    },
    packImport(packageName:string , isAutoRequire:boolean = true , queriedBy?:string){
        if(packageName === queriedBy) return;
        let packNameDeconstructed:string[];
        packNameDeconstructed = packageName.split('.');
        let packDepth:number = packNameDeconstructed.length;
        let isRecursion:boolean = (packNameDeconstructed[packDepth-1] === '*');
        let xhr:XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET' , '/.hx-libs/manifest.json' , true);
        xhr.send();
        xhr.onreadystatechange=()=>{
            if(xhr.readyState === 4 && xhr.status === 200){
                // console.log(xhr.responseText);
                let mfJSON:any = JSON.parse(xhr.responseText);
                // console.log(xhr.responseText);
                if(mfJSON.hive === 'hx_package'){
                    let includePacks:string[] = mfJSON.includePacks;
                    let includeScripts:string[] = mfJSON.includeScripts;
                    let isPackage:boolean;
                    let currentPath:string = '/.hx-libs/hive_packages/';
                    let validPacks:string[];
                    let validScripts:string[];
                    for(let packDeconsCount:number = 0 ; packDeconsCount < packNameDeconstructed.length ; packDeconsCount++){
                        // if(includePacks.indexOf(packNameDeconstructed[packDeconsCount]) !== -1){
                        //     isPackage = true;
                        // }else if(includeScripts.indexOf(packNameDeconstructed[packDeconsCount]) !== -1){
                        //     isPackage = false;
                        // }else{
                        //     throw new Error(`Package quired "${packNameDeconstructed[packDeconsCount]}" is not exist. It is probably exist in the directory but it's not included in package manifest. `);
                        // }
                        xhr.open('GET' , `${currentPath}${packNameDeconstructed[packDeconsCount]}.json` , true);
                        xhr.send();
                        xhr.onreadystatechange=()=>{
                            if(xhr.readyState === 4 && xhr.status === 200){
                                let targetJSON:any = JSON.parse(xhr.responseText);
                                // if((targetJSON.type === "package") === isPackage){
                                if(isPackage){
                                    currentPath+=`${packNameDeconstructed[packDeconsCount]}/`;
                                    console.log(currentPath);
                                }else{
                                    let cntPackName:string = "";
                                    for(let j = 0 ; j < packDeconsCount ; j++){
                                        cntPackName += packNameDeconstructed[j];
                                    }
                                    for(let i = 0 ; i < targetJSON.requires.length ; i++){
                                        this.packImport(targetJSON.requires[i] ,true, cntPackName)
                                    }
                                    this._addToDoc(cntPackName,currentPath + packNameDeconstructed[packDeconsCount]+'.js');
                                }
                                // }else{
                                    // throw new Error(`Target type in target manifest "${targetJSON.type}" doesn't match to that in package manifest "${isPackage?"package":"script"}". `)
                                // }
                            }else if(xhr.status === 404){
                                throw new Error(`Package quired "${packNameDeconstructed[packDeconsCount]}" is not exist. It is probably exist in the directory but it doesn't have a manifest. `);
                            }
                        }
                    }
                }else{
                    throw new Error(`"${mfJSON.hive}" is not a valid manifest type. `);
                }
            }
        }
    }
}