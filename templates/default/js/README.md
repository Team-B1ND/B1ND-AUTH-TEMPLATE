# react-javaScript-bolierplate

CRA를 사용하지 않고 React + JavaScript 환경을 위한 bolierplate입니다.

이 bolierplate는 대표적으로 다음을 지원합니다.

- `JavaScript` 
  (`jsx`, `js`)

- `` 


# How to use
- 리액트 기본 설정이 되어 있습니다.
install

```
npm install
# or
yarn install 
# or 
pnpm install
```

start
```
npm run dev
# or
yarn run dev
# or 
pnpm run dev
```


# Folder Architecture
```
├─public
└─src
    ├─api               # API 관련 파일들
    ├─assets            # 이미지, 폰트 등 정적 파일
    ├─components        # UI 컴포넌트들
    ├─config            # 설정 파일 (config.json)
    ├─constants         # 상수 파일들
    │   └─token         # 토큰 관련 상수
    │      └─token.constants.js
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    │   └─axios         # Axios 관련 설정
    │      ├─customAxios.js
    │      ├─requestInterceptor.js
    │      └─responseInterceptor.js
    │   └─token         # 토큰 관련 설정
    │      └─token.js
    ├─pages             # 페이지 컴포넌트들
    ├─queries           # React Query 관련 파일들
    ├─styles            # CSS/SCSS 파일들
    └─utils             # 유틸리티 함수들
├─vite.config.ts   # Vite 기본 설정

```