---
title: "웹 취약점 분석과 해킹 대응 - 개발팀 세미나"
subtitle: 시작이 중요하다
layout: post
author: 강민석
---

### 0. 개발팀 세미나

개발팀 인원들 모두 맡은 업무에 성실하면서도 자기 개발에 힘쓰고 있습니다. 하지만 새로이 습득한 지식과 기술들이 팀원들과 공유되지 않아, 활용되지 못하고 개인의 것으로 남아있거나 소실 경우가 많은 것이 사실입니다. 이에 우리 에어릭스 개발팀에서는 내부 세미나를 열어 서로가 얻은 기술을 공유하고 의견을 나눔을 통해 실제 개발에 적용될 수 있도록 하고있습니다.

### 1. 주제 : 웹 취약점 분석과 해킹 대응 - 22년 10월 13일

![security_semina](/img/posts/2022-10-13/security_semina.jpg)

[교안 다운로드 : 웹 취약점 분석과 해킹 대응 - 개발팀 세미나 자료.pptx](https://aerixdev.github.io/download/security_semina.pptx)

여태까지 우리 개발팀의 방향은 기능에 충실하고 에러, 버그가 없는 제품을 만드는 것을 중점으로 하고있었습니다. 보안에 있어서는 중요하다는 생각은 가지고 있지만, 취약점 사례들을 알 지 못하고 실제로 어떤 피해로 다가올 수 있는지 체감하지 못하고 있었던 실정이라 크게 신경 쓰지 못하고 있는 상황입니다. 이번 세미나를 통해 웹 보안의 주요 취약점 사례들과 대처 방법을 알아보면서 보안에 대한 관심을 환기할 수 있는 시간을 가져보았습니다.

### 2. 세미나 진행

이번 세미나는 웹 보안을 위한 툴들의 기초 사용법과 주요 취약점 사례들에 대해 알아보는 것이 주요 내용이었습니다. 

![owasp_zap](/img/posts/2022-10-13/owasp_zap.png)

웹 보안 스캐너 OWASP-ZAP(Zed Attack Proxy)을 통한 웹페이지 취약점을 분석법에 대해 알아보았습니다. Spider, 강제 검색 등의 기법으로 웹페이지에서 사용자에게 공개되지 않은 페이지들이 손쉽게 노출될 수 있는 상황에 대해 알아보았습니다.

![sql_injection](/img/posts/2022-10-13/sql_injection.png)

또한 주요 취약점으로 경로 탐색 취약점, SQL 인젝션, 크로스 사이트 스크립팅(XSS) 사례를 알아보고 그에 대처법을 공유했습니다. 이 중 SQL 인젝션이 우리 개발에 있어 가장 취약한 부분이며 대처하기도 쉽지 않은 부분이었습니다. 기본적인 SQL 인젝션에 대한 대비부터 먼저 실시하고, 고도의 인젝션 공격들에 대해서는 앞으로 개발자로서 발전하면서 끊임없이 싸워야 할 부분이라는 것을 체감했습니다.
  
![security_onion](/img/posts/2022-10-13/security_onion.png)

마지막 순서로 NSM(Network Security Monitoring) 도구인 Security Onion에 대해 알아보았습니다. 앞서 SQL 인젝션 상황과 같이 개발을 하면서 모든 취약점에 대해 대비할 수 는 없기 때문에 필요한 것이 NSM입니다. 제품 운영 단계에서 실시간으로 공격을 감지하고 이에 대해 적절한 대처를 하도록 도와줍니다. 제품 출시 후 NSM을 통한 중앙 관제를 도입하는 것도 좋은 방안이 될 수 있겠습니다.

### 3. 마치며

이번 세미나를 통해 웹 보안에 대한 깊은 지식을 가졌다고 보긴 힘들 것 같습니다. 하지만 보안에 대한 관심을 환기하고 앞으로 과업에 대한 마음가짐을 가지는 데에는 충분한 시간이었습니다.  실제로 쿼리문 작성에도 더 신경을 쓰게 되고, 보안 자동화 관련 API 도입에도 관심을 가지게 되었습니다. 우리 개발 팀 모두 한걸음 나아가는 시간이 되었던 것 같습니다.