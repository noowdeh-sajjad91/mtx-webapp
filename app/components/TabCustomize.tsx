import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MoveMentBox from './MovementBox';
import { Typography } from '@mui/material';
import Link from "next/link"
import MuiLink from "@mui/material/Link";
import SwipeableDrawer from './SwipeableDrawer';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabItem {
  label: string,
  content: React.ReactNode
}
interface TabCustomizeProps {
  // handdleShowSwipeable: Function,
  itemsTabs: TabItem[]
  style?:React.CSSProperties
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box >{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabCustomize({ style, itemsTabs }: TabCustomizeProps) {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', borderRadius: "12px" }}>
      <Box sx={{ background: "white", marginTop: "25px", marginBottom: '20px', borderRadius: "12px" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"

          sx={{
            '& .MuiTab-root': {
              textTransform: "none",
              fontSize: "12px",
              fontWeight: 500,
              // color: "#8D8D8D",
              border: "2px solid transparent",
              borderRadius: "10px",
              padding: "8px 0",
              minWidth: "77px"
              // marginRight: "10px",
            },
            '& .Mui-selected': {
              color: "#37A2D7",
              borderColor: "#37A2D7", // 👈 full border
              fontWeight: 500,
              borderRadius: "12px"
            },
            '& .MuiTabs-indicator': {
              display: "none",
            }
          }}

        >
          {
            itemsTabs.length &&
            itemsTabs.map((item, i) => (
              <Tab  style={{...style}} label={item.label} {...a11yProps(i)} key={i} />
            ))
          }

        </Tabs>
      </Box>
      {
        itemsTabs.map((item, i) => (
          <CustomTabPanel value={value} index={i} key={i}>
            {item.content}
          </CustomTabPanel>
        ))
      }
    </Box>
  );
}


