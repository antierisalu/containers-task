#!/bin/bash

docker build -t gateway .

docker run -p 3000:3000 --env-file ./../.env gateway