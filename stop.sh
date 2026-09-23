#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

FUNNEL_NAME="$(basename "$DIR")"
echo "🛑 Stopping services for $FUNNEL_NAME..."

if [ -f "$DIR/backend.pid" ]; then
    BE_PID=$(cat "$DIR/backend.pid")
    if ps -p "$BE_PID" > /dev/null 2>&1; then
        echo "Stopping Backend PID $BE_PID..."
        kill "$BE_PID" 2>/dev/null || true
    fi
    rm -f "$DIR/backend.pid"
fi

if [ -f "$DIR/frontend.pid" ]; then
    FE_PID=$(cat "$DIR/frontend.pid")
    if ps -p "$FE_PID" > /dev/null 2>&1; then
        echo "Stopping Frontend PID $FE_PID..."
        kill "$FE_PID" 2>/dev/null || true
    fi
    rm -f "$DIR/frontend.pid"
fi

echo "✅ Safely stopped $FUNNEL_NAME services."
