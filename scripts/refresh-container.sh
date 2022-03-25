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


echo "removing current container"
docker rm -f jsight_editor_frontend
echo "building from image $EDITOR_FRONTEND_IMAGE"
docker run --name jsight_editor_frontend --pull always -d --restart unless-stopped -p "$EDITOR_FRONTEND_PORT":80 "$EDITOR_FRONTEND_IMAGE"
echo "cleaning out old images"
docker image prune -f