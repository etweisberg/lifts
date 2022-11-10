export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.access_token) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}
