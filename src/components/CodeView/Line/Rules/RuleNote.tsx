import React from 'react';
import {countWords} from '../../utils/countWords';
import {formatNotes} from '../../utils/formatNotes';

interface IRuleNote {
  note?: string;
  collapsedRules?: boolean;
}

export const RuleNote = ({note, collapsedRules}: IRuleNote) => {
  const wordsCount = countWords(note);
  let notes;

  if (wordsCount <= 3 || !collapsedRules) {
    notes = formatNotes(note);
  } else {
    notes = <>{note?.split(' ').slice(0, 3).join(' ')}</>;
  }

  const isEllipsisShown = wordsCount > 3 && collapsedRules;

  return (
    <>
      {' '}
      {notes}
      {isEllipsisShown && <div className="notes-collapsed">...</div>}
    </>
  );
};
