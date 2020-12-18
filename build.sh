#docker-compose up

docker build ./REST_API -t rails:latest

docker run -p3000:3000 -v /c/users/distsys/desktop/rest:/app rails:latest