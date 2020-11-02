docker build ./REST_API -t rails:final

docker run --rm -d -p 3000:3000 rails:final