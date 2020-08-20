git diff --name-only --cached > stagedFiles.txt
sed -i ':a;N;$!ba;s/\n/ /g' stagedFiles.txt
npx prettier --write .
npx eslint . --fix
git add $(cat stagedFiles.txt)
rm -rf stagedFiles.txt
