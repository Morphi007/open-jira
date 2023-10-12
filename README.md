# Next.js OpenJira App

para correr local mente se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detache**

- MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.templante** a **\_.env.**

## Llenar la base de datos con informacion de pruebas

LLamara
`http://localhost:3000/api/seed`


![open jira gif](https://github.com/Morphi007/open-jira/assets/78938079/03223e68-07c4-4361-96d4-50637923ebe8)
