#!/bin/bash
set -e

while getopts :i:p: flag
do
    case "${flag}" in
        i) EDITOR_FRONTEND_IMAGE=${OPTARG};;
        p) EDITOR_FRONTEND_PORT=${OPTARG};;
        *) # Invalid option
          echo "Error: Invalid option"
          exit;;
    esac
done

if [[ -z "${EDITOR_FRONTEND_IMAGE}" ]]; then
    echo "Error: Image should be provided either with EDITOR_FRONTEND_IMAGE env or with -i flag"
    exit
fi

if [[ -z "${EDITOR_FRONTEND_PORT}" ]]; then
    echo "Error: Port should be provided either with EDITOR_FRONTEND_PORT env or with -p flag"
    exit
fi

echo "provided image is: $EDITOR_FRONTEND_IMAGE"
echo "provided port is: $EDITOR_FRONTEND_PORT"
