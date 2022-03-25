import {marked} from 'marked';
import sanitizeHtml from 'sanitize-html';
import clsx from 'clsx';
import './style.scss';

interface DescriptionType {
  markdown?: string;
  className?: string;
}

const formatMarkdownContent = (input: string) => {
  const rows = input.split(/\r?\n/);
  const adjustedRows = rows.map((row: string) => {
    const trimmedRow = row.trimStart();
    const firstSymbolOfRow = trimmedRow[0];
    const needToTrim = firstSymbolOfRow && !['*', '-'].includes(firstSymbolOfRow);
    if (needToTrim) {
      return trimmedRow;
    }
    return row;
  });
  return adjustedRows.join('\n');
};

const markdownToHtml = (markdown: string) => {
  const html = marked.parse(markdown, {gfm: true});
  const sanitizedHtml = sanitizeHtml(html);
  return sanitizedHtml;
};

const renderer = {
  link: (href: string, title: string, text: string) => {
    return '<a target="_blank" href="' + href + '" title="' + title + '">' + text + '</a>';
  },
};

marked.use({renderer});

export const Description = ({markdown = '', className}: DescriptionType) => {
  const formattedMarkdown = formatMarkdownContent(markdown);
  const html = markdownToHtml(formattedMarkdown);

  return (
    <div
      className={clsx('description', 'markdown', className)}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
};
