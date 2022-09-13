---
title: "(1) PLC [PLC 개요, 동작, 분류, 프로그램]"
subtitle: PLC란 무엇인가
layout: post
author: yeonggyu.kim
---

# (1) PLC [PLC 개요, 동작, 분류, 프로그램]

PLC 통신 프로토콜을 통해서 PC와 인터페이스를 할 수 있도록 개발을 하면서 필요한 PLC에 대한 내용들을 작성해봅니다. 우선적으로, PLC가 어떤 것인지 그리고 어떻게 구성이 되어있고 동작 방식에 대해서 작성하였습니다. 

### PLC

**Programmable Login Control** 의 약자로 `프로그램` 가능한 `논리 제어 장치`를 나타내며, 과거 릴레이 회로 제어의 불편함을 개선하기 위해서 개발이 되었습니다. 배선을 프로그램이 대신해서 기계를 동작 시킵니다. 

![Image Alt PLC](/img/posts/plc_image.png)

### 동작

동작 방식은 입력 장치(센서 정보)로 받아들인 뒤에 메모리에 작성되어 있는 프로그램에 의해서 순차적으로 논리를 처리하고 결과를 출력하여 외부 장치를 제어하는 방식으로 `직렬 처리 방식`입니다. 

### 분류

PLC를 분류하자면 **일체형**과 **모듈형**으로 나눌 수 있습니다.

- 일체형

`하나의 장치`에 전원장치 , CPU , 메모리 , 입출력 기능이 모두 들어있습니다.  보통 일체형 PLC는 **소형**으로 제작되어 모듈형 PLC 보다 `저사양`으로 간단한 설비의 자동화나 단독 제어 설비에 사용이 되어집니다. 

- 모듈형

`기능에 따라서 모듈`로 나뉘어져 있으며 **전원, 연산, 입력, 출력**으로 4가지로 구성되어 있다고 볼 수 있다. 전원은 PLC에 파워를 공급해주는 파워모듈, 연산은 논리/산술 연산 처리 와 메모리 가능을 담당하는 CPU 모듈, 입력은 외부의 신호를 받을 수 있는 모듈, 출력은 연산을 처리한 뒤 결과를 외부 신호로 보내는 모듈을 나타냅니다. 

PLC 모듈을 찾다보면 `특수 모듈`이라는 것이 있는데 특수 모듈은 `고도화되거나 특수한 작업`이 필요한 경우에 대해서 사용되어 지는 모듈입니다. 예를 들어서 온도 제어 혹은 위치 결정 제어 등이 있습니다. 

### 프로그램

PLC 프로그램을 하기 위해 당연하게도 언어가 사용이 됩니다. 그 언어의 종류는 LD (래더), ST(구조 언어), FB(기능 블록) 등 존재합니다. 제가 가장 많이 본 것은 래더 언어이며 PLC 프로그램 예시를 찾다보면 흔하게 만날 수 있습니다. 래더는 아래의 이미지와 같이 생겼습니다. 

![Image Alt LD](/img/posts/plc_ld.png)

여기서 가장 중요한 것은 `마지막에 END가 들어가야 한다는 것`입니다. 마지막에 END가 나타내는 것이 프로그램이 끝났다는 것을 알려주는 것 입니다.

다음으로, 개발자의 입장에서 가장 친근하게 접근할 수 있는 ST(구조 언어)입니다. 이미지와 같이 C 언어나 Java 등 개발 언어에 사용하는 방식과 같이 사용이 된다는 것을 확인할 수 있습니다.

![Image Alt ST](/img/posts/plc_st.png)

그 외에도 언어의 종류가 더 있지만 여기에선 생략하고 넘어가도록 하겠습니다..

프로그램을 작성하였다면 어떤 방식으로 진행이 되는 지가 궁금할 것이라고 생각이 됩니다. PLC 프로그램은 순차적으로 실행이 됩니다. 
여기에서 LD 언어로 작성된 프로그램이 동작한다고 가정하였을 때, 프로그램은 위에서 순차적으로 내려올 것 입니다. 이때, 마지막에 만나는 END 지점에 도착했다고 끝나는 것이 아니라 다시 처음부터 시작이 됩니다. 이렇게 프로그램이 계속해서 실행이 되고 있다고 보면 될 것입니다. 
이 부분에서 상세히 설명하면 일정한 스캔 주기마다 프로그램이 순차적으로 실행이 되고 있기 때문에 입력 신호가 변경이 되더라도 프로그램을 다시 스캔되지 않는 이상 처리되지 않고 있다가 다시 스캔이 시작되고 나서야 처리가 된다고 볼 수 있습니다. 
여기에서 프로그램 1바퀴를 다 도는 것을 ‘`1 스캔`‘이라고 부르며 하나의 접점에 대해서는 ‘`1 스탭`‘이라고 합니다. 개발자의 입장에서 이벤트 처리 방식과는 다르다고 볼 수 있습니다. PLC 프로그램이 대기 형태를 가지고 있는 것이 아닌 지속적인 스캔이 되어서 해당 신호에 맞게 처리가 되고 있다고 이해하면 될 것 같습니다.

---

여기까지 설명한 내용이 PLC가 어떤 것이고 동작 방식과 프로그램이 어떻게 동작하는 것인지에 대해서 간략하게 설명을 했습니다. 다음 내용에는 PLC 프로그램 사용에 쓰이는 도구와 PLC 메모리 구조 내용들에 대해서 설명을 하도록 하겠습니다.