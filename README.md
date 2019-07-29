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

docker exec -it 2199279585d1 \
    mongo -u wlf -p wlf --authenticationDatabase herois
    
    show dbs
    use herois
    show collections
    
    db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
    })
    
    for(let i=0; i<=10000; i++){
      db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
        })
    }
    
    db.herois.count()
    db.herois.findOne()
    db.herois.find().limit(1000).sort({nome: -1})
    db.herois.find({}, {poder:1, _id: 0})
    
    //create
         db.herois.insert({
            nome: `Clone-${i}`,
            poder: 'Velocidade',
            dataNascimento: '1998-01-01'
            })
            
    //read
    db.herois.find()
    
    //update
    db.herois.update({ _id: ObjectId('5d3bc0a5aeecfcf8f486dc22') },
            {nome: 'Mulher Maravilha'})
    db.herois.update({ _id: ObjectId('5d3bc168aeecfcf8f4870323') },
                                {$set: {nome: 'Lanterna Verde'} })
                                
    //delete
    db.herois.remove({nome: 'Lanterna Verde'})
    
# nodeMultipleDBs
