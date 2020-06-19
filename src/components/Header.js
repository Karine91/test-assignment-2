import "../assets/styles/header.scss";

class Header {
  constructor(user) {
    this.root = document.createElement("header");
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.createUserIfoBlock = this.createUserIfoBlock.bind(
      this
    );

    this.user = user;
    this.buttonElement = null;
    this.btnLoginText = "Войти с Google";
    this.btnLogoutText = "Выйти";
  }

  onLogin() {
    this.user.login().then(() => {
      this.buttonElement.innerText = this.btnLogoutText;
      this.buttonElement.onclick = this.onLogout;
      this.root.prepend(
        this.createUserIfoBlock(this.user.user.displayName)
      );
    });
  }

  onLogout() {
    this.user.logout().then(() => {
      this.buttonElement.innerText = this.btnLoginText;
      this.buttonElement.onclick = this.onLogin;
    });
  }

  createLoginButton() {
    const button = document.createElement("button");
    button.className = "header__login-btn";
    button.type = "button";
    button.innerText = this.btnLoginText;
    button.onclick = this.onLogin;
    return button;
  }

  createUserIfoBlock(userName) {
    const div = document.createElement("div");
    div.className = "header__user-info";
    div.innerText = userName;
    return div;
  }

  render() {
    this.root.className = "header";
    this.buttonElement = this.createLoginButton();
    this.root.appendChild(this.buttonElement);
    return this.root;
  }
}

export default Header;
