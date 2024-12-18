# DODAM_AUTH_TEMPLATE

B1ND Front-End팀이 "대구소프트웨어마이스터고등학교의 학생들이 보다 편리하게 개발을 했으면 좋겠다"라는 생각을 가지고 개발한 BoilerPlate입니다.

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

`npx b1nd-react-app [projectname]`으로 시작하실 수 있습니다. 
`ex) b1nd-react-app [projectname] has been created successfully.`라는 console과 합께 프로젝트 생성이 완료 됩니다.

### USER EDITING POINT

1. `src/config/config.json`의 `server`속성을 자신의 API BASE_URL로 변경해주세요.
2. `src/libs/responseInterceptor.ts`의 32번쨰 줄 refresh end-point를 자신의 API end-point로 변경해주세요.
   또한 33번째 줄의 BODY값도 자신의 API BODY 값으로 변경해주세요.
3. `src/libs/requestInterceptor.ts`의 12번쨰 줄 login url을 자신의 login url로 변경해주세요.

# ETC
* 토큰을 사용하는 과정이 다르거나 필요없다면 폴더를 삭제 하시면 됩니다 

1. 토큰의 종류는 `accessToken`과 `refreshToken`으로 구분되며, 각각 Cookie에 `accessToken`, `refreshToken`으로 저장됩니다.
2. 토큰의 저장은 `token.setToken({TOKEN_CONSTANTS}, [value]);`로 하시면 됩니다. `ex) token.setToken(ACCESS_TOKEN_KEY, res.data.data.accessToken);`
2. REACT 프로젝트를 FLUX 아키텍처로 개발하기 위한 폴더 구조입니다. [FLUX구조란?](https://velog.io/@alskt0419/FLUX-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80)
3. 서버와의 통신은 `react-query`를 사용하시면 더욱 더 편리하게 사용 가능합니다.
4. 번들러는 `webpack`을 사용하였습니다.
5. 추후 `globalStyles`와 `layout`도 추가 할 예정입니다.
   
## install


> npx b1nd-react-app [projectName]