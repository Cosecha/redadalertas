#!/usr/bin/env bash

echo SERVICE_API_URL=$SERVICE_API_URL > .env
printf ".env created with contents:\n"
cat .env
