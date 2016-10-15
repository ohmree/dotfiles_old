#!/bin/sh
# Simple script that prints currently playing song's title, artist or album (from mpd)
# made by me (omrisim210), probably very WIP-ish

# I have no idea how to get/generate a progressbar for mpd
# mpd_bar=

mpd_title(){
    printf "$(mpc --format %title% | head -n 1)\n"
}

mpd_artist(){
    printf "$(mpc --format %artist% | head -n 1)\n"
}

mpd_album(){
    printf "$(mpc --format %album% | head -n 1)\n"
}

usage(){
    printf "Usage:\n
            mpd.sh title  #returns current song title\n
	    mpd.sh artist #returns current song's artist\n
	    mpd.sh album  #returns current album\n"
}
while [ "$1" != "" ]; do
    case $1 in
        title )		        mpd_title
				exit
                                ;;
        artist)			mpd_artist
				exit
                                ;;
        album )		        mpd_album
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
done
