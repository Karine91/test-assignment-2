import {
  firebase,
  googleAuthProvider,
} from "../utils/firebase";

class User {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  login() {
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((data) => {
        this.user = data.user;
        this.isAuthenticated = true;
      })
      .catch((err) => console.log(err));
  }

  logout() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this.isAuthenticated = false;
      })
      .catch((err) => console.log(err));
  }
}

export default User;
