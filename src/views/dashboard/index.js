// material-ui
import { Grid } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SimpleTabs from './SimpleTabs';
import { gridSpacing } from 'store/constant';
import ColorTabs from './ColorTabs';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
    <>
        <MainCard title="Aggregator Domain">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <SubCard title="Upload Trailer movie">
                        <SimpleTabs />
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SubCard title="Upload Fullength movie">
                        <SimpleTabs />
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>
        <MainCard title="Manage requests and approvals">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={12}>
                    <SubCard title="Color Tab">
                        <ColorTabs />
                    </SubCard>
                </Grid>
            </Grid>
        </MainCard>{' '}
    </>
);

export default SamplePage;
