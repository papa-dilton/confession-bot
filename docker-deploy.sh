#!/bin/bash

npm run start-db &

npm run start &

wait -n

exit $?