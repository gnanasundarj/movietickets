function Storage(data) {
  let { accessToken, email, name, userId, userStatus, userTypes } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("userId", userId);
  localStorage.setItem("userStatus", userStatus);
  localStorage.setItem("userTypes", userTypes);
}

export default Storage;
