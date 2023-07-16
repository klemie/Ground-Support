import { Palette, PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
        ? {
        }
        : {
            // Dark Mode
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
            uvrLightBlue: {
                main: '#4588C9',
            },
            uvrDarkBlue: {
                main: '#005EB8',
            },
            uvrYellow: {
                main: '#FFC557',
            },
            uvrRed: {
                main: '#D65B4F',
            },

        })
    }
});