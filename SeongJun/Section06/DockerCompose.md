

# DockerCompose란 무엇인가

* 다중 컨테이너 도커 어플리케이션을 정의하고 실행하기위한 도구



### 어플리케이션 만들면서 보자

* 페이지 리프레시 하면 카운트가 올라가는 간단한 어플

![image](https://user-images.githubusercontent.com/72075148/131213231-8e22456e-a6ad-4241-829e-dcfdb362e5fd.png)

## 어플리케이션 소스 작성하기

redis 설명 -- 등

* 메모리에 저장
* 비 관계형 데이터베이스 (Nosql)
* 메모리기반의 키 값 구조
* 빠르고 메모리에 저장하지만 영속적으로 보관가능?
* redis server 작동하는곳과 Node가 다른곳이면 host 명시 

```js
const express = require("express");
const redis = require("redis");
//레디스 클라이언트 생성 
const client = redis.createClient({
    host: "redis-server",
    port: 6379
})

const app = express();

//숫자는 0 부터 시작합니다.
client.set("number", 0);

app.get('/', (req, res) => {
    client.get("number", (err, number) => {
        //현재 숫자를 가져온 후에 1씩 올려줍니다.
        res.send("숫자가 1씩 올라갑니다. 숫자: " + number)
        client.set("number", parseInt(number) + 1)
    })
})


app.listen(8080);
console.log('Server is running');
```

## Dockerfile 작성하기

* 저번과 동일

```dockerfile
FROM node:10

WORKDIR /usr/src/app

COPY ./ ./

RUN yarn install

CMD ["yarn", "start"]

```



## Docker Containers간 통신 할 때 나타나는 에러

![image](https://user-images.githubusercontent.com/72075148/131214592-2325f973-50ec-4cc1-bbe3-d71bfeb4c93a.png)



컨테이너 사이에 통신을 할 수 있게 하려면 docker compose이용 가능

## Docker Compose 파일 작성하기

![image](https://user-images.githubusercontent.com/72075148/131215213-cdb9ff4b-62a6-47ee-97b5-0eb583b8dff2.png)

```yaml
version: "3"
services:
  redis-server:
    image: "redis"
  node-app:
    build: .
    ports:
     - "5000:8080"
```



* **version** - 도커 컴포즈의 버전

* **services** - 이곳에 실행하려는 컨테이너들을 정의

  * **redis-server** - 컨테이너 이름

    * **image**: 컨테이너에서 사용하는 이미지

  * **node-app** - 컨테이너 이름

    * **build** -  현 디렉토리에 있는 Dockerfile 사용
    * **ports** - 포트 매핑 로컬 : 컨테이너

    

### command

* `docker-compose build` - 이미지를 빌드함 - 컨테이너를 시작하지는 않는다.
* `docker-compose up` - 이미지가 존재하지 않으면 빌드하고, 컨테이너를 시작함
* `docker-compose up --build` - 이미지가 존재해도 빌드 하고, 컨테이너를 시작함
* `docker-compose up --no-build` 이미지 빌드 없이 컨테이너 시작, 이미지 없으면 실패
* `docker-compose up -d `  detached 모드로 켜서 , 앱을 백그라운드에서 실행 시킨다. 아웃풋 표출 안함
* `docker-compose down` 컨테이너 멈추기

