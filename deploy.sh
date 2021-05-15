#!/bin/bash

ROOT=$(pwd)

cd $ROOT/frontend \
&& npm run build -- --prod \
&& cp -R $ROOT/frontend/dist/lexica $ROOT/backend/src/main/resources/public \
&& cd $ROOT/backend \
&& mvn clean install \
&& echo done \
&& echo type \'java -jar $ROOT/backend/target/*.jar\' to run
