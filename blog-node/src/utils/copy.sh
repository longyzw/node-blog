#!/bin/sh
cd D:\CodeSave\project\node-blog\blog-node
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log