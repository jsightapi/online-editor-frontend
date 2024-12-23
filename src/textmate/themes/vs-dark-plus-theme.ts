// Theme data derived from:
// https: //github.com/microsoft/vscode/raw/a716714a88891cad69c0753fb95923870df295f5/extensions/theme-defaults/themes/dark_plus.json

// This satisfies the contract of IRawTheme as defined in vscode-textmate.
export default {
  name: 'Dark+ (default dark)',
  settings: [
    {
      name: 'Basic text color',
      scope: 'source.jsight',
      settings: {
        foreground: '#e6e6e6',
      },
    },
    {
      name: 'Comment line',
      scope: 'comment.line.jsight',
      settings: {
        foreground: '#7a7a7a',
      },
    },
    {
      name: 'Comment block',
      scope: 'comment.block.jsight',
      settings: {
        foreground: '#7a7a7a',
      },
    },
    {
      name: 'Todos in comments',
      scope: 'jsight.comment.todo',
      settings: {
        foreground: '#e6d200',
      },
    },
    {
      name: 'JSight technical root directives (JSIGHT, INCLUDE, ..)',
      scope: 'keyword.other.jsight.directive.root.technical',
      settings: {
        foreground: '#ff553f',
      },
    },
    {
      name: 'JSight macro directives (MACRO, PASTE)',
      scope: 'keyword.other.jsight.directive.root.technical.macro',
      settings: {
        foreground: '#ff4ffc',
      },
    },
    {
      name: 'JSight API root directives (URL, INFO, TAG, ..)',
      scope: 'keyword.jsight.directive.root.api',
      settings: {
        foreground: '#ff553f',
      },
    },
    {
      name: 'JSight meta-directives (Protocol, OperationId, ...)',
      scope: 'keyword.control.jsight.directive.meta',
      settings: {
        foreground: '#48cccb',
      },
    },
    {
      name: 'JSight method directives (incl. RPC «Method»)',
      scope: 'keyword.jsight.directive.method',
      settings: {
        foreground: '#48cccb',
      },
    },
    {
      name: 'JSight inner directives (Description, Body, Title, BaseUrl, etc..)',
      scope: 'keyword.control.jsight.directive.inner',
      settings: {
        foreground: '#b1dd58',
      },
    },
    {
      name: 'JSight various name parameters (@serverName, etc..)',
      scope: 'entity.other.attribute-name.jsight.parameter.name',
      settings: {
        foreground: '#ff8070',
      },
    },
    {
      name: 'JSight rpc method name parameter',
      scope: 'entity.other.attribute-name.jsight.parameter.name.rpc',
      settings: {
        foreground: '#6ee9e9',
      },
    },
    {
      name: 'JSight macro name parameters (@macroName)',
      scope: 'entity.other.attribute-name.jsight.parameter.name.macro',
      settings: {
        foreground: '#ff73fd',
      },
    },
    {
      name: 'JSight type name definition (TYPE @userType)',
      scope: 'entity.other.attribute-name.jsight.parameter.name.usertype.definition',
      settings: {
        foreground: '#ff8070',
      },
    },
    {
      name: 'JSight type name link (Body @userType)',
      scope: 'entity.other.attribute-name.jsight.parameter.name.usertype.link',
      settings: {
        foreground: '#ffd47f',
      },
    },
    {
      name: 'JSight directive parameter path (/cats/{id})',
      scope: 'entity.other.attribute-name.jsight.parameter.path',
      settings: {
        foreground: '#ff8070',
      },
    },
    {
      name: 'JSight directive parameter path param ({id})',
      scope: 'entity.other.attribute-name.jsight.parameter.path.param',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'JSight notation parameters (jsight, regex)',
      scope: 'constant.language.jsight.parameter.notation',
      settings: {
        foreground: '#cdb6f4',
      },
    },
    {
      name: 'JSight regex body (/.*/)',
      scope: 'string.regexp.jsight',
      settings: {
        foreground: '#cdb6f4',
      },
    },
    {
      name: 'JSight Query format parameters (htmlFormEncoded, noFormat)',
      scope: 'constant.language.jsight.parameter.query.format',
      settings: {
        foreground: '#cdb6f4',
      },
    },
    {
      name: 'JSight various string parameters (query example string, api title)',
      scope: 'string.quoted.double.jsight',
      settings: {
        foreground: '#6e9cf0',
      },
    },
    {
      name: 'JSchema basic color (punctuation)',
      scope: 'source.jschema',
      settings: {
        foreground: '#e6e6e6',
      },
    },
    {
      name: 'JSchema annotation basic',
      scope: 'support.jschema.annotation',
      settings: {
        foreground: '#a6a6a6',
      },
    },
    {
      name: 'JSchema comment line',
      scope: 'comment.line.jschema',
      settings: {
        foreground: '#7a7a7a',
      },
    },
    {
      name: 'JSchema comment block',
      scope: 'comment.block.jschema',
      settings: {
        foreground: '#7a7a7a',
      },
    },
    {
      name: 'Todos in jschema comments',
      scope: 'jschema.comment.todo',
      settings: {
        foreground: '#e6d200',
      },
    },
    {
      name: 'JSchema keys',
      scope: 'keyword.jschema.key',
      settings: {
        foreground: '#f09450',
      },
    },
    {
      name: 'JSchema usertype keys',
      scope: 'keyword.jschema.key.usertype',
      settings: {
        foreground: '#f09450',
      },
    },
    {
      name: 'JSchema string values',
      scope: 'string.quoted.double.json.jschema.value.string',
      settings: {
        foreground: '#6e9cf0',
      },
    },
    {
      name: 'JSchema number values',
      scope: 'constant.numeric.json.jschema.value.number',
      settings: {
        foreground: '#ffb756',
      },
    },
    {
      name: 'JSchema constant values',
      scope: 'constant.language.json.jschema.value.constant',
      settings: {
        foreground: '#fd8484',
      },
    },
    {
      name: 'JSchema usertype value (@cat)',
      scope: 'entity.other.attribute-name.jschema.value.subschema',
      settings: {
        foreground: '#ffd47f',
      },
    },
    {
      name: 'JSchema rules keys',
      scope: 'support.type.property-name.jschema.rule.key',
      settings: {
        foreground: '#6ab3dd',
      },
    },
    {
      name: 'JSchema rules values (all values)',
      scope: 'constant.language.jschema.rule.value',
      settings: {
        foreground: '#e4b265',
      },
    },
    {
      name: 'JSchema subschema (usertype) rule value (@cat)',
      scope: 'entity.other.attribute-name.jschema.rule.value.subschema',
      settings: {
        foreground: '#ffd47f',
      },
    },
    {
      scope: ['meta.embedded', 'source.groovy.embedded'],
      settings: {
        foreground: '#D4D4D4',
      },
    },
    {
      scope: 'emphasis',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      scope: 'strong',
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      scope: 'header',
      settings: {
        foreground: '#000080',
      },
    },
    {
      scope: 'comment',
      settings: {
        foreground: '#6A9955',
      },
    },
    {
      scope: 'constant.language',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: [
        'constant.numeric',
        'variable.other.enummember',
        'keyword.operator.plus.exponent',
        'keyword.operator.minus.exponent',
      ],
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: 'constant.regexp',
      settings: {
        foreground: '#646695',
      },
    },
    {
      scope: 'entity.name.tag',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'entity.name.tag.css',
      settings: {
        foreground: '#d7ba7d',
      },
    },
    {
      scope: 'entity.other.attribute-name',
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.class.mixin.css',
        'entity.other.attribute-name.id.css',
        'entity.other.attribute-name.parent-selector.css',
        'entity.other.attribute-name.pseudo-class.css',
        'entity.other.attribute-name.pseudo-element.css',
        'source.css.less entity.other.attribute-name.id',
        'entity.other.attribute-name.scss',
      ],
      settings: {
        foreground: '#d7ba7d',
      },
    },
    {
      scope: 'invalid',
      settings: {
        foreground: '#f44747',
      },
    },
    {
      scope: 'markup.underline',
      settings: {
        fontStyle: 'underline',
      },
    },
    {
      scope: 'markup.bold',
      settings: {
        fontStyle: 'bold',
        foreground: '#569cd6',
      },
    },
    {
      scope: 'markup.heading',
      settings: {
        fontStyle: 'bold',
        foreground: '#569cd6',
      },
    },
    {
      scope: 'markup.italic',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      scope: 'markup.strikethrough',
      settings: {
        fontStyle: 'strikethrough',
      },
    },
    {
      scope: 'markup.inserted',
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: 'markup.deleted',
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: 'markup.changed',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'punctuation.definition.quote.begin.markdown',
      settings: {
        foreground: '#6A9955',
      },
    },
    {
      scope: 'punctuation.definition.list.begin.markdown',
      settings: {
        foreground: '#6796e6',
      },
    },
    {
      scope: 'markup.inline.raw',
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      name: 'brackets of XML/HTML tags',
      scope: 'punctuation.definition.tag',
      settings: {
        foreground: '#808080',
      },
    },
    {
      scope: ['meta.preprocessor', 'entity.name.function.preprocessor'],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'meta.preprocessor.string',
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: 'meta.preprocessor.numeric',
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: 'meta.structure.dictionary.key.python',
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: 'meta.diff.header',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'storage',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'storage.type',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: ['storage.modifier', 'keyword.operator.noexcept'],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: ['string', 'meta.embedded.assembly'],
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: 'string.tag',
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: 'string.value',
      settings: {
        foreground: '#ce9178',
      },
    },
    {
      scope: 'string.regexp',
      settings: {
        foreground: '#d16969',
      },
    },
    {
      name: 'String interpolation',
      scope: [
        'punctuation.definition.template-expression.begin',
        'punctuation.definition.template-expression.end',
        'punctuation.section.embedded',
      ],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      name: 'Reset JavaScript string interpolation expression',
      scope: ['meta.template.expression'],
      settings: {
        foreground: '#d4d4d4',
      },
    },
    {
      scope: [
        'support.type.vendored.property-name',
        'support.type.property-name',
        'variable.css',
        'variable.scss',
        'variable.other.less',
        'source.coffee.embedded',
      ],
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: 'keyword',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'keyword.control',
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'keyword.operator',
      settings: {
        foreground: '#d4d4d4',
      },
    },
    {
      scope: [
        'keyword.operator.new',
        'keyword.operator.expression',
        'keyword.operator.cast',
        'keyword.operator.sizeof',
        'keyword.operator.alignof',
        'keyword.operator.typeid',
        'keyword.operator.alignas',
        'keyword.operator.instanceof',
        'keyword.operator.logical.python',
        'keyword.operator.wordlike',
      ],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'keyword.other.unit',
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      scope: ['punctuation.section.embedded.begin.php', 'punctuation.section.embedded.end.php'],
      settings: {
        foreground: '#569cd6',
      },
    },
    {
      scope: 'support.function.git-rebase',
      settings: {
        foreground: '#9cdcfe',
      },
    },
    {
      scope: 'constant.sha.git-rebase',
      settings: {
        foreground: '#b5cea8',
      },
    },
    {
      name: 'coloring of the Java import and package identifiers',
      scope: [
        'storage.modifier.import.java',
        'variable.language.wildcard.java',
        'storage.modifier.package.java',
      ],
      settings: {
        foreground: '#d4d4d4',
      },
    },
    {
      name: 'this.self',
      scope: 'variable.language',
      settings: {
        foreground: '#569cd6',
      },
    },
  ],
};
