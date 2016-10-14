#!/usr/bin/env sh

# Terminate already running bar instances
killall -q lemonbuddy

# Launch bar(s)
lemonbuddy top -r &
lemonbuddy bottom -r &
echo "Bar(s) launched..."
