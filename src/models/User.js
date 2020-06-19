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
        console.log(data);
        this.user = data.user;
        this.isAuthenticated = true;
      })
      .catch((err) => {
        throw err;
      });
  }

  logout() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        this.isAuthenticated = false;
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default User;
