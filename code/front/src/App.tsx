import { Admin, Resource, CustomRoutes, ShowGuesser } from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { i18nProvider } from "./i18nProvider";
import { MyLayout } from "./MyLayout";
import { Dashboard } from "./Dashboard";
import MyLoginPage from "./MyLoginPage";
import { UserList } from "./users";
import { Settings } from "./Settings";
import { PostList, PostCreate } from "./posts";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { darkTheme } from "./themes";

export const App = () => (
  <Admin
    i18nProvider={i18nProvider}
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={MyLoginPage}
    layout={MyLayout}
    dashboard={Dashboard}
    darkTheme={darkTheme}
    defaultTheme="light"
  >
    <Resource
      name="posts"
      list={PostList}
      create={PostCreate}
      icon={PostIcon}
    />

    <Resource
      name="users"
      list={UserList}
      show={ShowGuesser}
      recordRepresentation="name"
      icon={UserIcon}
    />
    <CustomRoutes>
      <Route path="/settings" element={<Settings />} />
    </CustomRoutes>
  </Admin>
);
