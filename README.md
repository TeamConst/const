

# Team Const

![ConstLogo](https://user-images.githubusercontent.com/88940298/166181367-99f6a3d3-d673-42e9-b4a0-98e9498d9393.png)

- 기업협약프로젝트 
- 3월 7일 ~ 4월 15 
## 기업협약 :날짜미정
---   

👨‍👩‍👦‍👦Member.  TeamConst(상태변수) 의 팀원들입니다


- 한경현(kyunghyun Han):[깃허브](https://github.com/kyunghyunHan).     
- 박정호(jungho Park):[깃허브](https://github.com/pjh94). 
---

---
## 번외
- [NFT](https://www.inflearn.com/courses?s=nft)

---
# 과제2
## 이더리움 기반의 NFT음악 스트리밍 플랫폼

## 사용기술

- Raact
- Next.js
- JavaScript
- NodeJs
- Express
- Solidity
- Mysql
- Truffle
- Aws S3(image uploads)
- Ipts.io(data uploads)
- Metamask
- AWS EC2
- Rinkeby
-  <img width="1011" alt="스크린샷 2022-05-05 오후 3 04 57" src="https://user-images.githubusercontent.com/88940298/166870442-e12e8aae-3747-409e-b5d9-66c47c7f0ebb.png">




## 개발환경
|개발환경||
|------|----|
|개발환경|vscode, aws|
|이슈관리|jira,Slack(계정생성공유,일간보고,주간보고(테크이슈 포함),분기보고(마일스톤 단위)|
|문서관리|노션|
|형상관리|깃허브|
## 참조
Nft 발행부분
- https://opensea.io/assets
- https://www.krafter.space/

음악플레이어
- https://expore.spotify.com/us/pages/desktop-app
- https://open.spotify.com/

테스트용 저작권 프리 음원
- https://www.bensound.com/royalty-free-music/2
IPFS관련참조
- https://ipfs.io

## 필요로하는 기능
- 회원가입을 하여 음원등록하고 청취한는 기능 마이페이지 구현
- 성격이 비슷한 기능을 묶어 색깔별로 분류 프로젝트 진행시 참고

|기능항목|참고|
|-----|----------------------------|
|메타마스크 지갑연결|메타마스크 지갑연결|
| 회원가입|가입시 아티스트와 일반 유저중 하나를 선택가능,(다만 아티스트는 경매 참여 권한을 부여받는다)아티스트:메타마스크를 통해 회원가입하며,아티스트명,국가정보를 받는다.유저:메타마스크를 통해 회원가입하며,국가정보,좋아하는 장르(선택)|
| 유저페이지|  |
| 나의NFT|아티스트:총 좋아요 수 display,등록한 음원 NFT조회 및 곡별 재생 시간,좋아요 수 display청취자:이용권 정보 조회,공통 :총 재생시간 및 청취 곡 수 ,Recently played ,My favorite,나의 재생목록|
| 회원 정보 관리| 회원 정보 관리(아티스트 명,좋아하는 장르 등) |
| 음원 등록 및 NFT발행| 해당화면에서는 다음의 데이터를 임력받는다 앨병명(선택),앨범커버(선택),발매년도(선택),장르(선택),작곡가(선택),작사가(선택),음원(최대용령 10mb)등록시 음원 ipfs상에 업로드 되고 앨범커버는 s3에 업로드 된다 이 음원과 앨범 커버의 주소값을 입력받은 다음 나머지 값과 함꼐 json meradata로 담아 nft로 발행한다 - 이 메타데이터와 음원,앨범커버를 제외한 정보는 모두 서버 데이터db에 저장된다|
| 구매 및 판매|아티스트는 등록한 음원을 구매 및 판매를 할수 있다(일반 NFT마켓)  |
| 경매|아티스트는 등록한 음원 경매를 통해 판매 할 수 있다.이 경우최초 경매가와 경매 마감 시간을 입력해야한다  |
| 경매참여|경매에 참여한다 이는 스마트컨트렉트을 통해 수행된다  최종경매 참여가보다 높은 금액을 지불햐여 경매를 참여한다경매에 낙찰 되는 경우,경매 금액은 스마트 컨트렉트를 통해 모두 아트스트에게 송금된다|
|이용권 구입 |서비스를 이용하려면 유저는 한달단위의 subscription 을 해야한다 이용권을 구매한 유저에 한해 음원 청취 기능을제공하며 해지하지 않으면  subscription 은 자동으로 갱신된다.아티스트들 subscription 과 더불어 최초 가입시 가입비를 추가로 받는다(단 런칭 후 3개월 이내에 가입한 유저는 이벤트로 가입비와 월 구독료를 무료로 설정한다) |
| 음원 리스트|재생시간 또는 재생 횟수로 정렬/유저 취향과 일치하는 장르 음악 필터링 노출(가입 시 선택 취향 없을시 기본 재생시간 또는 재생 횟수로 정렬 )/좋아요 필터링 노출/키워드 검색 기능 |
|청취시|  이용권을 가진 유저가 어떤 곡을 클릭하면 해당 곡의 음원을 포함한 metadata를 불러와 재생하고 좋아요를 클릭해 MY favorite에 담을 수 있다 곡이 종료(디음 곡으로 넘어 가는 것 포함)될 떄의 재생시간을 곡의 총 재생시간과 사용자의 총 재생시간 기록에 합산하여 DB에 저장|

## 기타자료
- [IPFS란](https://kadensungbincho.tistory.com/66)
- [NFT_Market_Dapp 예시](https://github.com/kyunghyunHan/NFT_Market_Dapp)

## 프로젝트

<img width="1436" alt="스크린샷 2022-05-02 오후 12 34 05" src="https://user-images.githubusercontent.com/88940298/166181415-62e68140-a732-45d3-b7c2-ae2cf411edac.png">

## Next.js

1. 사전 렌더링 및 서버 사이드 렌더링
Next.js는 기본적으로 빌드시에 만든 모든 페이지를 미리 렌더링 합니다.
이렇게 만들어진 HTML은 처음 페이지를 불러올 때 사용자에게 빠르게 보이게 됩니다.
HTML이 미리 렌더링 되어 SEO에도 좋습니다.
HTML을 불러온 후에는 페이지에 필요한 최소한의 JS 코드를 불러와 페이지를 사용할 수 있게 됩니다.
서버의 데이터를 필요로 하는 페이지에 대해서는 요청 시에 서버 사이드 렌더링을 통하여 HTML을 생성하게 됩니다.
2. Hot Code Reloading을 지원하는 개발 환경
Next 개발 환경에서는 코드 변경 사항이 저장되면 응용 프로그램을 자동으로 다시 로드합니다. 개발 모드일 때 소스코드를 저장하면 오른쪽 하단에 애니메이션 아이콘이 생기며, 이는 Next가 응용 프로그램을 컴파일 하고 있다는 것을 의미합니다.

3. 자동 코드 분할
자동 코드 분할 기능 덕분에 코드의 모든 가져오기가 번들로 묶여 각 페이지와 함께 제공됩니다. 결과적으로, 불필요한 코드가 페이지에 로드되지 않게 됩니다.

4. 설정
Next는 기본적으로 웹팩과 바벨을 사용하고 있습니다. 웹팩과 바벨을 사용하여 서버 사이드 렌더링 및 개발에 필요한 설정이 이미 되어 있어 빠르게 개발을 시작할 수 있습니다. 사용하고싶은 플러그인 또한 손쉽게 추가하여 사용할 수 있도록 지원하고 있습니다.

5. Typescript 내장
타입스크립트는 자바스크립트의 superset인 오픈소스 프로그래밍 언어입니다. 기존의 자바스크립트 문법을 그대로 사용하면서 정적 타입 언어의 장점을 가질 수 있습니다.
Next를 타입스크립트와 함께 사용할 때 타입 지원을 통해 편리함과 안정성을 얻을 수 있습니다.
Next는 타입스크립트 설정을 따로 할 필요 없이 사용할 수 있으며 타입스크립트를 지원하고 있습니다.

6. 파일기반 네비게이션 기능
리액트에서는 route를 위해서 react-router라는 라이브러리를 사용하여 라우팅 설정을 해주어야 합니다. 그로 인해 페이지의 경로에 대하여 직접 설정을 해주어야 하였지만, Next는 파일 시스템 기반 라우팅을 사용합니다. 폴더의 경로에 따라 페이지의 경로가 설정되어 구축이 빠르고 관리가 편리하다는 장점이 있습니다.

7. styled-jsx 지원
Next는 자체 CSS-In-JS인 styled-jsx를 지원합니다. 기본으로 제공하는 기능이기 때문에 스타일을 서버 사이드 렌더링 하기 위한 설정이 필요하지 않습니다.
## ReactQuery

- 여러가지 장점이 있지만 주로 아래와 같이 프론트 개발자가 구현하기 귀찮은 일들을 수행합니다.

- 캐싱
- get을 한 데이터에 대해 update를 하면 자동으로 get을 다시 수행한다. (예를 들면 게시판의 글을 가져왔을 때 게시판의 글을 생성하면 게시판 글을 get하는 api를 자동으로 실행 )
- 데이터가 오래 되었다고 판단되면 다시 get (invalidateQueries)
- 동일 데이터 여러번 요청하면 한번만 요청한다. (옵션에 따라 중복 호출 허용 시간 조절 가능)
- 무한 스크롤 (Infinite Queries (opens new window))
- 비동기 과정을 선언적으로 관리할 수 있다.
- react hook과 사용하는 구조가 비슷하다.

## 테스트넷 배포

<img width="1013" alt="스크린샷 2022-05-05 오후 3 02 17" src="https://user-images.githubusercontent.com/88940298/166870155-fe140dc0-04a8-4536-9e3c-00d773c0793c.png">


- truffle migrate --network rinkeby --reset --skip-dry-run

## Minting
![ezgif com-gif-maker](https://user-images.githubusercontent.com/88940298/166186497-dee581c8-c5fa-45a8-b428-5eed8fb3303a.gif)

## 경매
![ezgif com-gif-maker](https://user-images.githubusercontent.com/88940298/166187608-6eef5a49-8f66-4dba-84fd-75bdf2387412.gif)
## 판매 
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/88940298/166189077-40c9c24b-a28c-4015-82cb-c98ccf6ae2e9.gif)

## 이용권
![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/88940298/166189415-9ede6211-7be6-434b-9692-a002439b5a41.gif)

## PPT

https://docs.google.com/presentation/d/1rMsa5SDoZl3wBaWUvloLyD0PgQDY7giy4BF2MBP883s/edit#slide=id.p
