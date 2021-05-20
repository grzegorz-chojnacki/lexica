#!/bin/bash

ROOT=$(dirname $(realpath -s "$0"))

cd $ROOT/frontend \
&& npm install \
&& npm run build -- --prod \
&& cp -R $ROOT/frontend/dist/lexica $ROOT/backend/src/main/resources/public \
&& cd $ROOT/backend \
&& mvn clean install \
&& echo \
&& echo Type \'java -jar $ROOT/backend/target/*.jar\' to run server
