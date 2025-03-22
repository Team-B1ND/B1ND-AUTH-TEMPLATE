## B1ND AUTH TEMPLATE
Overview
B1ND AUTH TEMPLATE는 인증 관련 기능을 빠르게 구현할 수 있는 템플릿입니다. 이 프로젝트는 React로 작성되었으며, 효율적인 API 통신을 위해 Axios와 Interceptor를 설정해 두었습니다. 프로젝트 구조는 확장 가능하고, 다양한 환경에서 사용할 수 있습니다.

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
    │      └─token.constants.ts
    ├─hooks             # 커스텀 훅
    ├─libs              # 라이브러리 및 헬퍼 함수
    │   └─axios         # Axios 관련 설정
    │      ├─customAxios.ts
    │      ├─requestInterceptor.ts
    │      └─responseInterceptor.ts
    │   └─token         # 토큰 관련 설정
    │      └─token.ts
    ├─pages             # 페이지 컴포넌트들
    ├─queries           # React Query 관련 파일들
    ├─styles            # CSS/SCSS 파일들
    ├─types             # 타입 정의
    └─utils             # 유틸리티 함수들

```

# DOCS

[한국어 DOCS](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/KO_README.md)

[ENGLISH DOCS](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/ENG_README.md)

- [Test Documentation](./test/README.md)
