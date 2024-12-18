# DODAM_AUTH_TEMPLATE

“How can we make development more comfortable for our friends who are web majors?” and that's how it started". that's how it developed Made By B1ND Front-End Team

# Folder Architecture
```
├─public
└─src
    ├─api
    ├─assets
    ├─components
    ├─config
      └─config.json
    ├─constants
      └─token
         └─token.constants.ts
    ├─hooks
    ├─libs
      └─axios
         ├─customAxios.ts
         ├─requestInterceptor.ts
         └─responseInterceptor.ts
      └─token
         └─token.ts
    ├─pages
    ├─queries
    ├─styles
    ├─types
    └─utils
├─webpack.config.js
├─webpack.development.js
└─webpack.production.js
```
# HOW TO USE?

### START

You can start by `npx b1nd-react-app [projectname]`
Project creation is completed with a console called `ex) b1nd-react-app [projectname] has been created successfully.`

### USER EDITING POINT

1. Please change `src/config/config.json` attribute `server` to your API_BASE_URL
2. Please change the refresh endpoint to your API endpoint in line 32 and BODY value to your API BODY value in line 33 of the `src/libs/responseInterceptor.ts`.
3. Please change the login url to your login url in line 12 of the `src/libs/requesteInterceptor.ts`

# ETC
* If the token usage is different or you are not using the token, you can delete the folder.

1. Kind of token is `accessToken` and `refreshToken`, save the key as `accessToken`, `refreshToken` in a BrowserCookie.
2. The way of save token is `token.setToken({TOKEN_CONSTANTS}, [value]); ex) token.setToken(ACCESS_TOKEN_KEY, res.data.data.accessToken);`
3. Folder structure for developing REACT project with FLUX architecture. [What is FLUX Architecture?](https://www.freecodecamp.org/news/an-introduction-to-the-flux-architectural-pattern-674ea74775c9/)
4. `react-query` makes communication with API_SERVER easier than simply using it.
5. Bundler uses a `webpack`.
   
## install


> npx b1nd-react-app [projectName]