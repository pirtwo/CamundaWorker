#!/bin/bash
set -e

ENGINE_URL="http://localhost:8080/engine-rest"
USERNAME="demo"
PASSWORD="demo"

echo ">>> Waiting for Camunda REST API to be up..."
until curl -sf -u "$USERNAME:$PASSWORD" "${ENGINE_URL}/engine" > /dev/null; do
  sleep 2
done

echo ">>> Deploying BPMN / DMN / FORM files..."
for f in /models/*.{bpmn,dmn,form}; do
  [ -e "$f" ] || continue
  echo ">>> Deploying: $(basename "$f")"
  curl -sf -u "$USERNAME:$PASSWORD" -X POST "${ENGINE_URL}/deployment/create" \
    -F "deployment-name=$(basename "$f" .${f##*.})" \
    -F "enable-duplicate-filtering=true" \
    -F "deploy-changed-only=true" \
    -F "data=@$f" > /dev/null
done

echo ">>> Model deployment complete."