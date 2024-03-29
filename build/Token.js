"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token = /** @class */ (function () {
    function Token(type, text, pos) {
        this.type = type;
        this.text = text;
        this.pos = pos;
    }
    return Token;
}());
exports.default = Token;
