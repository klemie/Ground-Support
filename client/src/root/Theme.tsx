import { Palette, PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
        ? {
            uvr: {
                lightBlue: '#4588C9',
                darkBlue: '#005EB8',
                yellow: '#FFC557',
                red: '#D65B4F'
            }
        }
        : {
            primary: {
                main: '#4588C9',
            },
            secondary: {
                main: '#f48fb1',
            },
            background: {
                default: '#22272E',
                paper: '#23282F',
            },
            uvr: {
                lightBlue: '#4588C9',
                darkBlue: '#005EB8',
                yellow: '#FFC557',
                red: '#D65B4F'
            }
        })
    }
});