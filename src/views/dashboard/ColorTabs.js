import React from 'react';
import { Box, Chip, Tab, Tabs } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// icons
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import PanoramaTwoToneIcon from '@mui/icons-material/PanoramaTwoTone';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import RecentActorsTwoToneIcon from '@mui/icons-material/RecentActorsTwoTone';

import FileItem from './FileItem'; // Import the FileItem component

// TabPanel definition
function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box
                    sx={{
                        p: 3
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

// Tab properties for accessibility
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function ColorTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                variant="scrollable"
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                sx={{
                    mb: 3,
                    '& a': {
                        minHeight: 'auto',
                        minWidth: 10,
                        py: 1.5,
                        px: 1,
                        mr: 2.2,
                        color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    },
                    '& a.Mui-selected': {
                        color: theme.palette.primary.main
                    },
                    '& a > svg': {
                        mb: '0px !important',
                        mr: 1.1
                    }
                }}
            >
                <Tab
                    component={Link}
                    to="#"
                    icon={<PersonOutlineTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Pending Trailers{' '}
                            <Chip
                                label="8"
                                size="small"
                                sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                            />
                        </>
                    }
                    {...a11yProps(0)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<RecentActorsTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Approved Trailers{' '}
                            <Chip
                                label="11"
                                size="small"
                                sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                            />
                        </>
                    }
                    {...a11yProps(1)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PeopleAltTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Pending Fullength{' '}
                            <Chip
                                label="01"
                                size="small"
                                sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                            />
                        </>
                    }
                    {...a11yProps(2)}
                />
                <Tab
                    component={Link}
                    to="#"
                    icon={<PanoramaTwoToneIcon sx={{ fontSize: '1.3rem' }} />}
                    label={
                        <>
                            Approved Fullength{' '}
                            <Chip
                                label="01"
                                size="small"
                                sx={{ color: theme.palette.secondary.main, background: theme.palette.secondary.light, ml: 1.3 }}
                            />
                        </>
                    }
                    {...a11yProps(3)}
                />
            </Tabs>
            <TabPanel value={value} index={0}>
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Trailer1.mp4" uploadDate="2024-08-20" />
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Trailer2.mp4" uploadDate="2024-08-19" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Trailer3.mp4" uploadDate="2024-08-18" />
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Trailer4.mp4" uploadDate="2024-08-17" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Fullength1.mp4" uploadDate="2024-08-16" />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <FileItem thumbnail="https://via.placeholder.com/100" filename="Fullength2.mp4" uploadDate="2024-08-15" />
            </TabPanel>
        </>
    );
}
