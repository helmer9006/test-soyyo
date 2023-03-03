# test-api-soyyo  
API development as test submission to access backend cargo with node    

## Steps

**Note**  
`Only rest api with https support can be deployed behind API/ML, make sure to enable https support in your rest api.
` .    

## PART I: Download & Build on local

## Method 1: From github
### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/helmer9006/test-soyyo.git
cd soyyo
npm install
npm start
```

Open your local browser and verify the test-api-soyyo is working by accessing:     
`http://localhost:4000/api/entities/getEntityById/1`   
`http://localhost:4000/api/entities/getAllEntities`   
`http://localhost:4000/api/user/getAllUsers`


### 2) create the docker image

cd soyyo
docker build -t test-soyyo:1 .

## 3) Create the api container

docker create -p4000:4000 --name api-soyyo test-soyyo:1

## 4) Execute TEST 

npm test
