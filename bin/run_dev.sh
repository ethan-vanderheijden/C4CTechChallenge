#!/bin/bash

export QUART_DEBUG=true

cd ..

(cd frontend && npm run watch) &
python3 -m partners_list &

wait
