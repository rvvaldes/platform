import { AuthProvider } from "react-admin";

const apiUrl = import.meta.env.VITE_URL_LOGIN;

export const authProvider: AuthProvider = {
  // called when the user attempts to log in
  login: async ({ username, password }) => {
    const request = new Request(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    const response = await fetch(request);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const { token, id } = await response.json();
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("user", JSON.stringify(id));
  },

  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    return Promise.resolve();
  },

  // called when the API returns an error
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),

  useCustomGetIdentity: () => {
    const identity = JSON.parse(localStorage.getItem("user") as string);
    return {
      identity,
      loading: !identity,
      error: !identity ? new Error("No identity found") : undefined,
    };
  },
};
