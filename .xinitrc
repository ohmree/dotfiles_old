export LC_CTYPE=en_US.UTF-8
export LESSCHARSET=utf-8
setxkbmap -option grp:switch,grp:alt_shift_toggle,grp_led:scroll us,il -option caps:escape
dunst &
mpd &
~/.fehbg &
[[ -f ~/.Xresources ]] && xrdb -merge -I $HOME ~/.Xresources
exec i3
#ck-launch-session dbus-launch --sh-syntax --exit-with-session 
