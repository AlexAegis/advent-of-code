#!/bin/sh

find ./ -type f -regex ".*\.\(sh\|zsh\|bash\|fish\|dash\)" -exec chmod +x {} \;
