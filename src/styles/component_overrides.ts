const components = {
    MuiContainer: {
        styleOverrides: {
            root: {
                paddingLeft: '5px',
                paddingRight: '5px',
            }
        }
    },
    MuiTypography: {
        styleOverrides: {
            root: {
                lineHeight: "1",
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                boxShadow: "0px 1px 3px black",
                lineHeight: "1",
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                fontSize: '1rem',
                width: 'calc(min(100%, 100%))',
                height: '36px',
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                fontSize: '1rem',
                width: 'calc(min(100%, 150px))',
                height: '40px',
                lineHeight: "1",
                textTransform: 'none',
            },
        },
    },
}

export default { components };