# 공개 콘텐츠 갱신 규칙

이 저장소는 NAEYC 유아교육 인사이트의 공개 웹사이트입니다. 저장소 루트의 정적 파일을 GitHub Pages의 main / (root)에서 게시합니다. 사이트 주소는 Pages 배포 성공 후에 유효합니다.

## 단일 갱신 파일

정기 작업은 main 브랜치의 `updates.json`을 최신 blob SHA와 함께 읽고 갱신합니다. 기존 기록을 보존하고 새 기록을 배열 앞에 넣습니다. 다른 작업의 수정을 덮어쓰지 않도록 SHA가 바뀌면 다시 읽고 병합합니다. 같은 기간의 동일 ID를 중복 생성하지 않습니다. 재실행 시 내용이 동일하면 쓰지 않습니다.

최상위 구조: `{"version":1,"updatedAt":"YYYY-MM-DD","articles":[],"weekly":[],"monthly":[]}`. updatedAt은 실제 공개 콘텐츠 확인일이며, 시도만 했거나 실패한 날짜로 바꾸지 않습니다. 서버에 저장하는 것은 JSON 데이터이며 HTML 또는 JavaScript 코드는 넣지 않습니다.

## articles

`data.js`에 있는 기존 기사와 같은 구조를 사용합니다. 각 기사의 필수 문자열 필드는 id, title, deck, topic, kind, age, access, issue, published, reviewed, edition, color, sourceTitle, sourceLabel, author, publication, url, limit입니다. 필수 문자열 배열은 audience, tags, summary, overview, interpretation, practice입니다. applications는 `유치원`, `어린이집` 각각에 문자열을 갖는 객체입니다. minutes는 1 이상의 숫자입니다.

- id: `weekly-YYYYMMDD-topic` 또는 `monthly-YYYYMM-topic` 같은 영문 소문자·숫자·하이픈 조합. data.js 및 updates.json 전체 기사에서 고유해야 합니다.
- topic: 놀이·배움지원 / 관찰·기록 / 교사 전문성 / 통합교육 중 적합한 값.
- color: play / observe / voice / belong / reflect 중 하나.
- audience: 유치원, 어린이집 중 적용 가능한 값.
- url: 실제 확인한 HTTPS NAEYC 공식 원문 주소. 원문 제목·저자·발행일·확인일을 정확히 기록합니다. 모르는 날짜를 추정하지 않습니다.
- summary, overview: 짧은 원문 요점. interpretation: 독립적인 국내 현장 해설. applications/practice: 원문 기관의 공식 권고와 구분한 자체 제안. limit: 근거 수준·접근 제한·일반화 한계.
- 회원 원문 전체, 번역 전문, 유료 이미지, 로그인 정보, 내부 사업전략·평가점수, 비공개 문서 링크를 넣지 않습니다. 내부 보고서를 그대로 공개하지 않습니다.

## weekly / monthly

회차는 id, label, period, date, title, description 문자열과 ids 배열을 갖습니다. ids는 data.js 또는 updates.json articles에 존재하는 기사 ID만 참조합니다.

- weekly ID 예: `weekly-20261113`. 기간은 실제 분석 대상 기간을 명시합니다. 신규 발행과 과거 자료의 재분석을 구분합니다. 신규 확인 자료가 없으면 그 사실을 description에 명시하고 ids는 빈 배열을 사용할 수 있습니다.
- monthly ID 예: `monthly-202611`. 추가 필드 summary는 종합 분석 문단의 문자열 배열입니다. 해당 월 1일부터 실제 실행일까지의 범위를 명시합니다. 주간 요약을 나열하지 말고 반복 논점·차이·근거·국내 적용 조건을 종합합니다.

한국시간 매주 금요일 주간 분석, 매월 마지막 금요일 월간 분석이 대상입니다. 저장소 자체가 원문 수집을 실행하지 않습니다. 연결된 분석 예약이 공개용 데이터를 작성하고 커밋하면 GitHub Pages가 변경 파일을 게시합니다.

## 검증과 완료 보고

JSON 파싱, 필수 필드·중복 ID·기사 참조·원문 URL·공개 가능 내용 검사를 통과한 뒤 한 번의 파일 갱신으로 반영합니다. `updates.js`의 KBUpdates.validate가 실제 런타임 검증 기준입니다. 읽기·쓰기 권한 오류 또는 검증 실패 시 기존 정상 데이터를 유지합니다.

커밋 후 `updates.json`을 다시 읽어 새 회차가 보존됐는지 확인합니다. 저장 성공과 Pages 배포 성공을 구분합니다. 실제 공개 URL의 updates.json 또는 해당 회차에 반영됐는지 확인한 경우에만 게시 완료로 보고합니다. 배포 지연·Pages 미활성화·회원 로그인 만료는 사실대로 알립니다.

## 자료실

자료실의 2026-11-11 PPT 2종은 해당 날짜의 공개 자료입니다. 정기 분석의 내부 임원 보고 PPT를 이 공개 자료와 연결하지 않습니다. 별도의 공개용 PPT를 만들고 파일·웹 미리보기의 내용이 일치하는지 검증했을 때만 자료실을 변경합니다.
