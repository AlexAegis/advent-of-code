#!/bin/sh

find ./ -type f -regex ".*\.\(sh\|zsh\|bash\|fish\|dash\|py\)" -exec chmod +x {} \;
