import { inject, provide } from 'vue';

export type RegisterItemTypeFunc = (ref: HTMLButtonElement) => void;

const registerItemSymbol = Symbol();

export function getRegisterItemFunc(): RegisterItemTypeFunc {
  return inject<RegisterItemTypeFunc>(registerItemSymbol)!;
}
export function setRegisterItemFunc(registerItem: RegisterItemTypeFunc) {
  provide(registerItemSymbol, registerItem);
}
