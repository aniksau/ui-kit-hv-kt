import { HvColorAny } from "@hitachivantara/uikit-styles";

const colorTokens: HvColorAny[] = [
    'primarySubtle',
    'positiveSubtle',
    'accentSubtle',
    'warningSubtle',
    'negativeSubtle',
    'infoSubtle'
];

export const getRandomColorToken = (): HvColorAny => {
    const index = Math.floor(Math.random() * colorTokens.length);
    return colorTokens[index];
}
