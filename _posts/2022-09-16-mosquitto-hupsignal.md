---
title: mosquitto에 설정정보 변경 반영하기
subtitle: HUP signal을 전송시켜 설정정보를 Reload하는 방법
layout: post
author: 이상훈
---

mosquitto는 open source기반의 대표적인 MQTT Broker로 저희 에어릭스에서도 센서 데이터를 수집하는 용도로 사용하고 있습니다.

오늘은 mosquitto의 설정정보가 변경되었을 때, 서버를 직접 재시작시키지 않고 HUP signal을 전송하여 변경된 설정내용을 Reload하는 방법에 대해서 포스팅하려고 합니다.

의외로 방법은 간단합니다.

## HUP signal란?

리눅스 운영체제에서 HUP hangup의 약자로 프로세스를 재시작시키는 시그널을 의미합니다. 

## mosquitto의 PID확인

HUP signal을 mosquitto에 전송시켜서 설정정보를 Reload하게 하려면 mosquitto의 PID(프로세스 ID)를 먼저 확인해야 합니다.
mosquitto의 PID는 pid_file에 저장되어 있습니다. pid_file의 경로는 mosquitto.conf 파일을 열어서 확인할 수 있습니다.
 
**아래는 제가 테스트에 사용했던 mosquitto.conf파일의 내용입니다.**
```bash
pid_file /run/mosquitto/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest file /var/log/mosquitto/mosquitto.log

include_dir /etc/mosquitto/conf.d
```

파일의 내용을 보니 pid_file의 경로가 /run/mosquitto/mosquitto.pid로 지정되어 있는 것을 알 수 있었습니다. /run/mosquitto/mosquitto.pid 파일을 열어서
pid의 값을 확인하면 됩니다. 제가 테스트했던 환경에서는 PID가 2380으로 저장되어 있었습니다.

## HUP signal 발생

우분투 리눅스 기준으로 HUP Signal을 발생시키는 방법은 다음과 같습니다.

```bash
$sudo kill --signal HUP [PID]
```

제가 테스트했던 환경에서는 PID가 2380이었기 떄문에 다음과 같이 명령을 실행시켜서 HUP signal을 발생시킬 수 있었습니다. 

```bash
$sudo kill --signal HUP 2380
```

HUP signal이 정상적으로 발생되었다면 실행 중이던 mosquitto 프로세스가 재시작되면서 설정정보가 reload되었을 것입니다.
mosquitto의 로그 파일을 열어보면 아래 그림처럼 Reloading config메시지가 출력된 것을 확인할 수 있습니다.

![log](/img/posts/mosquitto_log.png)

## HUP signal을 사용해야 하는 이유

프로세스를 직접 kill하는 방식으로 실행 중인 mosquitto를 중단시키고, 재시작시키는 방식은 구현되어 있는 종료함수가 제대로
실행되지 못하고 즉시 프로세스가 중단될 수 있습니다. 그런 경우 중요 데이터의 유실이 발생하거나 프로세스가 사용중이던 리소스가
제대로 반납되지 못할 수 있습니다. 

실제 서비스를 운영하는 서버라면 ```안정성```을 유지해야 합니다. 그래서 설정정보가 변경되는 경우에는 
HUP Signal을 발생시켜서 mosquitto 프로세스가 정상적으로 종료되고 재시작될 수 있도록 하는 것이 중요할 것 같습니다.   
