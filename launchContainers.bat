cd FrontEnd
ember build
cd ..

docker build ./REST_API -t rails:final
docker build ./FrontEnd -t ember:final

docker run --rm -d -p 3000:3000 rails:final
docker run -dit --name apche-ember -p 8080:80 ember:final