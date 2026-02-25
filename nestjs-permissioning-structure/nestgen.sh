#!/usr/bin/env bash

RESOURCE=$1
FILE=$2

if [ -z "$RESOURCE" ]; then
  echo "Usage: $0 <resource-name>"
  exit 1
fi

if [ -d "src/$RESOURCE" ]; then
  echo "Resource '$RESOURCE' already exists."
  exit 1
fi

nest generate module $RESOURCE
nest generate service $RESOURCE
nest generate controller $RESOURCE
mkdir -p "src/$RESOURCE/interfaces"
mkdir -p "src/$RESOURCE/dto"
mkdir -p "src/$RESOURCE/use-cases"

to_pascal_case() {
    echo "$1" | sed -e 's/[^[:alnum:]]/ /g' | \
    awk '{for(i=1;i<=NF;i++) printf toupper(substr($i,1,1)) substr($i,2)} END {print ""}'
}

if [ -n "$FILE" ]; then
  touch "src/$RESOURCE/interfaces/${FILE}.interface.ts"
  touch "src/$RESOURCE/dto/${FILE}.dto.ts"
  PASCAL_CASE_FILE=$(to_pascal_case "$FILE")
  
  echo -e "import { Injectable } from '@nestjs/common';\n\n@Injectable()\nexport class ${PASCAL_CASE_FILE}Repository {}" >> "src/$RESOURCE/$FILE.repository.ts"

  rm "src/$RESOURCE/${FILE}.service.spec.ts"
  rm "src/$RESOURCE/${FILE}.controller.spec.ts"
fi