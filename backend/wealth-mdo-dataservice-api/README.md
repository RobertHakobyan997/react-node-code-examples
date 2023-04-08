# Data Service API


### Latest releases  

| Sprint  | End date  | Container name  | Container version  |
| ------------ | ------------ | ------------ | ------------ |
| 17  | Oct 5, 2021   | wealth-mdo-dataservice-api_oss20  |  1.0.249-c2488809 |
| 18  | Oct 19, 2021  | wealth-mdo-dataservice-api_oss20  |  1.0.278-637a7c3d |
| 19  | Nov 2, 2021   | wealth-mdo-dataservice-api_oss20  |  1.0.330-914ea900 |
| 20  | Nov 16, 2021  | wealth-mdo-dataservice-api_oss20  |  tbd              |
|   |   |   |   |



### How-to setup BE locally:  

```
1. Clone repository  

2. Install node modules: **npm install**  

3. Run migration script: **npm run migrate**  

4. Run this backend: **npm start**  
```

### Import/export

DB contains two types of data: static collections and transactional collection.
If you skip migrations, please run
```
/data-access/import
```
and
```
/files-metadata/import
```
with **importkey** in headers to update static data.

## Issues 
For **npm run update:common-be** errors
Edit enviroment varisbles, add two directories to PATH:

C:\Program Files\Git\usr\bin
C:\Program Files\Git\mingw64\libexec\git-core

or
From elevated powershell you could set it using:

$env:Path += ";c:\Program Files\Git\usr\bin;C:\Program Files\Git\mingw64\libexec\git-core"
Set-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH -Value $env:Path
Reboot your OS

For **npm run lint** errors
Make sure that you have installed ESLint main is v2.2.2

For **npm run ci** errors
Make sure that **npm run lint** is not the problem


