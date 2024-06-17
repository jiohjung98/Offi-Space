# OffiSpace - 거점 공유 오피스 예약 웹앱 서비스

<img width="800" alt="Offispace-Info" src="https://github.com/4bujak-4bujak/frontend/assets/104253583/dc50aac8-a5d3-4618-9810-7a387558373c">
<br/>

[OffiSpace 바로가기](https://4busak.vercel.app/)

- testID : gogo55@4busak.com
- testPW : Office123!


## Tech Stack

<img width="800" alt="Offispace-Info" src="https://github.com/4bujak-4bujak/frontend/assets/104253583/1ccfa4bf-421a-4865-b717-56a120b02f49">

## My Contribute

### [ 오피스 설정 ]
- 예약페이지의 지점의 경우, 메인에서 지점을 변경하면 해당 값을 받아와야하고 예약페이지 내 및 지도페이지에서 지점 변경 시 해당 값을 받아와야 함
-  -> zustand를 사용해 오피스 정보 전역으로 2개 관리(오피스 전역 1번, 2번)
-  -> 각 전역 값 업데이트 하는 시간을 저장 후 예약페이지에서 더 최근에 업데이트된 전역 상태를 가져옴
<br/>

- 메인에서 지점 설정(오피스 정보 1번 전역 상태) -> 오피스 정보 1번 전역 상태 업데이트 -> 메인 지점, 예약페이지의 지점 변경
- 예약페이지 지점 설정(오피스 정보 2번 전역 상태) -> 오피스 정보 2번 전역 상태 업데이트 -> 예약페이지의 지점만 변경
- 지도페이지의 오피스모달, 지점 상세정보에서의 예약 바로가기 -> 오피스 정보 2번 전역 상태 업데이트 -> 예약페이지의 지점만 변경

https://github.com/jiohjung98/Offi-Space/assets/104253583/d76da2f2-cbf0-4a1b-af2d-ef927d54c53e

<br/>
<br/>

### [ 오피스 상세정보 ]
- 오피스 상세정보 api 연동
- 미팅룸, 리차징룸, 포커스존 각 탭에 따라 예약하기 페이지 탭 설정

https://github.com/jiohjung98/Offi-Space/assets/104253583/05db30ff-7274-4b63-b9c4-4cf4f7aaabfd

<br/><br/>

### [ 지도 및 오피스 정보 ]
- 네이버지도 api 연동
- 오피스 정보 api 연동 - 위도, 경도에 따라 오피스 마커 설정
- 현재 사용중인 미팅룸 개수 api 연동
- 현재 버튼을 통해 사용자 위치 확인 -> 오피스 검색 시, 현위치로부터 오피스와의 거리 측정

https://github.com/jiohjung98/Offi-Space/assets/104253583/01508176-3596-4fa2-9a0e-38bafd0a341e

<br/><br/>

### [ 미팅룸 ]
- 미팅룸 api 연동 -> 현재 시간 기준으로 예약 가능한 시간대 검색 후, 해당 오피스의 미팅룸 리스트 나열
- 필터 적용 값으로 해당 오피스 미팅룸 재검색 후 리스트 반환

https://github.com/jiohjung98/Offi-Space/assets/104253583/6ca51c2c-05d2-4dec-9115-4bdab3a57549

<br/><br/>

### [ 미팅룸 추천 ]
- 주변 미팅룸 api 연동 ->  해당 오피스에 필터에 맞는 미팅룸 부재 시 주변 미팅룸으로부터 해당 필터값에 해당하는 미팅룸 검색 후 반환

https://github.com/jiohjung98/Offi-Space/assets/104253583/b5a5a416-0f3b-4f5e-82ee-ff69efa72b27

<br/><br/>

### [ 미팅룸 예약 ]
- 미팅룸 예약 api 연동
- 사용자 초대 api 연동 -> 미팅룸 최대 인원 - 1 만큼 초대 가능

https://github.com/jiohjung98/Offi-Space/assets/104253583/b59f0467-97a4-46c4-a274-5de92adc93ae

<br/><br/>

### [ 오피스별 랜덤 공지 및 사진 부여, 자동 스크롤 ]
- 오피스별 랜덤 공지 및 사진 부여
- 메인페이지의 오피스 긴급 공지 클릭 시, 해당 오피스 긴급 공지 토글 자동 오픈

https://github.com/jiohjung98/Offi-Space/assets/104253583/7a7a0442-625c-4b25-8b88-844cd7ea6a31

<br/><br/>

## Team Convention

| 태그                  | 설명                                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| `feat: `             | 새로운 기능 추가 및 개선                                                |
| `style: `              | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우                                                         |
| `design: `           | CSS 등 사용자 UI 디자인 변경                                              |
| `fix: `              | 기존 기능 수정 (주로 안 좋았던 것에서 좋은 것으로)                                                   |
| `bug: `          | 버그 수정                                    |
| `refactor: `            | 결과의 변경 없이 코드의 구조를 재조정한 경우                     |
| `test: `         |  테스트 코드 추가                                                   |
| `docs: `          | 코드가 아닌 문서를 수정한 경우                                                |
| `remove: `             | 파일을 삭제하는 작업만 수행                                                      |
| `rename: `             | 파일 또는 폴더명을 수정하거나 위치(경로)를 변경                      |
| `asset: `            | 이미지 등 assets 파일 추가 |
| `chore: `           | 그 외 기타 수정                      |


## Script

앱 실행

```
$ npm run build
$ npm run dev
```
