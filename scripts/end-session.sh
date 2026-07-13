#!/bin/zsh
HANDOFF="docs/SESSION-HANDOFF.md"
DATE=$(date "+%-d. %B %Y")
TIME=$(date "+%H:%M")
DESC="${1:-Ingen beskrivelse}"
RECENT=$(git log --oneline --since="24 hours ago" 2>/dev/null | head -10)
cat >> "$HANDOFF" << ENTRY

---
## Session $DATE kl. $TIME — $DESC

**Commits i dag:**
$(git log --oneline --since="24 hours ago" 2>/dev/null | head -10 | sed 's/^/- /')

**Filer ændret:**
$(git diff --name-only HEAD~3 HEAD 2>/dev/null | grep "^src/" | head -15 | sed 's/^/- /')
ENTRY
git add docs/
git commit -m "Session-handoff: $DESC ($DATE)"
git push origin main
echo "✅ Session gemt og pushet til GitHub"
