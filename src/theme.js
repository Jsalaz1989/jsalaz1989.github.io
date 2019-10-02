import { createMuiTheme } from '@material-ui/core/styles';
// import * as Colors from '@material-ui/core/colors';


const theme = createMuiTheme({
	typography: {
        // useNextVariants: true,
        // fontFamily: "'Segoe', sans-serif",
        fontFamily: 'Roboto',
	},
	palette: {
		type: 'dark',
		primary: {
			light: '#b596c5',
            main: '#2a2a2a',
            // main: '#3a3a3a',
			dark: '#424242',
			contrastText: '#ffffff',
		},
		secondary: {
			light: '#ffcccb',
			main: '#b596c5',
			dark: '#ba6b6c',
			contrastText: '#000000',
        },
    },
    overrides: {
        MuiTab: { 
            root: {
                '&:hover': {
                    textDecoration: 'none',
                },
            },
            wrapper: {
                '&:hover': {
                    color: 'white',
                },
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                position: 'static',
                // minHeight: 'auto',
                boxShadow: 'none',
                zIndex: 9999,
                marginBottom: 13
            },
        },
        MuiDialog: {
            paper: {
                width: '500px',
                opacity: '0.9',
                backgroundColor: '#2a2a2a',
                color: 'white'
                // fullWidth: 'true',
                // maxWidth: 'sm',
            },
        },
        MuiDialogTitle: {
            root: {
                textAlign: 'center',
                color: '#b596c5',
                zIndex: 999,
            },
        },
        MuiDrawer: {
            root: {
                position: 'absolute',

            },
            paper: {
                width: 240,
                // marginTop: 85, //85
                // paddingTop: 85,
                // position: 'absolute',
                paddingBottom: 100,
                // top: '10',
                top: '85px',


            },
        },
        MuiListItemIcon: {
            root: {
                top: '0',
                position: 'static',
            },
        },
        MuiButton: {
            root: {
                color: '#b596c5',
            }
        },
        // MuiDivider: {
        //     root: {
        //       marginTop: 1,
        //     },
        // },
        MuiIconButton: {
            // root: {
            //     padding: 0,
            // },            
            sizeSmall: {
                padding: 0,
            },
        },
    },
})

//TODO: figure out which keys are never used
const gateStyle = {
    fill: theme.palette.primary.light, 
    fillOpacity: '0.75', 
    fillRule: 'evenodd', 
    stroke: '#000000', 
    gateStrokeWidth: '3',
    textStrokeWidth: '1', 
    textFontSize: '10', 
    textFontWeight: '100',
    strokeLinecap: 'square', 
    strokeLinejoin: 'miter', 
    strokeOpacity: '1', 
    strokeMiterlimit: '4', 
    strokeDasharray: 'none'
}


export { theme, gateStyle }