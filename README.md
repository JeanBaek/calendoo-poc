# Calendoo-poc
Calendoo-poc는 캘린더와 투두를 결합한 모바일 앱 서비스 Calendoo의 최소 기능을 실험하는 저장소입니다.

<div align="center">
    <img src="./public/logo-prof-ver-red.png" alt="서비스 로고" width="320" height="320">
</div>


**기능**



1. 투두 생성
   - 방법: 목록 창에서 + 버튼을 클릭하여 에디터 창에서 내용을 입력하고 추가 버튼 클릭
2. 투두 내용 편집
   - 방법: 목록 창에서 투두 항목을 클릭하여 에디터 창에서 내용을 변경하고 완료 버튼 클릭
3. 투두 완료 처리
   - 방법: 목록 창에서 투두 항목의 동그라미를 클릭하여 체크
4. 투두 삭제
   - 방법: 목록 창에서 투두 항목의 x 버튼 클릭
5. 날짜별 확인
   - 방법1: 목록 창 상단의 왼쪽 오른쪽 버튼을 클릭
   - 방법2: 달력의 날짜를 클릭

- 구글 캘린더 API를 이용하여 투두 정보를 구글 캘린더에 저장합니다.  

## 실행 코드
### 1. 종속성 설치
```sh
npm install
```

### 2. 로컬 환경 설정
```sh
cp .env.local.example .env.local
```

```.env.local``` 파일에 AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET 정보를 추가해주세요.
<br />
구글 클라우드에서 개인적으로 사용자 인증 정보를 만들어 사용하시면 됩니다.




### 3. 애플리케이션 시작

이 사이트를 로컬에서 실행하려면 다음을 사용하세요:

```sh
npm run dev
```
실행 이후 로그인 과정이 종료되면 등록된 리다이렉트 주소 http://localhost:3000 로 이동합니다.



<br />
<br />
<br />

<div align="right">
    <a href="https://hits.seeyoufarm.com">
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FJeanBaek%2Fcalendoo-poc&count_bg=%23093B7D&title_bg=%23BCBCBC&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/>
    </a>
</div>

