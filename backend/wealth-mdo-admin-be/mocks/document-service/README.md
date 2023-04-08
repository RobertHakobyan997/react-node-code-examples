# DOCUMENT-SERVICE-MOCK
## STEP 1: Build documents service image
1. Add id_rsa to this directory (make sure the repository is available for this key)
2. Run command in this directory: ``` docker build --tag document-service:0.1 . ```

## STEP 2: Running containers

1. Аfter successful completion of the previous command: ``` docker-compose up ```
2. Document service is available on port: 4009
