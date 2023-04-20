const API = (() => {
  const BASE_URL = "https://study.duyiedu.com";
  const AUTHORIZATION_KEY = "authorization";
  const TOKEN_KEY = "token";

  function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      headers,
      method: "POST",
      body: JSON.stringify(bodyObj),
    });
  }

  async function reg(userInfo) {
    //   return await fetch(`${BASE_URL}/user/reg`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userInfo),
    //   }).then((response) => response.json());
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  async function login(loginInfo) {
    //   const resp = await fetch(`${BASE_URL}/user/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(loginInfo),
    //   });
    const resp = await post("/api/user/login", loginInfo);
    const result = await resp.json();
    if (result.code === 0) {
      const token = resp.headers.get(AUTHORIZATION_KEY);
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  async function exists(loginId) {
    const resp = await get("/api/user/exists?loginId=" + loginId);
    return await resp.json();
  }

  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }

  async function sendChat(content) {
    const resp = await post("/api/chat", {
      content,
    });
    return await resp.json();
  }

  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }

  function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
