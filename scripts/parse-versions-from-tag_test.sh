#!/bin/bash
set -e

full_version=$(echo "release-3.0" | cut -d "-" -f2)
major_version=$(echo "$full_version" | cut -d "." -f1)

echo "$full_version"
echo "$major_version"