#!/bin/bash

export QUART_DEBUG=true

cd "$(dirname $(readlink -f $0))/.."

(cd frontend && npm run watch) &
python3 -m partners_list &

wait
