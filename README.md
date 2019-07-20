#postgres
sudo docker run \
    --name postgres5 \
    -e POSTGRES_USER=wlf \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

#adminer
docker run \
    --name adminer1 \
    -p 8080:8080 \
    --link postgres5:postgres5 \
    -d \
    adminer
    
#mongodb    
docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=admin \
    -d \
    mongo:4

#mongoclient    
docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient  
    
#result  
docker ps 
docker exec -it postgres /bin/bash

docker exec -it mongodb \
    mongo --host localhost -u admin -p admin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'wlf',  pwd: 'wlf', roles: [{role: 'readWrite', db: 'herois'}]})"
# nodeMultipleDBs
