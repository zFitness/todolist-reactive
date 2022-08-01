set -e

pnpm build
cd dist
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:zFitness/todolist-reactive.git master:gh-pages

cd -