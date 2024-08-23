class Token {
  public getToken(key: string): string | undefined {
    let matches = document.cookie.match(
      new RegExp("(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"),
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  public setToken(key: string, value: string): string {
    return (document.cookie = `${key} = ${value}`);
  }

  public clearToken(): string {
    return (document.cookie = "max-age=0");
  }
}

export default new Token();