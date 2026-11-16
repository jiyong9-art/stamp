# 잠금 도구 (날인기 링크 만들기)

- `build.js` — 날인기 html → 잠긴 사이트(app.enc · fonts.enc · ver.json · index.html · sw.js)
  사용: `node tools/build.js <에이원_직인_날인기.html> <출력 폴더>` (같은 폴더에 key.txt · slot.json 필요)
- `mkslot.js` — 비밀번호로 열쇠 잠그기 → slot.json. 사용: `node tools/mkslot.js <비밀번호> slot.json`
- `loader.html` — 첫 화면(비밀번호 입력, 기기 보관, 인터넷 끊김 대비) = 사이트의 index.html
- `sw.js` — 첫 화면을 기기에 보관(인터넷 없이 열기)

**key.txt(열쇠)는 여기 없음** — 공개 저장소라 올리지 않음. 열쇠는 대표만 열 수 있는 Claude 비공개 페이지
'날인기 비밀번호 정하기'(소스 안의 `const K`)에 보관돼 있음. 열쇠를 바꾸면 모든 직원이 비밀번호를 다시 넣어야 함.
