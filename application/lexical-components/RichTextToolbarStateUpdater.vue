<script setup lang="ts">
import { onMounted } from 'vue';
import {
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import { $isParentElementRTL, $getSelectionStyleValueForProperty } from '@lexical/selection';
import { $isHeadingNode } from '@lexical/rich-text';
import { ListNode, $isListNode } from '@lexical/list';
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { $isCodeNode, CODE_LANGUAGE_MAP } from '@lexical/code';
import { $isLinkNode } from '@lexical/link';
import { useLexicalComposer } from 'lexical-vue';
import { getSelectedNode, blockTypeToBlockName, useToolbarContext } from './utils';

const editor = useLexicalComposer();

const {
  bgColor,
  fontColor,
  fontFamily,
  fontSize,
  isBold,
  isCode,
  codeLanguage,
  isLink,
  isRTL,
  isItalic,
  isStrikethrough,
  isSubscript,
  blockType,
  selectedElementKey,
  isUnderline,
  isSuperscript,
} = useToolbarContext();

function updateToolbar() {
  const selection = $getSelection();
  if ($isRangeSelection(selection)) {
    const anchorNode = selection.anchor.getNode();
    let element =
      anchorNode.getKey() === 'root'
        ? anchorNode
        : $findMatchingParent(anchorNode, e => {
            const parent = e.getParent();
            return parent !== null && $isRootOrShadowRoot(parent);
          });

    if (element === null) {
      element = anchorNode.getTopLevelElementOrThrow();
    }

    const elementKey = element.getKey();
    const elementDOM = editor.getElementByKey(elementKey);

    // Update text format
    isBold.value = selection.hasFormat('bold');
    isItalic.value = selection.hasFormat('italic');
    isUnderline.value = selection.hasFormat('underline');
    isStrikethrough.value = selection.hasFormat('strikethrough');
    isSubscript.value = selection.hasFormat('subscript');
    isSuperscript.value = selection.hasFormat('superscript');
    isCode.value = selection.hasFormat('code');
    isRTL.value = $isParentElementRTL(selection);

    // Update links
    const node = getSelectedNode(selection);
    const parent = node.getParent();
    isLink.value = $isLinkNode(parent) || $isLinkNode(node);

    if (elementDOM !== null) {
      selectedElementKey.value = elementKey;
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
        const type = parentList ? parentList.getListType() : element.getListType();
        blockType.value = type;
      } else {
        const type = $isHeadingNode(element) ? element.getTag() : element.getType();
        if (type in blockTypeToBlockName) {
          blockType.value = type as keyof typeof blockTypeToBlockName;
        }
        if ($isCodeNode(element)) {
          const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
          codeLanguage.value = language ? CODE_LANGUAGE_MAP[language] || language : '';
          return;
        }
      }
    }
    // Hande buttons
    fontSize.value = $getSelectionStyleValueForProperty(selection, 'font-size', '15px');
    fontColor.value = $getSelectionStyleValueForProperty(selection, 'color', '#000');
    bgColor.value = $getSelectionStyleValueForProperty(selection, 'background-color', '#fff');
    fontFamily.value = $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial');
  }
}

// unregisters onDestroy using returned callback
onMounted(() => {
  mergeRegister(
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    }),
    editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        // editor = newEditor;
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    )
  );
});
</script>

<!-- eslint-disable-next-line -->
<template />
