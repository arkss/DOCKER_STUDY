# 간단한 어플을 실제로 배포해보기(테스트 & 배포 부분)

## 섺션 설명 & 깃헙에 소스코드 올리기

## Travis CI

* CI를 위한 서비스 

1. 깃헙에 푸시
2. 웹훅으로 Travis CI에 콜 가려나? 
3. Travis CI에선 업데이트 된 소스코드를 갖고옴
4. 깃헙에서 가져온 소스의 테스트 코드를 실행
5. 테스트 코드 실행 후 테스트가 성공하면 AWS같은 호스팅 사이트로 보내서 배포

## Travis 이용 순서

1. 가입하고, 설정하는거..
2. .travis.yml에서 설정 한다



## .travis.yml 파일 작성하기

```yaml
sudo: required

language: generic

services:
  - docker

before_install:
  - echo "start creating an image with dockerfile"
  - docker build -t smileajw1004/docker-react-app -f Dockerfile.dev .

script: 
  - docker run -e CI=true smileajw1004/docker-react-app npm run test -- --coverage

after_success: 
  - echo "Test Success"
```

* sudo - 관리자 권한 갖기
* language - 언어 선택
* services - 도커 환경 구성
* before_install - 스크립트를 실행할 수 있는 환경 구성
* script - 싱행할 스크립트 ( 테스트 실행 ) 
* after_success - 테스트 성공 후 할일



`git clone --depth`

## AWS

```yaml

deploy:
  edge: true
  provider: elasticbeanstalk
  region: ap-northeast-2
  app: docker-react-app
  env: DockerReactApp-env
  bucket_name: elasticbeanstalk-ap-northeast-2-**
  bucket_path: docker-react-app
  on:
    branch: main
  access_key_id: $AWS_ACCESS_KEY
  secret_access_key: $AWS_SECRET_ACCESS_KEY

```

* provider - 외부 서비스 표시
* region - aws의 서비스가 위치하고 있는 물리적 장소
* app - 생성된 앱 이름
* env - 환경 이름
* bucket_name - eb를 위한 s3 버킷 이름
  * travis ci에서 파일 압축해서 s3로 보냄 
* bucket_path - 앱 이름과 동일
* on branch - 브랜치 설정

## Travis CI의 aws 접근을 위한 api 생성

GIthub -> Travis CI -> aws

Travis ci 대시보드에서 more options으로 env 넣고, 위처럼 입력해두면 되는듯













