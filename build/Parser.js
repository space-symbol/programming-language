"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TokenType_1 = require("./TokenType");
var StatementsNode_1 = __importDefault(require("./AST/StatementsNode"));
var NumberNode_1 = __importDefault(require("./AST/NumberNode"));
var VariableNode_1 = __importDefault(require("./AST/VariableNode"));
var BinOperationNode_1 = __importDefault(require("./AST/BinOperationNode"));
var UnarOperationNode_1 = __importDefault(require("./AST/UnarOperationNode"));
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.pos = 0;
        this.scope = {};
        this.tokens = tokens;
    }
    Parser.prototype.match = function () {
        var expected = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expected[_i] = arguments[_i];
        }
        if (this.pos < this.tokens.length) {
            var currentToken_1 = this.tokens[this.pos];
            if (expected.find(function (type) {
                return type.name === currentToken_1.type.name;
            })) {
                this.pos += 1;
                return currentToken_1;
            }
        }
        return null;
    };
    Parser.prototype.require = function () {
        var expected = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            expected[_i] = arguments[_i];
        }
        var token = this.match.apply(this, expected);
        if (!token) {
            throw new Error("\u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 " + this.pos + " \u043E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F " + expected[0].name);
        }
        return token;
    };
    Parser.prototype.parseVariableOrNumber = function () {
        var number = this.match(TokenType_1.tokenTypesList.NUMBER);
        if (number != null) {
            return new NumberNode_1.default(number);
        }
        var variable = this.match(TokenType_1.tokenTypesList.VARIABLE);
        if (variable != null) {
            return new VariableNode_1.default(variable);
        }
        throw new Error("\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0438\u043B\u0438 \u0447\u0438\u0441\u043B\u043E \u043D\u0430 " + this.pos + " \u043F\u043E\u0437\u0438\u0446\u0438\u0438");
    };
    Parser.prototype.parsePrint = function () {
        var operatorLog = this.match(TokenType_1.tokenTypesList.LOG);
        if (operatorLog != null) {
            return new UnarOperationNode_1.default(operatorLog, this.parseFormula());
        }
        throw new Error("\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0443\u043D\u0430\u0440\u043D\u044B\u0439 \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u041A\u041E\u041D\u0421\u041E\u041B\u042C \u043D\u0430 " + this.pos + " \u043F\u043E\u0437\u0438\u0446\u0438\u0438");
    };
    Parser.prototype.parseParentheses = function () {
        if (this.match(TokenType_1.tokenTypesList.LPAR) != null) {
            var node = this.parseFormula();
            this.require(TokenType_1.tokenTypesList.RPAR);
            return node;
        }
        else {
            return this.parseVariableOrNumber();
        }
    };
    Parser.prototype.parseFormula = function () {
        var leftNode = this.parseParentheses();
        var operator = this.match(TokenType_1.tokenTypesList.MINUS, TokenType_1.tokenTypesList.PLUS);
        while (operator != null) {
            var rightNode = this.parseParentheses();
            leftNode = new BinOperationNode_1.default(operator, leftNode, rightNode);
            operator = this.match(TokenType_1.tokenTypesList.MINUS, TokenType_1.tokenTypesList.PLUS);
        }
        return leftNode;
    };
    Parser.prototype.parseExpression = function () {
        if (this.match(TokenType_1.tokenTypesList.VARIABLE) == null) {
            var printNode = this.parsePrint();
            return printNode;
        }
        this.pos -= 1;
        var variableNode = this.parseVariableOrNumber();
        var assignOperator = this.match(TokenType_1.tokenTypesList.ASSIGN);
        if (assignOperator != null) {
            var rightFormulaNode = this.parseFormula();
            var binaryNode = new BinOperationNode_1.default(assignOperator, variableNode, rightFormulaNode);
            return binaryNode;
        }
        throw new Error("\u041F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 \u043E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u043E\u043F\u0435\u0440\u0430\u0442\u043E\u0440 \u043F\u0440\u0438\u0441\u0432\u043E\u0435\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 " + this.pos);
    };
    Parser.prototype.parseCode = function () {
        var root = new StatementsNode_1.default();
        while (this.pos < this.tokens.length) {
            var codeStringNode = this.parseExpression();
            this.require(TokenType_1.tokenTypesList.SEMICOLON);
            root.addNode(codeStringNode);
        }
        return root;
    };
    Parser.prototype.run = function (node) {
        var _this = this;
        if (node instanceof NumberNode_1.default) {
            return parseInt(node.number.text);
        }
        if (node instanceof UnarOperationNode_1.default) {
            switch (node.operator.type.name) {
                case TokenType_1.tokenTypesList.LOG.name:
                    console.log(this.run(node.operand));
                    return;
            }
        }
        if (node instanceof BinOperationNode_1.default) {
            switch (node.operator.type.name) {
                case TokenType_1.tokenTypesList.PLUS.name:
                    return this.run(node.leftNode) + this.run(node.rightNode);
                case TokenType_1.tokenTypesList.MINUS.name:
                    return this.run(node.leftNode) - this.run(node.rightNode);
                case TokenType_1.tokenTypesList.ASSIGN.name:
                    var result = this.run(node.rightNode);
                    var variableNode = node.leftNode;
                    this.scope[variableNode.variable.text] = result;
                    return result;
            }
        }
        if (node instanceof VariableNode_1.default) {
            if (this.scope[node.variable.text]) {
                return this.scope[node.variable.text];
            }
            else {
                throw new Error("\u041F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0441 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C " + node.variable.text + " \u043D\u0435 \u043E\u0431\u043D\u0430\u0440\u0443\u0436\u0435\u043D\u0430");
            }
        }
        if (node instanceof StatementsNode_1.default) {
            node.codeStrings.forEach(function (codeString) {
                _this.run(codeString);
            });
            return;
        }
        throw new Error('Ошибка!');
    };
    return Parser;
}());
exports.default = Parser;
