# Mercer Data Orchestrator Admin BACKEND

### Latest releases  

| Sprint  | End date  | Container name  | Container version  |
| ------------ | ------------ | ------------ | ------------ |
| 17  | Oct 5, 2021   | wealth-mdo-admin-be_oss20  |  1.0.109-227496ac |
| 18  | Oct 19, 2021  | wealth-mdo-admin-be_oss20  |  1.0.131-2bc8eff2 |
| 19  | Nov 2, 2021   | wealth-mdo-admin-be_oss20  |  1.0.144-9fa3ded0 |
| 20  | Nov 16, 2021  | wealth-mdo-admin-be_oss20  |  tbd              |
|   |   |   |   |



### How-to setup BE locally:  

```
1. Clone repository  

2. Install node modules: **npm install**  

3. Run migration script: **npm run migrate**  

4. Fill authorization database: **npm run migrate-auth-local**  

5. Clone *authorization api service* to enable role management:  

   **git clone git@bitbucket.org:oliverwymantechssg/ngpd-merceros-authorization-api.git#0f28bdf  

6. Install modules in *authorization api *repository: **npm install**  

7. Run authorization api service: **npm run start:dev**  

8. Run this backend: **npm start**  
```


### Known issues:  

1. Sometimes you need to open https://localhost:3000 in browser and agree to use unsafe connection   
