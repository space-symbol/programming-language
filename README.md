# Проект "programming-language"
 Этот проект представляет собой простой интерпретатор для собственного языка программирования, написанный на Node.js. Интерпретатор может выполнять базовые операции и операторы, определенные в языке программирования.

## Установка
Убедитесь, что у вас установлен Node.js. Если нет, вы можете скачать и установить его с [официального сайта](https://nodejs.org/en).

1. Склонируйте этот репозиторий на вашем компьютере:

``` bash
git clone https://github.com/your-username/programming-language.git
```
2. Перейдите в директорию проекта:
``` bash
cd programming-language
```
3. Установите зависимости, выполнив:
```bash
npm install
```
## Запуск
В файле index.ts в переменной code поместить ваш код на языке программирования.

Затем выполните:
```bash    
npm run start
```


## Пример
```typescript
import Lexer from "./Lexer";
import Parser from "./Parser";

const code =
`sum = 1 + 15;
log sum;
`

const lexer = new Lexer(code);

lexer.lexAnalysis()

const parser = new Parser(lexer.tokenList);

const rootNode = parser.parseCode()

parser.run(rootNode);
```

## Структура проекта
* `src/`: Директория с исходными файлами.
    * `index.ts`: Основной файл, в котором выполняется программа.
    * `Lexer.ts`: Лексический анализатор, разбивающий ввод на лексемы.
    * `Parser.ts`: Парсер, который строит абстрактное синтаксическое дерево (AST) из лексем. 
    * `Token.ts`: Файл с определением класса для представления токенов. 
    * `TokenType.ts`: Файл с перечислением типов токенов.
    * `AST/`: Поддиректория с классами узлов абстрактного синтаксического дерева. 
      * `AssignNode.ts`
      * `BinOperationNode.ts` 
      * `ExpressionNode.ts`
      * и т.д.
 
