

# Node.js 앱 만들기

* express js 서버 간단한거 셋팅 ㄱ

```js
const express = require('express');

const PORT = 8080;
const HOST = "0.0.0.0"

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, HOST, ()=>{
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

```

다 아시죠 ? 



## Dockerfile 작성하기

* 이전에 echo나 하던거보다 더 복잡함! 

### 이전처럼 근본 먼저 

```dockerfile
FROM node:10

RUN yarn install

CMD ["node", "start"]
```

* 왜 이번엔 base image를?
* alpine에는 yarn이 안깔려있음

![image](https://user-images.githubusercontent.com/72075148/130330049-1ffe1f23-9bdb-4b6b-a0bc-ef54a25552c2.png)

### 빌드하고 켜보자 ?

* package.json이 없다고 뜨면서 에러가 뜰꺼다...

  * node server.js 말고, yarn start하니까 저 에러가 뜸 !

  ![image](https://user-images.githubusercontent.com/72075148/130330221-5b32a9b4-8fad-4c19-826b-475db254b55a.png)

* package.json / server.js 가 저 컨테이너에 없기 때문에 에러가 뜸 

* 소스 코드들을 넣어줘야함 ! ( yarn install 전에 ! ) 

```dockerfile
COPY package.json ./
```

​	![image](https://user-images.githubusercontent.com/72075148/130330365-4abc328e-fa20-47bd-8b59-5311275c22c4.png)

* server.js 가 없어서 에러
* 소스 전체를 넣어준다.

```dockerfile
COPY ./ ./
```

* ![image](https://user-images.githubusercontent.com/72075148/130330408-9730e0d9-a516-4f38-a176-63175d3da6d0.png)

잘 돌긴 하지만 접속하면 안뜸!!!



## 생성한 이미지로 어플리케이션 실행 시 접근이 안 되는 이유 

```shell
docker run -p 49160:8080 이미지이름
```

컨테이너 내부의 네트워크에 연결을 시켜줘야한다 . 

포트 맵핑을 시켜줘야한다 . 



## Working Directory 명시해주기

```dockerfile
WORKDIR /usr/src/app
```

* 이미지 안에서 어플리케이션 소스 코드를 가지고 있을 디렉토리를 생성하는 것
* 이 디렉토리가 어플리케이션에 working directory가 된다.

### 왜?

* 그냥 COPY로 하면 루트에 들어오게됨 

* ![image](https://user-images.githubusercontent.com/72075148/130344916-b14e0d90-e3e8-416f-ad02-6f1cbf0bfd0e.png)
* 중복된 이름은 덮어씌운다
* 정리가 안됨

![image](https://user-images.githubusercontent.com/72075148/130345306-ce580bd6-93ee-4211-a8a8-de37b51dc36e.png)

## 어플리케이션 소스 변경으로 다시 빌드하는 것에 대한 문제점

### 상황

* 어플리케이션을 만들다 보면 소스 코드를 계속 변경해야한다
* 변경된 것을 확인하면서 개발을 해나가야한다.
* 소스코드 변경했다고해서 도커에서 변경되진 않음, 
* `docker build` 현재는 도커 파일로 이미지 생성 -> `docker run` 도커 이미지로 컨테이너 생성 까지 반복하는 중
* 실시간으로 소스코드가 반영되게 해야함 ! 

### 실제 비효율적인 부분

* 소스코드만 변경했는데 종속성 다 받아오는거 다시해야함
* 이미지 생성하고 컨테이너 띄우는거 다 다시해야함





## 어플리케이션 소스 변경으로 재빌드 시 효율적으로 하는 법

현재까지

```dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY ./ ./

RUN yarn install

CMD ["yarn", "start"]
```

COPY , RUN 부분을

```dockerfile
COPY package.json ./
RUN yarn install
COPY ./ ./
```

으로

dockerfile이 변경 된 부분부터 돌리고, 변경 없다면 그 이전은 캐싱이 된다.

COPY ./ ./ -> yarn install

COPY pakage.json ./ -> yarn install -> COPY ./ ./ 이 차이가 남

package.json 이 변화가 없으면 yarn install까진 동일하므로, 캐싱되어서 종속성 재설치 안함 !



![image](https://user-images.githubusercontent.com/72075148/130345610-f236c38a-b4a0-40e5-8ba5-1a71bd033e41.png)



## Docker Volumes 에 대해서 

![image](https://user-images.githubusercontent.com/72075148/130345762-da5af14a-2c47-4ea7-8e7f-9b1551ec8465.png)

매핑해서 쓴다 !

```shell
docker run -p 5000:8080 -v /usr/src/app/node_nodules -v $(pwd):/usr/src/app <이미지아이디>
```

* `-v /usr/src/app/node_nodules` 로컬에서 node_modules이 없으므로 참조하지 말자 라고 쓴거
* `-v $(pwd):/usr/src/app` 현재경로에 있는 디렉토리/파일을 /usr/src/app 에서 참조 

### 소스코드 수정 후 docker stop / docker run 다시하면 적용 됨











