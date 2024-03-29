"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Lexer_1 = __importDefault(require("./Lexer"));
var Parser_1 = __importDefault(require("./Parser"));
var code = "sum = (5 - 9) + 10;\n    log sum;\n    ";
var lexer = new Lexer_1.default(code);
lexer.lexAnalysis();
var parser = new Parser_1.default(lexer.tokenList);
var rootNode = parser.parseCode();
parser.run(rootNode);
