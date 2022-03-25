#!/bin/bash
set -e

tag="relASas-v12.134"

if ! [[ "$tag" =~ ^[A-za-z]+-[0-9]+\.[0-9]+$ ]]
then
  echo "unsupported tag: $tag"
  exit 1
fi

echo "successful tag: $tag"