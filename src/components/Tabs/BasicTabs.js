import React from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ title, tabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "10px",
        p: "25px",
        mb: "15px",
      }}
    >
      {title && (
        <Typography
          variant="h5" // Changed to 'h5' for better semantics
          sx={{
            fontSize: 18,
            fontWeight: 500,
            mb: '10px',
          }}
        >
          {title}
        </Typography>
      )}

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content()} {/* Ensure content is a function returning a node */}
          </TabPanel>
        ))}
      </Box>
    </Card>
  );
}

BasicTabs.propTypes = {
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.func.isRequired, // Ensure content is a function
    })
  ).isRequired,
};
