---
title: "Broker 서버의 TPS 측정을 위한 JMeter Remote 구축기"
subtitle: 테스트 환경 구축과 결과값
layout: post
author: 강민구,강민석
---

참조한 공식 문서 : [https://jmeter.apache.org/usermanual/remote-test.html](https://jmeter.apache.org/usermanual/remote-test.html)


## TPS 측정 배경

저희가 사용하고 있는 MQTT Broker 서버는 성능을 대략적으로만 파악하고 있는 상황이었습니다. 하지만 운용 단계에서는 생각보다 더 많은 부하가 걸리는 상황이 발생하기 때문에 서버가 최대로 처리할 수 있는 한계를 명확하게 파악하는 일이 필요했고 이를 경험이나 감에 맡기는 것은 바람직하지 않기 때문에 TPS(1초당 처리량)이라는 기준을 통해서 성능을 판단하는 방향으로 개선하기로 결정했기 때문입니다.

## TPS의 측정 도구로 JMeter을 선정한 이유

1. 무료
    
    회사에서 사용하는 도구이기 때문에 라이센스는 중요한 문제입니다. JMeter의 경우 Apache 라이센스를 채택하여 공개된 오픈소스라는 장점이 있습니다.
    
2. 다양한 플러그인
    
    플러그인을 통해서 편의성을 높여주는 기능을 추가할 수 있으며 무엇보다도 MQTT 서버를 테스트하는 만큼 MQTT 프로토콜을 지원해야만 했고 JMeter의 경우 이를 MQTT 플러그인을 통하여 지원하고 있습니다. 
    
3. Remote를 통하여 부하 시스템을 구축할 수 있다.
    
    1개의 컴퓨터로 서버에 부하를 거는 것보다는 다수의 컴퓨터에 서버로 부하를 거는 것이 보다 더 정확하게 부하를 걸 수 있으며 JMeter는 Remote 기능을 통하여 이러한 시스템을 손쉽게 구축하는 것이 가능한 도구입니다.
    

## 구축기

![jmeter](/img/posts/jmeter.png)

### 1. 부하 서버로 사용될 컴퓨터들을 모으기

정확한 테스트를 위해서 부하를 거는 서버가 여러 대인 상황에서 제어 서버를 통해서 명령을 내려서 목적지의 서버에 부하를 거는 상황이 바람직하기 때문에 개발팀의 내부에서 사용하지 않는 컴퓨터를 모았습니다.

### 2. 사용될 JMeter 만들기

마스터 서버(제어)와 슬레이브 서버(Remote)에서 JMeter은 동일한 자바 버전과 동일한 플러그인, 그리고 동일한 JMeter을 가져야 합니다. 이를 위해서 플러그인을 설치하여 커스텀한 JMeter을 만들고 이 JMeter을 각 서버에 배포하는 형태로 진행되었습니다.

### 2.1. 자바 버전의 확인

공식 문서에서 JMeter의 자바 버전은 제어 서버와 Remote 서버가 동일한 상황을 권장하고 있습니다. 자바 버전은 다음과 같은 명령어로 확인할 수 있습니다.

```jsx
//java 버전 확인
java --version
```

### 2.2. JMeter 플러그인의 설치 장소

기본적으로 플러그인의 설명에 나와있으나 보통은 JMeter 폴더의 /lib 또는 /lib/ext입니다.

### 2.3. 유용한 플러그인

JMeter Plugins Manager : [https://jmeter-plugins.org/wiki/PluginsManager/](https://jmeter-plugins.org/wiki/PluginsManager/)

JMeter의 플러그인을 손쉽게 관리하고 추가할 수 있는 플러그인입니다.

Response Times Over Time: [https://jmeter-plugins.org/?search=jpgc-graphs-basic](https://jmeter-plugins.org/wiki/ResponseTimesOverTime/)

측정 결과를 그래프로 확인할 수 있는 플러그인입니다.

mqtt-jmeter : [https://github.com/emqx/mqtt-jmeter](https://github.com/emqx/mqtt-jmeter)

MQTT 프로토콜을 측정할 수 있는 플러그인입니다.

### 3. JMeter 연동하기

설정한 JMeter을 배포하고 슬레이브 서버들을 실행시킨 후에 연동하여 제어 서버에서 명령을 내리면 총 4대의 서버가 목적지 서버에 부하를 거는 시스템을 구성하였습니다.

### 3.1. JMeter의 연동 및 실행방법

마스터의 설정 파일을 수정하여 슬레이브들의 주소를 등록합니다. 포트 번호는 따로 설정하지 않으면 디폴트 값 1099로 설정됩니다.

```
// ../bin/jmeter.properties
...
# Remote Hosts - comma delimited
remote_hosts=127.0.0.1,xxx.xx.xxx.xx,..
```

설정을 마친 후에 jmeter을 실행합니다. 이때 마스터와 슬레이브의 실행파일이 다르므로 주의해서 진행해야 합니다.  슬레이브들의 주소들이 정상적으로 등록된 경우에 실행 - 원격란에서 확인할 수 있습니다.

```
//마스터
jmeter.bat (윈도우) / jmeter.sh (리눅스)

//슬레이브
jmeter-server.bat / jmeter-server(리눅스)
```

### 3.2. Linux 관련 문제

linux의 경우 다음과 같은 메시지와 함께 정상적으로 실행되지 않는 문제가 있을 수 있습니다.

java.rmi.RemoteException: Cannot start. OO is a loopback address.

이러한 문제가 발생하는 경우 hostname을 기기의 IP 주소로 지정하여 실행시키는 방법으로 해결할 수 있습니다.

./jmeter-server -D java.rmi.server.hostname=IP 주소

### 3.3. 연동이 제대로 이루어지지 않는 경우

기본적으로 제어 포트에 해당하는 포트는 제어 서버와 슬레이브 서버 모두가 통신이 허용되어야만 합니다. 

1. 방화벽 해제(ubuntu 기준)

```
ufw disable
```

1. 포트 허용(ubuntu 기준)

```
ufw allow 1099
```

### 3.4 SSL 문제

SSL 오류가 발생하는 경우 SSL을 아예 사용하지 않도록 jmeter.properties에 다음과 같이 설정하거나 SSL 설정 후 진행합니다.

### 3.4.1 SSL 해제

```
server.rmi.ssl.disable=true
```

### 3.4.2 SSL 설정

```
$ cd jmeter/bin
$ ./create-rmi-keystore.sh
What is your first and last name?
  [Unknown]:  rmi
What is the name of your organizational unit?
  [Unknown]:  My unit name
What is the name of your organization?
  [Unknown]:  My organisation name
What is the name of your City or Locality?
  [Unknown]:  Your City
What is the name of your State or Province?
  [Unknown]:  Your State
What is the two-letter country code for this unit?
  [Unknown]:  XY
Is CN=rmi, OU=My unit name, O=My organisation name, L=Your City, ST=Your State, C=XY correct?
  [no]:  yes

Copy the generated rmi_keystore.jks to jmeter/bin folder or reference it in property 'server.rmi.ssl.keystore.file'
```

### 4. 테스트 계획 설정 및 테스트

구성된 시스템을 활용하여 목적지인 MQTT 서버의 테스트를 수행했습니다.

### 4.1 JMeter의 사용법

JMeter 실행 후 다음과 같은 같은 화면을 볼 수 있으며 테스트 계획을 설정한 후에 테스트할 수 있습니다. 여기에서는 간단한 예제로써 쓰레드 그룹을 만든 후에 간단한 HTTP Request 요청을 시도하겠습니다.

![](/img/posts/jmeter_home.png)
![](/img/posts/jmeter_thread.png)

Number of Threads : 사용자 수

Ramp-up Period : 사용자가 모두 생성되는데 걸리는 시간(길수록 천천히 생성)

Loop Count : 반복 횟수

Infinite : 무한반복

![](/img/posts/jmeter_http.png)
![](/img/posts/jmeter_request.png)

테스트 계획 설정이 끝났으면 다음과 같이 슬레이브에 테스트를 명령합니다.

![](/img/posts/jmeter_remote.png)

### 5. 실제 테스트 결과

사용하고 있는 Broker 서버에 100, 200, 400, 800, 1200개의 접속이 5분동안 발생하는 경우를 가정하여 테스트한 TPS 결과입니다.

100개의 접속을 가정한 경우
![](/img/posts/thingarx_100.png)
200개의 접속을 가정한 경우
![](/img/posts/thingarx_200.png)
400개의 접속을 가정한 경우
![](/img/posts/thingarx_400.png)
800개의 접속을 가정한 경우
![](/img/posts/thingarx_800.png)
1200개의 접속을 가정한 경우
![](/img/posts/thingarx_1200.png)

### 6. 결론

저희가 사용하고 있는 서버는 최대 800의 사용자가 동시에 접근하는 MQTT 접속을 처리할 수 있으며 TPS의 경우 1600~2800정도가 나온다는 것을 확인할 수 있었습니다. 또한 JMeter을 이용하여 구축함으로써 MQTT가 아닌 다른 프로토콜을 측정하는 것이 가능한 시스템을 만들 수 있었습니다.
