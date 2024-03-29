export default class TokenType {
    name: string;
    regex: string;


    constructor(name: string, regex: string) {
        this.name = name;
        this.regex = regex;
    }
}

export const tokenTypesList = {
    'NUMBER': new TokenType('NUMBER', '[0-9]*'),
    'VARIABLE': new TokenType('VARIABLE', '(?!log)[a-z]*'),
    'SEMICOLON': new TokenType('SEMICOLON', ';'),
    'SPACE': new TokenType('SPACE', '[ \\n\\t\\r]'),
    'ASSIGN': new TokenType('ASSIGN', '='),
    'LOG': new TokenType('LOG', 'log'),
    'PLUS': new TokenType('PLUS', '\\+'),
    'MINUS': new TokenType('MINUS', '\\-'),
    'LPAR': new TokenType('LPAR', '\\('),
    'RPAR': new TokenType('RPAR', '\\)'),
}
