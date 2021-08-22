# 기본적인 도커 클라이언트 명령어 알아보기

## 도커 이미지 내부 파일 구조 보기

* `docker run <이미지>`

  * 작동순서
    1. 도커 클라이언트에 명령어 입력 후 도커 서버로 보냄
    2. 도커 서버에서 컨테이너를 위한 이미지가 캐쉬되어있나 확인
    3. 없으면 허브에서 받고, 이미지로 컨테이너 생성

  * 이미지로 컨테이너 생성하는 순서
    1. 먼저 파일 스냅샷 되어있는 것을 하드디스크에 올린다
    2. 시작 커맨드를 이용해서 어플리케이션을 실행한다.

* `docker run <이미지> ls`

  ![image](https://user-images.githubusercontent.com/26623194/129467981-72ccf580-f9d8-4406-a95d-3b00c43a14e5.png)

  ![image](https://user-images.githubusercontent.com/26623194/129467998-8805071a-f3c5-42d6-ac96-4c5b921805eb.png)

  * hello-world 에는 ls 명령어 조차 없어서 안됨
  * 뭐시기에따라 명령어 쓸수있는게 다를수도,,.



## 컨테이너들 나열하기

* `docker ps`
  * ps -> process status
  * ![image](https://user-images.githubusercontent.com/26623194/129468058-4e71749d-9367-4d7a-9f01-725ec5d52726.png)
    * CONTAINER ID - 컨테이너 고유한 해쉬값 / 일부만 표출
    * IMAGE - 컨테이너 생성 시 사용한 도커 이미지
    * COMMAND - 컨테이너 시작시 실행될 명령어 - 대부분 이미지에 내장되어있으므로 설정 필요 X
    * CREATED 
    * STATUS - 컨테이너 상태 / 실행중은 UP, 종료는 Exited , 일시정지 Pause
    * PORTS - 컨테이너가 개방한 포트와 호스트에 연결한 포트 / 따로 설정 안하면 출력 안됨
    * NAMES - 컨테이너 고유한 이름 / 컨테이너 생성시 --name 옵션으로 / 안주면 임의로 만들어줌
* `docker ps --format 'table{{.Names}}\table{{.Image}}'`
  * 필요한거만

* `docker ps -a`
  * all임 

## 도커 컨테이너의 생명주기

* 생성(create) - 시작(start) - 실행(running) - 중지(stopped) - 삭제(deleted)

* `docker run <이미지>` -> `docker create <이미지>` + `docker start <컨테이너이름>`
* docker create 하면 파일 스냅샷을 하드디스크에
* docker start에 시작시 실행될 명령어 실행

![image](https://user-images.githubusercontent.com/26623194/129468205-0316623e-0949-40aa-87de-c8d4039bb929.png)

* -a ( attach ) 옵션은 아웃풋들 화면에 표시



## Docker Stop vs Docker Kill

* 둘다 실행중인 컨테이너를 중지시킴
* Stop은 Gracefully하게 중지를 시킴 - 자비롭게 그동안 하던 작업들을 완료하고 컨테이너를 중지시킨다
* Kill은 바로 중지시킴

## 컨테이너 삭제하기

* 먼저 중지 후에 삭제가 가능함

* 중지된 컨테이너를 삭제하고 싶다면?

  * `docker rm <아이디 / 이름 > `

* 모든 컨테이너를 삭제?

  * ```
    docker rm `docker ps -a -q`
    ```

* 도커 이미지를 삭제?

  * `docker rmi <이미지 id>

* 컨테이너 / 이미지 / 네트워크 모두 삭제하고싶다면?

  * `docker system prune`
  * 도커를 쓰지 않을 때 모두 정리하고 싶을 떄 사용하면 좋음
  * 실행하고있는 컨테이너에는 영향을 주지 않음

## 실행 중인 컨테이너에 명령어 전달

`docker exec <컨테이너 아이디>`

docker run은 컨테이너 새로 생성해서 !

exec는 이미 실행중인 컨테이너에!



## 레디스를 이용한 컨테이너 이해

* `docker run redis`
* 레디스 서버를 키고, 레디스 클라이언트 작동이 안된다? 
* 레디스 클라이언트도 컨테이너 안에서 실행을 해야함
* `docker exec -it <컨테이너 아이디> redis-cli`  로 컨테이너 안에서 클라이언트 써야함
* `-it` 를 적어야 ( interactive terminal ) 계속 명령어를 적을 수 있음 안적으면 redis-cli 실행 후 바로 꺼짐

## 실행 중인 컨테이너에서 터미널 생활 즐기기

* 여태 매번 exec -it 로 했어야함 , 번거러움
* `docker exec -it <컨테이너아이디> sh`
* `docker run -it <이미지> sh` 도 됨
* 그냥 쉘 키는거자나
* 나오려면 control + d