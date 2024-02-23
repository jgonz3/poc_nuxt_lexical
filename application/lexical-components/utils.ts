import { inject } from 'vue';
import { $isAtNodeEnd } from '@lexical/selection';
import type { RangeSelection } from 'lexical';
import type { LexicalToolbarContext, LexicalEditorContext } from '~/lexical-components/types';

export function useLexicalEditor() {
  return inject('lexical-editor') as LexicalEditorContext;
}

export function useToolbarContext() {
  return inject('lexical-toolbar') as LexicalToolbarContext;
}

export function getSelectedNode(selection: RangeSelection) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();

  if (anchorNode === focusNode) {
    return anchorNode;
  }

  const isBackward = selection.isBackward();

  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

export const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};
