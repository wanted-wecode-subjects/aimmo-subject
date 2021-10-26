# Query

- 요구 사항

```
- 글 작성, 글 확인, 글 목록 확인, 글 수정, 글 삭제가 되는 API
  - Delete과 Update는 해당 유저의 글만 가능
    - 즉, 유저 생성, 인가, 인증 기능도 필요
  - Read는 pagination 구현 필수
```

- User 관련 필요한 쿼리 정리

1. User 생성 [x]
2. User 정보 읽어오기 (로그인을 위해 사용) [x]

- Post 관련 필요한 쿼리 정리

1. Make post with author [x]
2. List posts (Pagination) => limit, offset 추가 [x]
3. Read post with id => 불필요
4. Update Post with id (Only author) [x]
5. Delete Post with id (Only author) [x]
