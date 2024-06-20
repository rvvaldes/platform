import { Menu } from "react-admin";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";

export const MyMenu = () => (
  <Menu>
    <Menu.DashboardItem />
    <Menu.ResourceItems />
    <Menu.Item to="/settings" primaryText="Settings" leftIcon={<SettingsIcon />} />
  </Menu>
);
