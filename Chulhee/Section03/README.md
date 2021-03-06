# 도커 이미지 내부 파일 구조 보기

```bash
docker run [이미지 이름]
```

docker : 클라이언트

run : 컨테이너 생성 및 실행

[이미지 이름] : 컨테이너를 위한 이미지



**작동 순서**

1. 도커 클라이언트에 명령어 입력 후 도커 서버로!
2. 서버에서 컨테이너 위한 이미지가 이미 캐시 되어 있는지,
3. 없다면 도커 허브에서 다운 받아오고 컨테이너 생성



**이미지로 컨테이너 생성하는 순서**

1. 먼저 파일 스냅샷 되어있는 것을 컨테이너의 하드 디스크에 올린다
2. 시작 커맨드를 이용하여 어플리케이션을 실행한다.



# 컨테이너들 나열하기

**현재 실행중인 컨테이너 나열**

```bash
docker ps
```

![image-20210815100205957](../images/docker_ps.png)

| container id          | image       | command               | created              | status | Ports                                          | names                |
| --------------------- | ----------- | --------------------- | -------------------- | ------ | ---------------------------------------------- | -------------------- |
| 컨테이너 고유 id 해시 | 도커 이미지 | 시작 시 실행될 명령어 | 컨테이너 생성된 시간 | 상태   | 컨테이너가 개방한 포트와, 호스트에 연결한 포트 | 컨테이너 고유한 이름 |



**원하는 항목만 보기**

--format 옵션 쓰면 된다!



# 도커 컨테이너의 생명주기

![image-20210815100844843](../images/docker_lifecycle.png)

`docker run <image>` = `docker create <image> ` + `docker start <container>`



- docker create -> 파일 스냅샷 하드디스크에!



# Docker Stop vs Docker Kill

- Stop 
  - gracefull 하게 멈춘다. 
  - 다시 start 가능! 말 그대로 중지!
- kill
  - 강제로 멈추게 하고, 죽인다!



# 컨테이너 삭제

`docker rm <container>`

중지 이후에 삭제 가능!

중지되지 않아도 지우고 싶으면? `--force` 옵션 줄 수는 있다

- 이미지 삭제하고 싶으면?
  - `rmi` 사용!
  - `docker rmi <image id>`

- 컨테이너 / 이미지 / 네트워크 모두 삭제하고 싶으면?
  - `docker system prune`
  - 모두 정리하고 싶을 때!
  - 실행중인 컨테이너엔 영향 없음!



# 레디스를 이용한 컨테이너 이해

- `docker run redis`
- 레디스 서버를 키고, 레디스 클라이언트 작동이 안된다?
- 레디스 클라이언트도 컨테이너 안에서 실행을 해야함
- `docker exec -it <컨테이너 아이디> redis-cli` 로 컨테이너 안에서 클라이언트 써야함
- `-it` 를 적어야 ( interactive terminal ) 계속 명령어를 적을 수 있음 안적으면 redis-cli 실행 후 바로 꺼짐



# 실행 중인 컨테이너에서 터미널 생활 즐기기

- `docker exec -it <container> sh`
- `docker run -it <image> sh` 



