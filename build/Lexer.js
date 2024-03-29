"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = __importDefault(require("./Token"));
var TokenType_1 = require("./TokenType");
var Lexer = /** @class */ (function () {
    function Lexer(code) {
        this.pos = 0;
        this.tokenList = [];
        this.code = code;
    }
    Lexer.prototype.lexAnalysis = function () {
        while (this.nextToken()) { }
        this.tokenList = this.tokenList.filter(function (token) { return token.type.name !== TokenType_1.tokenTypesList.SPACE.name; });
        return this.tokenList;
    };
    Lexer.prototype.nextToken = function () {
        if (this.pos >= this.code.length) {
            return false;
        }
        var tokenTypesValues = Object.values(TokenType_1.tokenTypesList);
        for (var i = 0; i < tokenTypesValues.length; i++) {
            var tokenType = tokenTypesValues[i];
            var regex = new RegExp('^' + tokenType.regex);
            var result = this.code.substr(this.pos).match(regex);
            if (result && result[0]) {
                var token = new Token_1.default(tokenType, result[0], this.pos);
                this.pos += result[0].length;
                this.tokenList.push(token);
                return true;
            }
        }
        throw new Error("\u041D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 " + this.pos + " \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430 \u043E\u0448\u0438\u0431\u043A\u0430");
    };
    return Lexer;
}());
exports.default = Lexer;
