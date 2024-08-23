class Token {
  public getToken(key: string): string | undefined {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.split("=");
      if (cookieKey === key) {
        return decodeURIComponent(cookieValue);
      }
    }
    return undefined;
  }

  public setToken(key: string, value: string): string {
    const cookie = (document.cookie = `${key} = ${value}`);
    return cookie;
  }

  public clearToken() {
    document.cookie = "max-age=0";
  }
}

export default new Token();
