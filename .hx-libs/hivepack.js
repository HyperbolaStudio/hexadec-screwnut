"use strict";
var hive = {
    _addToDoc(packageName, packagePath, isAsync = true) {
        let script = document.createElement("script");
        script.setAttribute("src", packagePath);
        script.setAttribute("pkg", packageName);
        if (isAsync) {
            script.setAttribute("async", "");
        }
        document.head.appendChild(script);
    },
    packImport(packageName, isAutoRequire = true, queriedBy) {
        let packNameDeconstructed;
        packNameDeconstructed = packageName.split(".");
        let packDepth = packNameDeconstructed.length;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/.hx-libs/src.json", true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // console.log(xhr.responseText);
                let srcJSON = JSON.parse(xhr.responseText);
                for (let srcCount = 0; srcCount < srcJSON.src.length; srcCount++) {
                    let srcPath = srcJSON.src[srcCount];
                }
            }
        };
        for (let i = 0; i < packDepth; i++) {
        }
    }
};
