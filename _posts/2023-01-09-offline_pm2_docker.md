---
title: PM2 및 오프라인(폐쇄망) 설치
subtitle: 선배님은 위대하다
layout: post
author: 강민석
---

# PM2 오프라인 설치

## 0. 개요

pm2를 폐쇄망 환경에서 설치하려고 하면, 각종 선행 패키지들을 모두 수동으로 설치하는 고통스러운 과정을 거쳐야합니다.
하지만 위대한 선배 개발자의 도움을 통해 쉽게 설치하는 방법이 있어 공유해봅니다.

pm2-installer를 통해 설치하게 되며, 인터넷이 가능한 PC에서 설치 파일 제작 후, 오프라인 PC로 옮겨서 설치하게 됩니다.

pm2-installer 링크.

https://github.com/jessety/pm2-installer

## 1. 같은 버전의 NodeJS 설치

설치 파일 제작 시, 대상 PC와 파일 제작 PC의 node 및 npm 버전이 동일해야 합니다.

노드 구버전은 다음 링크에서 구할 수 있습니다.
[https://nodejs.org/ko/download/releases/](https://nodejs.org/ko/download/releases/)


폐쇄망 PC에 노드와 npm이 없다면, 패키지 파일을 다운로드 후 다음과 같은 과정을 거쳐 설치 해줍니다.
```bash
# 인터넷이 가능한 PC에서 다운로드
wget $파일링크

# USB나 SCP 등을 이용해 설치 대상 PC로 파일을 옮겨줍니다.

# lib 폴더로 옮기기
mv $파일 /usr/local/lib

# 파일 압축풀기
tar xvf $파일

# 명령어를 통한 바로 실행을 위해 심볼릭 링크 등록
ln -s /usr/local/lib/$노드폴더/bin/* /usr/local/bin/

# 압축파일 삭제
rm -f $
```

## 2. PM2 설치 파일 제작

pm2-installer를 다운받고 압축을 풀어줍니다.  압축 푼 폴더로 이동 후 작업합니다.

```bash
cd pm2-installer-main

npm run bundle

# pm2 버전에 따라 지원하는 node 버전이 다르므로 확인이 필요합니다.
# pm2 버전 변경이 필요한 경우 다음과 같이 package.json 파일 수정 후에 bundle 명령을 내립니다.

sudo vi package.json

"dependencies": {
    "@jessety/pm2-logrotate": "^2.7.1",
    "node-windows": "1.0.0-beta.6",
    "pm2": "4.0.0" << 버전 변경
  },
  "devDependencies": {
    "@jessety/eslint-config": "^1.0.8",
    "editorconfig-checker": "^4.0.2",
    "eslint": "5.16.0" << 버전 변경
  }
```

## 3. 설치 파일 배포

bundle 작업을 한 후 폴더 전체를 다시 압축하여 대상 pc로 옮겨줍니다.

```bash
tar -cvf bundle.tar pm2-installer-main

# 파일 옮기기
# 대상 PC에서 압축풀기

tar -xvf bundle.tar

# 폴더로 이동
cd pm2-installer-main

# 설치하기
npm run setup

# 심볼릭 링크 등록
ln -s /usr/local/lib/$노드폴더/bin/* /usr/local/bin/
```

설치가 완료되었습니다.

### 외전. Docker 오프라인 설치

폐쇄망에서 Docker를 설치하는 방법은 더욱 간단합니다.
아래 링크에서 원하는 Dockere 패키지를 다운 받습니다.

https://download.docker.com/linux/static/stable/x86_64/

SCP나 USB등의 방법을 활용해 폐쇄망으로 패키지 파일을 옮겨준 후, 압축을 풀어줍니다.

```bash
tar -xvf $도커압축파일
```

이후 압축 풀어서 나온 모든 파일을 /usr/bin/ 폴더로 옮겨주면 docker 실행이 가능합니다. 
```bash
sudo mv $압축해제한폴더/* /usr/bin

#도커 실행
sudo dockered &
```

