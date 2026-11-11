# NAEYC 유아교육 인사이트 | 킨더보드

NAEYC 원문에 기반한 한국어 해설과 유치원·어린이집 현장 적용 제안을 제공하는 정적 웹사이트입니다. NAEYC 공식 한국어 사이트가 아닙니다.

## 게시

GitHub 저장소 Settings → Pages → Build and deployment에서 Source를 Deploy from a branch, Branch를 main, 폴더를 / (root)로 선택해 저장합니다. Pages가 제공하는 게시 완료 URL을 확인합니다.

웹사이트는 index.html, style.css, app.js, data.js, reports.js, updates.js, updates.json 및 reports/로 구성됩니다. 외부 서버나 방문자 로그인이 필요하지 않습니다. 저장한 글은 방문자의 브라우저에만 보관됩니다.

## 콘텐츠 운영

정기 분석의 공개 결과는 updates.json에 누적하며 주간·월간 목록과 상세 글에 반영됩니다. 갱신 구조와 검증 기준은 [PUBLICATION.md](PUBLICATION.md)를 참조하세요. 정기 분석은 별도로 연결된 예약 작업에서 수행합니다. 저장소를 만들거나 Pages를 켜는 것만으로 분석이 실행되지는 않습니다.

최초 수록 자료의 확인일은 2026-11-11입니다. 자료실 PPT는 표기된 날짜의 공개 요약이며 내부 보고서가 아닙니다. 회원 원문 전문·로그인 정보·내부 사업전략을 저장하지 않습니다.

## 확인 범위

JavaScript 구문, 업데이트 스키마·회차 참조, 주요 경로 렌더링, PPT 파일 구조를 검사합니다. 현재 작업 환경에서는 실제 브라우저 및 PowerPoint 렌더링을 검수하지 못했습니다.
