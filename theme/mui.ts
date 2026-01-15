import { fontQuicksand } from '@/fonts';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#E66B91',
            light: '#eb88a7',
            dark: '#a14a65',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#A8D6D4',
            light: '#b9dedc',
            dark: '#759594',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#2e2e2e',
            secondary: '#2c2c2c',
            disabled: '#ababab',
        },
        divider: '#B3B3B3',
    },

    typography: {
        fontFamily: fontQuicksand.style.fontFamily,

        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 600 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },

        body1: { fontWeight: 400 },
        body2: { fontWeight: 400 },

        button: {
            fontWeight: 600,
        },
    }
});

export default theme;