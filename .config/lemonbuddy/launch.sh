#!/usr/bin/env sh

# Terminate already running bar instances
lemonbuddy_terminate noconfirm

# Launch bar(s)
lemonbuddy_wrapper top &
#lemonbuddy_wrapper bottom &
echo "Bar(s) launched..."
