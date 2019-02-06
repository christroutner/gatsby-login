import "isomorphic-fetch";

const SERVER = `http://localhost:5000`;

// Detect if the app is running in a browser.
export const isBrowser = () => typeof window !== "undefined";

// Get user data from localstorage
export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {};

// Save user data to localstorage
const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

export const handleLogin = async ({ username, password }) => {
  // Try to authenticate.
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    };
    const data = await fetch(`${SERVER}/auth/`, options);
    const users = await data.json();
    //console.log(`users: ${JSON.stringify(users, null, 2)}`);

    //console.log(`name: ${users.user.username}`)
    //console.log(`token: ${users.token}`)

    return setUser({
      username: users.user.username,
      jwt: users.token
    })
  } catch (err) {
    // If something goes wrong with auth, return false.
    return false;
  }
};

// Return true if user is logged in. Otherwise false.
export const isLoggedIn = () => {
  const user = getUser();

  return !!user.username;
};

export const logout = callback => {
  setUser({});
  callback();
};
