import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, List } from '@mui/material';
// import { linearProgressClasses } from '@mui/material/LinearProgress';

// assets
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
// const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 10,
//     borderRadius: 30,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//         backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.light : '#fff'
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//         borderRadius: 5,
//         backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
//     }
// }));

const CardStyle = styled(Card)(({ theme }) => ({
    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.primary.light,
    marginBottom: '22px',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: '157px',
        height: '157px',
        background: theme.palette.mode === 'dark' ? theme.palette.dark.dark : theme.palette.primary[200],
        borderRadius: '50%',
        top: '-105px',
        right: '-96px'
    }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel() {
    // const theme = useTheme();

    return <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}></Grid>;
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
    // const theme = useTheme();

    return (
        <CardStyle>
            <CardContent sx={{ p: 2 }}>
                <List sx={{ p: 0, m: 0 }}></List>
                <LinearProgressWithLabel value={80} />
            </CardContent>
        </CardStyle>
    );
};

export default memo(MenuCard);
