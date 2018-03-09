#!/bin/bash
find docs/ -name *.html | xargs sed -i '' '/\/blob\/master\/src\/\//d'
find docs/ -name *.html | xargs sed -i '' '/Defined in \/Users/d'
