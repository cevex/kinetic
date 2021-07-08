#!/bin/bash

echo "running mtf"

cd ../frontend/kinetic-app

mkdir src/app/modules

echo "================================"
echo "===          CORE            ==="
echo "================================"

mkdir src/app/modules/core


echo "==========   Healthcheck  ============"
mkdir src/app/modules/core/treatment

ng g module ./modules/core/treatment/treatment --flat

ng g service ./modules/core/treatment/treatment --flat
ng g class ./modules/core/treatment/treatment --type model --skip-tests

mkdir src/app/modules/core/treatment/task
ng g service ./modules/core/treatment/task/treatment-task --flat
ng g class ./modules/core/treatment/task/treatment-task --type model --skip-tests

ng g class ./modules/core/treatment/task/specific/exercice-treatment-task --type model --skip-tests
ng g class ./modules/core/treatment/task/specific/diagnosis-treatment-task --type model --skip-tests
ng g class ./modules/core/treatment/task/specific/replug-treatment-task --type model --skip-tests
ng g class ./modules/core/treatment/task/specific/test-location-treatment-task --type model --skip-tests
ng g class ./modules/core/treatment/task/specific/change-location-treatment-task --type model --skip-tests

ng g class ./modules/core/treatment/task/choice/pain-assessment-choice --type model --skip-tests
ng g class ./modules/core/treatment/task/choice/change-location-choice --type model --skip-tests

echo "==========   exercises  ============"

mkdir src/app/modules/core/exercices
ng g module ./modules/core/exercices/exercice --flat
ng g service ./modules/core/exercices/exercice --flat
ng g class ./modules/core/exercices/exercice --type model --skip-tests

echo "==========   diagnosis  ============"

mkdir src/app/modules/core/diagnosis
ng g module ./modules/core/diagnosis/diagnosis --flat
ng g service ./modules/core/diagnosis/diagnosis --flat
ng g class ./modules/core/diagnosis/diagnosis --type model --skip-tests

echo "==========   body  ============"
mkdir src/app/modules/core/body
ng g module ./modules/core/body/body --flat

ng g service ./modules/core/body/position/body-position --flat
ng g class ./modules/core/body/position/body-position --type model --skip-tests

ng g service ./modules/core/body/area/body-area --flat
ng g class ./modules/core/body/area/body-area  --type model --skip-tests

echo "================================"
echo "===          Screens         ==="
echo "================================"

mkdir src/app/modules/treatment

echo "############### TREATMENT  ###############"

echo "==========   exercise  ============"

mkdir src/app/modules/treatment/exercice
ng g module ./modules/treatment/exercice/exercice --flat
ng g service ./modules/treatment/exercice/exercice --flat --skip-tests
ng g component ./modules/treatment/exercice/exercice --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   diagnosis  ============"

mkdir src/app/modules/treatment/diagnosis
ng g module ./modules/treatment/diagnosis/diagnosis --flat
ng g service ./modules/treatment/diagnosis/diagnosis --flat --skip-tests
ng g class ./modules/treatment/diagnosis/diagnosis --type model
ng g component ./modules/treatment/diagnosis/diagnosis --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   redo-exercice  ============"

mkdir src/app/modules/treatment/redo-exercice
ng g module ./modules/treatment/redo-exercice/redo-exercice --flat
ng g service ./modules/treatment/redo-exercice/redo-exercice --flat --skip-tests
ng g component ./modules/treatment/redo-exercice/redo-exercice --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   pain-location  ============"

mkdir src/app/modules/treatment/pain-location
ng g module ./modules/treatment/pain-location/pain-location --flat
ng g service ./modules/treatment/pain-location/pain-location --flat --skip-tests
ng g component ./modules/treatment/pain-location/pain-location --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   pain-assessment  ============"

mkdir src/app/modules/treatment/pain-assessment
ng g module ./modules/treatment/pain-assessment/pain-assessment --flat
ng g service ./modules/treatment/pain-assessment/pain-assessment --flat --skip-tests
ng g component ./modules/treatment/pain-assessment/pain-assessment --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   consult  ============"

mkdir src/app/modules/treatment/consult
ng g module ./modules/treatment/consult/consult --flat
ng g service ./modules/treatment/consult/consult --flat --skip-tests
ng g component ./modules/treatment/consult/consult --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   guide  ============"

mkdir src/app/modules/treatment/guide/guide
ng g module ./modules/treatment/guide/guide --flat
ng g component ./modules/treatment/guide/guide --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   Body-Map  ============"

mkdir src/app/modules/treatment/body-map
ng g module ./modules/treatment/body-map/body-map --flat
ng g component ./modules/treatment/body-map/body-map --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "############### WELCOME  ###############"

mkdir src/app/modules/welcome

echo "==========   Home  ============"

mkdir src/app/modules/welcome/home
ng g module ./modules/welcome/home/home --flat
ng g component ./modules/welcome/home/home --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   Guide  ============"

mkdir src/app/modules/welcome/guide
ng g module ./modules/welcome/guide/guide --flat
ng g component ./modules/welcome/guide/guide --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "############### Profile  ###############"

mkdir src/app/modules/profiles/

echo "==========   Gender  ============"

mkdir src/app/modules/profiles/gender/
ng g module ./modules/profiles/gender/gender --flat
ng g component ./modules/profiles/gender/gender --flat --skip-import -c OnPush --selector=knt --skip-tests

echo "==========   Login  ============"

mkdir src/app/modules/profiles/login/
ng g module ./modules/profiles/login/login --flat
ng g component ./modules/profiles/login/login --flat --skip-import -c OnPush --selector=knt --skip-tests
