/**
 * @license
 * Copyright (C) 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview
 * Registers a language handler for SQL.
 *
 *
 * To use, include prettify.js and this file in your HTML page.
 * Then put your code in an HTML tag like
 *      <pre class="prettyprint lang-sql">(my SQL code)</pre>
 *
 *
 * http://savage.net.au/SQL/sql-99.bnf.html is the basis for the grammar, and
 * http://msdn.microsoft.com/en-us/library/aa238507(SQL.80).aspx and
 * http://meta.stackoverflow.com/q/92352/137403 as the bases for the keyword
 * list.
 *
 * @author mikesamuel@gmail.com
 */

PR['registerLangHandler'](
    PR['createSimpleLexer'](
        [
         // Whitespace
         [PR['PR_PLAIN'],       /^[\t\n\r \xA0]+/, null, '\t\n\r \xA0'],
         // A double or single quoted, possibly multi-line, string.
         [PR['PR_STRING'],      /^(?:"(?:[^\"\\]|\\.)*"|'(?:[^\'\\]|\\.)*')/, null,
          '"\'']
        ],
        [
         // A comment is either a line comment that starts with two dashes, or
         // two dashes preceding a long bracketed block.
         [PR['PR_COMMENT'], /^(?:--[^\r\n]*|\/\*[\s\S]*?(?:\*\/|$))/],
         [PR['PR_KEYWORD'], /^(?:ADD|ADMIN|ALL|ALTER|AND|ANY|APPLY|AS|ASC|AUTHORIZATION|BACKUP|BEFORE|BEGIN|BETWEEN|BIS|BODY|BREAK|BROWSE|BULK|BY|CASCADE|CASE|CHAR|CHECK|CHECKPOINT|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMN|COMMIT|COMMITTED|COMPUTE|CONNECT|CONSTRAINT|CONTAINS|CONTAINSTABLE|CONTINUE|CONVERT|CREATE|CROSS|CURRENT|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|CURSOR|CYCLE|DANN|DATABASE|DATE|DBCC|DEALLOCATE|DECLARE|DEFAULT|DELETE|DELETING|DENY|DEPTH|DESC|DISK|DISTINCT|DISTRIBUTED|DOUBLE|DROP|DUMMY|DUMP|EACH|ELSE|ELSIF|END|ERRLVL|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXISTS|EXIT|FETCH|FILE|FILLFACTOR|FIRST|FOLLOWING|FOR|FOREIGN|FOUND|FREETEXT|FREETEXTTABLE|FROM|FULL|FUNCTION|GOTO|GRANT|GROUP|HAVING|HOLDLOCK|IDENTIFIED|IDENTITY|IDENTITYCOL|IDENTITY_INSERT|IF|IMMEDIATE|IN|INDEX|INNER|INSERT|INSERTING|INSTEAD|INT|INTEGER|INTERSECT|INTO|IS|ISOLATION|JOIN|KEY|KILL|LEFT|LEVEL|LIKE|LINENO|LOAD|LOOP|MATCH|MATCHED|MERGE|MULTISET|NATURAL|NATIONAL|NOCHECK|NONCLUSTERED|NOCYCLE|NOT|NOTFOUND|NULL|NULLIF|NUMBER|OF|OFF|OFFSETS|ON|OPEN|OPENDATASOURCE|OPENQUERY|OPENROWSET|OPENXML|OPTION|OR|ORDER|OUT|OUTER|OVER|PACKAGE|PARTITION|PERCENT|PIVOT|PLAN|PRECEDING|PRECISION|PRIMARY|PRINT|PRIOR|PROC|PROCEDURE|PUBLIC|QUOTA|RAISERROR|READ|READTEXT|RECONFIGURE|RECORD|REFERENCES|REPEATABLE|REPLACE|REPLICATION|RESOURCE|RESTORE|RESTRICT|RETURN|REVOKE|RIGHT|ROLE|ROLLBACK|ROW|ROWCOUNT|ROWGUIDCOL|ROWID|ROWNUM|ROWTYPE|RULE|SAVE|SCHEMA|SEARCH|SELECT|SERIALIZABLE|SESSION_USER|SEQUENCE|SET|SETUSER|SHUTDOWN|SIBLINGS|SOLANGE|SOME|SONST|START|STATISTICS|SYSDBA|SYSTEM_USER|TABLE|TABLESPACE|TEMPORARY|TEXTSIZE|THEN|TO|TOP|TRAN|TRANSACTION|TRIGGER|TRUNCATE|TSEQUAL|TYPE|UNBOUNDED|UNCOMMITTED|UNION|UNIQUE|UNLIMITED|UNPIVOT|UPDATE|UPDATETEXT|UPDATING|USE|USER|USING|VALUES|VARCHAR|VARCHAR2|VARYING|VIEW|WAITFOR|WENN|WHEN|WHERE|WHILE|WIEDERHOLE|WITH|WITHIN|WRITETEXT|XML)(?=[^\w-]|$)/i, null],
         // A number is a hex integer literal, a decimal real literal, or in
         // scientific notation.
         [PR['PR_LITERAL'],
          /^[+-]?(?:0x[\da-f]+|(?:(?:\.\d+|\d+(?:\.\d*)?)(?:e[+\-]?\d+)?))/i],
         // An identifier
         [PR['PR_PLAIN'], /^[a-z_][\w-]*/i],
         // A run of punctuation
         [PR['PR_PUNCTUATION'], /^[^\w\t\n\r \xA0\"\'][^\w\t\n\r \xA0+\-\"\']*/],
	 // A type
         [PR['PR_TYPE'], /^(?:BOOLEAN|CHAR|DATE|INT|INTEGER|NUMBER|VARCHAR|VARCHAR2)(?=[^w-]|$)/i, null]
        ]),
    ['pseudo','plsql','oracle11']);
