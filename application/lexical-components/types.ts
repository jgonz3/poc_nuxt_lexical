import type { Ref } from 'vue';
import type { NodeKey } from 'lexical';

export type LexicalEditorContext = {
  isEditable: Ref<boolean>;
};

export type LexicalToolbarContext = {
  isBold: Ref<boolean>;
  isItalic: Ref<boolean>;
  isUnderline: Ref<boolean>;
  isStrikethrough: Ref<boolean>;
  isSubscript: Ref<boolean>;
  isSuperscript: Ref<boolean>;
  isCode: Ref<boolean>;
  blockType: Ref<string>;
  selectedElementKey: Ref<NodeKey | null>;
  fontSize: Ref<string>;
  fontFamily: Ref<string>;
  fontColor: Ref<string>;
  bgColor: Ref<string>;
  isRTL: Ref<boolean>;
  codeLanguage: Ref<string>;
  isLink: Ref<boolean>;
};
