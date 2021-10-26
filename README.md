# 요구 사항

- 글 작성, 글 확인, 글 목록 확인, 글 수정, 글 삭제가 되는 API
  - Delete과 Update는 해당 유저의 글만 가능
    - 즉, 유저 생성, 인가, 인증 기능도 필요
  - Read는 pagination 구현 필수
- 데이터베이스는 in-memory database로 구현
  - 리뷰어가 Database를 따로 설치할 필요 없이 실행하고 확인할 수 있어야 합니다.
  - 예) sqlite3

# 구현한 방법과 이유에 대한 간략한 내용

흔히 서버에서 자주 선택하는 3 Layer 아키텍쳐를 적용해서 개발을 진행했습니다.
다만 개발 과정 중 Controller와 Repository사이의 Service 역할이 크게 없어서 제거 후 Controller와 Repository로만 구성을 했습니다.

이와 같이 구현한 이유는 Layer 아키텍쳐함으로써 슬라이싱(즉, 각 Layer별로 분리된 유닛 테스트) 테스트 케이스들을 작성하기 용이하기 때문입니다.

그리고 구현 조건중 인메모리를 사용해야하는 부분을 쉽게 해결하기 위해 TypeORM을 적용해서 데이터베이스의 교체를 쉽게하는 설계를 진행했습니다.

# 자세한 실행 방법(endpoint 호출방법)

실행 방법은 다른 NodeJS기반 서버들과 동일하게

```bash
$ npm install
$ npm start
```

로 실행해서 `http://localhost:8080` 로 아래 정리된 API 별로 호출하면 가능합니다.

- 추가) 테스트 케이스 실행 방법

jest를 사용해서 실행할 수 있도록 설정해놨습니다. jest는 데이터 베이스 쿼리 테스트에 주로 사용했습니다.

```
$ npm run test
```

# api 명세(request/response 서술 필요)

```
// post
router.get("/post/", postController.getPaginationPosts);
router.get("/post/:id", postController.getPost);
router.post("/post", auth, postController.createPost);
router.delete("/post/:id", auth, postController.deletePost);
router.put("/post/:id", auth, postController.updatePost);

// user
router.post("/user", userController.createUser);
router.post("/user/auth", userController.authenticate);
```

## `POST /api/user`

계정 추가

- Request

```json
{
  "id": "test",
  "password": "test",
  "name": "tester"
}
```

- Reponse

```json
{
  "success": true,
  "data": {
    "id": "test",
    "name": "tester",
    "password": "test"
  }
}
```

## `POST /api/user/auth`

로그인에 사용되는 API

- Request

```json
{
  "id": "test",
  "password": "test"
}
```

- Response

```json
{
  "success": true
}
```

## `GET /api/post?limit=5&offset=1`

Pagination 메타 데이터와 게시글 데이터를 돌려줍니다.

- response

```json
{
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "test",
        "content": "test!"
      },
      {
        "id": 2,
        "title": "test",
        "content": "test!"
      }
    ],
    "meta": {
      "total": 2,
      "limit": 5,
      "offset": 1
    }
  },
  "success": true
}
```

## `POST /api/post`

로그인이 필요한 API입니다. 로그인시 세션에 저장되어 작성자는 로그인한 계정이 됩니다.

- Request

```json
{
  "title": "test",
  "content": "test!"
}
```

- Response

```json
{
  "data": {
    "title": "test",
    "content": "test!",
    "author": {
      "id": "test",
      "password": "test",
      "name": "tester"
    },
    "id": 1
  },
  "success": true
}
```

## `DELETE /api/post/[id]`

- Response

```json
{
  "success": true
}
```

## `PUT /api/post/[id]`

POST와 동일합니다.

# 실패 응답은 아래 형식으로 모두 동일합니다.

```json
{
  "success": false,
  "error": "에러 메세지",
  "errorCode": 1000
}
```

# 테스트 방법

간단한 리액트 앱을 public 파일에 빌드된 상태로 올려놨습니다. 해당 앱에서 API들의 일부를 사용하고 있습니다.
