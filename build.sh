rm build/*
npm run gulp uglify
cp -n src/* build/.
zip ce.zip build/*
