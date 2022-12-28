function Storage(data) {
  let { mail, userID, username, usertype } = data;

  localStorage.setItem("email", mail);
  localStorage.setItem("name", username);
  localStorage.setItem("userId", userID);
  localStorage.setItem("userTypes", usertype);
}

export default Storage;
