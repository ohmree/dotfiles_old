export LC_CTYPE=en_US.UTF-8
export LESSCHARSET=utf-8
export NODM_USER=omri
export NODM_X_OPTIONS="vt7 -nolisten tcp"
setxkbmap -option grp:switch,grp:alt_shift_toggle,grp_led:scroll us,il -option caps:escape
dunst &
mpd &
exec i3
#ck-launch-session dbus-launch --sh-syntax --exit-with-session 
exec xdrawrect DVI-0 top 100% 27 0 20 \#ff000000 effectline-top "$(lemonbuddy top -c "~/.config/lemonbuddy/config" --print-wmname)" &
