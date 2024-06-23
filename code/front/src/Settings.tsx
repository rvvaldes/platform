import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Title, useAuthenticated } from "react-admin";

export const Settings = () => {
  useAuthenticated();
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Card sx={{ mt: 2 }}>
      <Title title="Settings" />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Profile" />
          <Tab label="Password" />
          <Tab label="Team" />
          <Tab label="Billing" />
          <Tab label="Notifications" />
        </Tabs>
      </Box>
    </Card>
  );
};
