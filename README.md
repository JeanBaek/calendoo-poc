# Calendoo-poc
Calendoo-poc는 캘린더와 투두를 결합한 모바일 앱 서비스 Calendoo의 최소 기능을 실험하는 저장소입니다.

<div align="center">
    <img src="./public/logo-prof-ver-red.png" alt="서비스 로고" width="320" height="320">
</div>


**기능 흐름**

1. 주별 캘린더 창 및 목록 창에서
2. 캘린더 생성
3. 캘린더 아이템에서 클릭/터치하여 체크박스 토글
4. 만약 시간을 등록하지 않았다면, 캘린더 아래쪽 목록과 목록 창에서 확인
    1. 날짜는 반드시 등록해야 함.
5. 구글 캘린더 API로 캘린더 정보들 CRUD

**개별 기능**

1. 주별 캘린더 창
    1. 캘린더 및 아래쪽에 목록
2. 목록 창
3. 캘린더 생성
    1. 생성시 날짜는 필수 등록. 별도 선택하지 않을 시 현재 보고 있는 날짜 기준.
    2. 캘린더 삭제
    3. 캘린더 수정
    4. 캘린더 불러오기
4. 캘린더 아이템에서 체크박스를 클릭/터치하여 토글
    1. 체크 완료되면 opacity 낮춰서 흐림 처리
5. 구글 캘린더 API로 캘린더 정보들 CRUD

## 실행 코드
### 1. 종속성 설치
```sh
npm install
```

### 2. 로컬 환경 설정
```sh
cp .env.local.example .env.local
```

사용자 계정을 지속하고 이메일로 로그인을 지원하기 위해 데이터베이스가 필요합니다. 그러나 데이터베이스를 사용하지 않고도 OAuth를 사용하여 인증을 사용하여 NextAuth.js를 사용할 수 있습니다. 데이터베이스를 지정하지 않으면 [JSON Web Tokens](https://jwt.io/introduction)가 기본적으로 활성화됩니다.

원한다면 데이터베이스 설정을 건너뛰고 나중에 돌아와도 됩니다.

데이터베이스 설정에 대한 자세한 정보는 다음 링크를 참조하세요:

- 문서: [authjs.dev/reference/core/adapters](https://authjs.dev/reference/core/adapters)

### 3. 애플리케이션 시작

이 사이트를 로컬에서 실행하려면 다음을 사용하세요:

```sh
npm run dev
```
실행 이후 로그인 과정이 종료되면 등록된 리다이렉트 주소 http://localhost:3000 로 이동합니다.

프로덕션 모드에서 실행하려면 다음을 사용하세요:

```sh
npm run build
npm run start
```

### 4. 프로덕션 준비

[배포 문서](https://authjs.dev/getting-started/deployment)를 따를 예정입니다.




