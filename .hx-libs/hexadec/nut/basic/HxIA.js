"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HxIA = /** @class */ (function (_super) {
    __extends(HxIA, _super);
    function HxIA() {
        var _this = _super.call(this) || this;
        var shadow = _this.attachShadow({ mode: "open" });
        var container = document.createElement("div");
        container.className = "container";
        _this.createStyle("\n            .container{\n                position:relative;\n                background:var(--hx-ia-bgcolor,var(--hx-global-bgcolor));\n                color:var(--hx-ia-fgcolor,var(--hx-global-fgcolor));\n                border:none;\n                transition:box-shadow 0.2s,border 0.2s;\n            }\n            @media(min-width:800px){\n                .container:hover{\n                    box-shadow:0 0 1px 1px var(--hx-ia-act-color,var(--hx-global-theme-color));\n                }\n            }\n            .container:active{\n                box-shadow:0 0 4px 1px var(--hx-ia-act-color,var(--hx-global-theme-color));\n            }\n        ");
        var areaSlot = document.createElement("slot");
        areaSlot.setAttribute("name", "area");
        container.appendChild(areaSlot);
        shadow.appendChild(container);
        return _this;
    }
    return HxIA;
}(HxComponent));
customElements.define("hx-ia", HxIA);
