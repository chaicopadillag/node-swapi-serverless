# SWAPI HTTP API on AWS SERVERLESS

### Requisitos

- Node.js v20.x
- Serverless latest
- Postman para probar HTTP APIs

### Clone

```bash
clone git git@github.com:chaicopadillag/node-swapi-serverless.git
```

### Run local

Crear el archivo `.env` y copiar los environments ademas llenar los valores desde `.env.example` manualmente o usando el siguiente comando:

```bash
cp .env.example .env
```

### Start app offline

```bash
npm run dev
```

### Run test y coverage

```bash
npm run test && npm run test:cov
```

## Http Status Code

Los codigos de respuesta de `HTTP` usados estan basado en esta documentación [https://www.restapitutorial.com/httpstatuscodes.html](https://www.restapitutorial.com/httpstatuscodes.html)

### GET People

Para obtener los datos swapi people usar el recurso `GET` `/swipe/people` usando Postman o algun cliente HTTP.

```bash
# Para stage local, vericar el puerto aquí.

endpoint: curl --location 'http://localhost:4000/swipe/people'

response: [{
        "nombre": "Luke Skywalker",
        "altura": "172",
        "masa": "77",
        "color_de_cabello": "blond",
        "color_de_piel": "fair",
        "color_de_ojos": "blue",
        "año_de_nacimiento": "19BBY",
        "género": "male",
        "planeta_natal": "https://swapi.py4e.com/api/planets/1/",
        "películas": [
            "https://swapi.py4e.com/api/films/1/"
        ],
        "especies": [
            "https://swapi.py4e.com/api/species/1/"
        ],
        "vehículos": [
            "https://swapi.py4e.com/api/vehicles/14/"
        ],
        "naves_estelares": [
            "https://swapi.py4e.com/api/starships/12/"
        ],
        "creado": "2014-12-09T13:50:51.644000Z",
        "editado": "2014-12-20T21:17:56.891000Z",
        "url": "https://swapi.py4e.com/api/people/1/"
    },]

```

### GET Planets

Para obtener los datos swapi planets usar el recurso `GET` `/swipe/planets` usando Postman o algun cliente HTTP.

```bash
# Para stage local, vericar el puerto aquí.

endpoint: curl --location 'http://localhost:4000/swipe/planets'

response: [{
        "nombre": "Tatooine",
        "periodo_de_rotación": "23",
        "periodo_orbital": "304",
        "diámetro": "10465",
        "clima": "arid",
        "gravedad": "1 standard",
        "terreno": "desert",
        "agua_superficial": "1",
        "población": "200000",
        "residentes": [
            "https://swapi.py4e.com/api/people/1/"
        ]
        "películas": [
            "https://swapi.py4e.com/api/films/1/"
        ],
        "creado": "2014-12-09T13:50:49.641000Z",
        "editado": "2014-12-20T20:58:18.411000Z",
        "url": "https://swapi.py4e.com/api/planets/1/"
    }]

```

### POST Crear User

Para crear un usuario nuevo usar el recurso `POST` `/users` usando Postman o algun cliente HTTP.

```bash
# Para stage local, vericar el puerto aquí.

endpoint: curl --location --request POST 'http://localhost:4000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userName":"code",
    "fullName":"Code Codero",
    "email":"code@gmail.com",
    "age":20,
    "password":"aaP6JLv6_4M5qzt"
}'

response: {
    "id":"815bc265-2d26-4954-b721-a537d049bc63",
    "userName":"code",
    "fullName":"Code Codero",
    "email":"code@gmail.com",
    "age":20,
}

```

### GET List Users

Para listar los usuarios usar el recurso `GET` `/users` usando Postman o algun cliente HTTP.

```bash
# Para stage local, vericar el puerto aquí.

endpoint: curl --location 'http://localhost:4000/users'

response: {
    "id":"815bc265-2d26-4954-b721-a537d049bc63",
    "userName":"code",
    "fullName":"Code Codero",
    "email":"code@gmail.com",
    "age":20,
}

```

### Deployment

```bash
npm run deploy
```
