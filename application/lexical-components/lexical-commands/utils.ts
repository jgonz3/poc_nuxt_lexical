import { ref } from 'vue';

export const font = {
  families: [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Trebuchet MS',
    'Verdana',
  ] as FontFamily[],
  sizes: [
    '10px',
    '11px',
    '12px',
    '13px',
    '14px',
    '15px',
    '16px',
    '17px',
    '18px',
    '19px',
    '20px',
  ] as FontSize[],
};

export function useFontCommandLogic() {
  const fontFamily = ref<FontFamily>('Arial');
  const fontSize = ref<string>('16px');

  function setValue(kind: 'font-family', value: FontFamily): void;
  function setValue(kind: 'font-size', value: FontSize): void;
  function setValue(kind: 'font-family' | 'font-size', value: FontFamily | FontSize) {
    if (kind === 'font-family') {
      fontFamily.value = value as FontFamily;
    } else {
      fontSize.value = value as FontSize;
    }
  }

  return {
    fontFamily,
    fontSize,
    setValue,
  };
}

export type FontFamily =
  | 'Arial'
  | 'Courier New'
  | 'Georgia'
  | 'Times New Roman'
  | 'Trebuchet MS'
  | 'Verdana';
export type FontSize =
  | '10px'
  | '11px'
  | '12px'
  | '13px'
  | '14px'
  | '15px'
  | '16px'
  | '17px'
  | '18px'
  | '19px'
  | '20px';
