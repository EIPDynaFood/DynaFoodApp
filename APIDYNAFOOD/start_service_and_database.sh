#!/bin/bash

print_col() {
    tput bold
    tput setaf $1
    echo $2
    tput sgr0
}


print_col 2 "BUILDING SERVICE AND DATABASE... => "
docker-compose build && docker-compose up
exit
