#!/bin/bash
# Daglig auto-backup til GitHub
# Kører via launchd hver aften kl. 22:00

PROJECT_DIR="/Users/louisebencard/Documents/my-baby-team"
LOG_FILE="$PROJECT_DIR/scripts/daily-backup.log"
DATE=$(date "+%Y-%m-%d %H:%M")

cd "$PROJECT_DIR" || exit 1

# Tjek om der er ændringer
if git diff --quiet && git diff --staged --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "[$DATE] Ingen ændringer — intet at gemme." >> "$LOG_FILE"
  exit 0
fi

# Byg og sync (sikrer at iOS-assets er opdaterede)
npm run build >> "$LOG_FILE" 2>&1
npx cap sync ios >> "$LOG_FILE" 2>&1

# Commit alle ændringer
git add src/ ios/App/App/public/ ios/App/App.xcodeproj/project.pbxproj public/ docs/ .gitignore 2>/dev/null

# Kun commit hvis der er noget staged
if git diff --staged --quiet; then
  echo "[$DATE] Bygget OK, men ingen committable ændringer." >> "$LOG_FILE"
  exit 0
fi

git commit -m "Auto-backup $DATE" >> "$LOG_FILE" 2>&1
git push origin main >> "$LOG_FILE" 2>&1

echo "[$DATE] ✓ Pushet til GitHub." >> "$LOG_FILE"
