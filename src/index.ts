import Lexer from "./Lexer";
import Parser from "./Parser";

const code =
    `sum = (5 - 9) + 10;
    log sum;
    `


const lexer = new Lexer(code);

lexer.lexAnalysis()

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode()

parser.run(rootNode);
