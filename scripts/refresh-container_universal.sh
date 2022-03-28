#!/bin/bash
set -e

while getopts :i:n:p: flag
do
    case "${flag}" in
        i) image=${OPTARG};;
        n) name=${OPTARG};;
        p) port=${OPTARG};;
        *) # Invalid option
          echo "Error: Invalid option"
          exit;;
    esac
done

if [[ -z "${image}" ]]; then
    echo "Error: Image should be provided with -i flag"
    exit
fi

if [[ -z "${port}" ]]; then
    echo "Error: Port should be provided with -p flag"
    exit
fi

if [[ -z "${name}" ]]; then
    echo "Error: Name should be provided with -n flag"
    exit
fi

echo "removing current container"
docker rm -f "$name"
echo "building from image $image"
docker run --name "$name" --pull always -d --restart unless-stopped -p "$port":80 "$image"
echo "cleaning out old images"
docker image prune -f