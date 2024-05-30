---
title: 여과 집진기의 필터백 상태 진단
subtitle: 기초적인 진단 방법
layout: post
category: technote
author: 강민석
thumbnail: /img/posts/2024-04-02/filterbag_diffp.png
---

# 여과 집진기의 필터백 상태 진단

## 0. 개요

여과 집진기의 핵심 요소이자 소모성 부품인 `필터백`의 상태를 파악하는 기초적인 내용에 대해 작성해보았습니다.

## 1. 차압값을 통한 상태 진단

`차압`은 필터백의 상태를 판단하는 가장 중요한 값으로 흡기부(In-Let)의 압력과 배기부(Out-Let) 압력의 차이를 나타냅니다.
여과 집진기 가동 시 오염된 공기 속의 먼지를 필터백이 걸러주며 그 중 일부는 필터백에 달라붙어 공기 흐름을 방해합니다.

이로 인해 점차 차압값이 상승하게 되며 원활한 가동을 위해 주기적 또는 차압값에 따라 먼지를 털어내는 작업을 하며 이를 `탈진`이라고 합니다.
필터백을 오래 사용하면 탈진 작업을 하였음에도 필터백의 먼지가 완전히 제거되지 않고 쌓이게됩니다.
먼지가 많이 쌓여 필터백이 제 기능을 하지 못하면 수명이 다 되었다고 판단되며 교체 작업을 실시합니다.

평균 차압값은 필터백의 수명 주기에 따라 아래와 같은 특정한 패턴을 가집니다. 안정기가 지나 차압값이 급격히 상승하면 교체 시기가 도래했다고 볼 수 있습니다.

![filterbag_diffp](/img/posts/2024-04-02/filterbag_diffp.png)

- 필터백 최초 설치 시 차압은 0이 아닌 50부근이며, 이후 급격히 상승해 안정기에 들어갑니다.
- 이후 수명의 대부분 환경부 기준치 내에서 서서히 상승합니다. 다만 집진기 별로 안정기 차압 범위가 다를 수 있습니다.
- 교체 시기가 다가오면 차압이 급격히 상승하며, 이를 통해 필터백의 교체 필요(수명 종료)여부를 판단합니다.

다만 집진기 전체의 차압값만 확인 가능한 경우 정확도가 떨어지므로 챔버별로 차압 측정이 가능할 때 참고하면 좋을 것 같습니다.

## 2. 스택(굴뚝) 먼지량을 통한 상태 진단

집진기는 공기 속 먼지량을 저감하기 위한 설비이기 때문에 굴뚝을 통해 배출되는 먼지량을 측정하여 집진기(필터백)의 상태를 진단할 수 있습니다.
보통의 경우 초미세먼지량(PM2.5)을 기준점으로 잡으며, 환경부 기준은 15㎍/㎥ 이하 입니다.

미세먼지가 스택에 검출된다는 것은 필터백 파공(구멍) 발생으로 인해 먼지가 걸러지지 않고 바로 배출된다는 것을 의미합니다. 실제 파공이 발생하는 15㎍/㎥ 값 이전에 문제가되는 필터백 교체를 실시합니다.

![filterbag_dust](/img/posts/2024-04-02/filterbag_dust.png)

## 3. 영향을 줄 수 있는 변수

![filterbag_equipment](/img/posts/2024-04-02/filterbag_equipment.png)

1. 흡기부 덕트(Inlet Duct)에 파공(구멍)이 생기면 외부 공기 및 습기가 유입되어 필터백에 먼지가 많이 달라붙게 되어 차압이 상승할 수 있습니다.
2. 스택(Stack) 댐퍼 개폐율에 따라 차압에 변화가 생길 수 있습니다. 개폐율이 높을수록 풍량(Air Volumr)이 강해지며 이는 곧 차압 상승으로 이어질 수 있습니다.
3. 스택의 용량은 일반적으로  후드(Hood) 용량의 110%로 설계됩니다. 스택 용량이 이보다 모자라게 설계된 경우 풍량이 부족하여 차압이 낮게 나타날 수 있습니다.