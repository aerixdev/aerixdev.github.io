---
title: "(2) PLC [프로그램 툴, 메모리, 주소체계]"
subtitle: PLC 메모리와 주소
layout: post
author: 김영규
---

# (2) PLC [프로그램 툴, 메모리, 주소체계]

이전 장에서는 PLC 개요와 동작 방식과 구성에 대해서 설명하며 프로그램에 대해서 알아보았습니다. 이번에는 PLC 프로그램을 작성하기 위해 사용되는 툴과 PLC 메모리 영역과 주소에 대해서 알아보도록 하겠습니다. 

 

### 프로그램 툴

---

PLC 프로그램을 작성하고 디버깅을 하기 위해서는 각 제조사마다 제공하는 프로그램 툴이 존재합니다. LS 산전의 경우에는 ‘XG5000’, 미쯔비시는 ‘GX Works’, 싸이먼은 ‘CICON’ 등… 존재합니다. 각 프로그램 툴은 제조사에서 제공하여 다운을 받아 사용할 수 있습니다. 소개 글에서는 LS 산전을 기준으로 설명하였습니다. 

![[ XG5000 ]](/img/posts/plc_program_main.png)

[ XG5000 ]

PC와 PLC를 USB 혹은 Ethernet으로 연결하여 프로그램 툴을 통해서 PLC 내부의 프로그램을 모니터링 하거나 불러올 수 있으며, 작성한 프로그램을 PLC에 쓸 수 있습니다. 

<aside>
💡 처음 연결 시 네트워크 설정이 되어 있지 않기 때문에 USB 연결

</aside>

- PLC 네트워크 설정

PLC와 통신을 하기위해서는 IP 혹은 Port 번호에 대해서 설정이 필요할 것 입니다. 그럴 때에는 아래이 그림과 같이 PLC 통신 설정을 할 수 있습니다.

![PLC Network Setting](/img/posts/plc_network_set.png)

LS PLC 경우에는 드라이버 (통신 프로토콜)에 따라서 허용 가능한 Port 번호가 달라집니다.

- XGT 서버 (FEnet)
    
    TCP : 2004
    
    UDP : 2005
    
- 모드버스
    
    TCP : 502
    

① 네트워크 설정 → PLC 의 네트워크 정보 설정을 하여 ‘IP, 서브넷마스크, 게이트웨이’의 주소를 설정합니다. 

② 전용 접속 개수 → PLC와 인터페이스를 하기 위해서 접속 허용자 수를 설정합니다. 

③ 드라이버 설정 → 통해서 PLC 와 인터페이스를 하기 위한 통신 프로토콜을 결정합니다. 

- PLC 프로그램 전송

PLC 네트워크 설정을 하였다면, 프로그램 툴을 통해서 PLC의 프로그램을 가져와 확인(`읽기`)을 하거나 PLC 프로그램 메모리에 올려서 PLC가 프로그램 동작(`쓰기`)할 수 있도록 합니다. 

![PLC Program Read Write](/img/posts/plc_program.png)

- 모니터링

현재 작성된 프로그램에 대해서 디버깅 혹은 동작을 볼 때 사용하게 됩니다. 이 기능을 통해서 프로그램이 내부에서 어떻게 동작을 하고 있는지 확인할 수가 있습니다. 

![PLC Monitoring](/img/posts/plc_monitor.png)

① 모니터 → 작성된 프로그램을 디버깅 혹은 동작 과정을 확인하기 위해서 사용이 됩니다.

② 시스템 모니터 → PLC 의 메모리 데이터 및 시스템 데이터를 확인하기 위해서 사용이 됩니다.

프로그램 다운 링크 : <https://www.ls-electric.com/ko/download/?dc_id=6>

### 메모리

---

PLC CPU 모듈에는 데이터를 저장하는 메모리가 존재합니다. 메모리는 사용자가 시스템을 구축하기 위해 작성한 사용자 프로그램을 저장하는 **프로그램 메모리**와 운전 중 데이터를 저장하는 디바이스 영역을 제공하는 **데이터 메모리**가 있습니다. 각 모델마다 메모리의 크기와 영역은 다를 수 있습니다. 기본적으로 각 제조사의 사이트에서 해당 제품에 대한 사양을 확인하여 어떤 영역의 메모리가 존재하는지 확인을 하실 수 있습니다. 아래의 그림은 XGI 시리즈의 데이터 메모리 사양 부분을 나타내는 그림입니다.

![PLC Memory Spec](/img/posts/plc_memory.png)

데이터 메모리 영역마다 특징이 존재하고 있습니다. 몇 가지만 알아보도록 하겠습니다. 

| 구분 | 특징 |
| --- | --- |
| 직접 변수 | 프로그램에 사용되는 변수 값을 저장하기 위해서 사용할 때 |
| 시스템 플래그 | CPU에 이미 선언되어 PLC 상태를 나타내거나 동작 설정에 대해서 나타낼 때 |
| 아날로그 데이터 | 아날로그 , 고속카운트, 온도, 위치결정 등 아날로그의 데이터를 사용할 때
 |
| 고속 링크 플래그 | 고속 링크 통신 기능을 수행할 때 통신의 응답 진단을 위해서 사용할 때
서비스 상태와 에러 내용을 확인 가능 |
| P2P 파라미터 | P2P에서 파라미터 측정한 내용 |

메모리 영역에 ‘리테인 설정’을 하게되면 PLC가 정지(종료) 후 재 가동을 하여도 메모리의 데이터가 지워지지 않고 계속해서 유지하고 있습니다. 이전 데이터가 계속 유지가 되어야 한다면 리테인 설정이 가능한 메모리 영역에서 작업을 하는 것이 좋습니다. 

### 주소 체계 표현

---

모든 PLC는 비트(Bit)로 데이터를 표현하고 계산을 하는데, 이 비트들이 모여서 단위를 다음과 같이 나타내게 됩니다. 

- 비트 (Bit) ⇒ 1 Bit
- 바이드(Byte) ⇒ 1 Byte = 8 Bit
- 워드(Word) ⇒ 1 Word = 2 Byte = 16 Bit
- 더블워드(Double Word) ⇒ 1 Double Word = 2 Word = 4 Byte = 32 Bit
- 롱워드(Long Word) ⇒ 1 Long Word = 2 Double Word = 4 Word = 8 Byte = 64 Bit

단위가 나타내는 내용은 다음과 같이 주소에서 표현을 할 수 있습니다.  

| 단위 | 표현 |
| --- | --- |
| Bit | X |
| Byte | B |
| Word | W |
| Double Word | D |
| Long Word | L |

위에 설명한 내용을 종합적으로 합쳐서 PLC의 메모리 주소에 접근할 때 나타내는 주소의 표현을 예를 들어서 설명하겠습니다. 

예를 들어 메모리 영역 중 ‘M’의 주소 ‘1번지’의 단위는 ‘워드’를 나타낼 때 ‘%MW0001’로 표현을 하게 됩니다. 실제 PLC 프로그램에서는 ‘%’ 문구를 생략하여 사용할 수 있지만 PLC와 통신 프로토콜을 이용하여 사용할 때에는 붙여서 사용하게 됩니다.  

<aside>
💡 LS 산전 PLC 에서는 주소를 나타낼 때 앞에 ‘%’ 문구 포함됨

</aside>

---

여기까지 설명한 내용이 PLC를 설정하거나 프로그램을 작성할 때 사용되는 툴에 대한 설명과 PLC의 메모리가 어떤 종류가 있으며 해당 메모리를 어떻게 사용이 되는지, 메모리의 데이터에 접근하기 위해서 지정되는 주소 체계 방식에 대해서 설명하였습니다. 다음 내용에는 PLC의 통신 프로토콜 구조와 통신 프로토콜을 통한 인터페이스 방식에 대해서 설명을 하도록 하겠습니다.
