# luizalabs-backend

## Descrição

Esse projeto é o backend do desafio técnico da luizalabs.
Foi desenvolvido em typescript utilizando a stack de:

- Hapi Server (HTTP)
- Joi (Validações HTTP)
- Prisma (MongoDB)
- Jest / Supertest (Testes)

## Pré-requisitos

Para iniciar a aplicação, é necessário a instalação do Docker

## Inicializando a Aplicação

Para iniciar a aplicação, utilize o seguinte comando:

```docker compose -f .\compose.dev.yaml up -d --build```

Este comando irá construir todos os contêineres definidos no arquivo compose.dev.yaml e iniciá-los em segundo plano.

#### Seed

Devido ao curto prazo, não consegui fazer um seed para o banco a tempo, então aqui está um exemplo de post para popular o banco.

```
curl --location 'http://localhost:8000/orders' \
--header 'Content-Type: application/json' \
--data '{
    "cart": [
        {
            "name": "Ventilador turbo 5 velocidades",
            "price": 200,
            "amount": 5
        },
        {
            "name": "Aspirador de pó vertical e portátil",
            "price": 100,
            "amount": 3
        }
    ],
    "customer": "Alan Ferreira",
    "shipping": 30,
    "status": "PENDENTE",
    "date": "2024-10-14T17:47:05.506Z"

}'
```

## Executando Testes

A aplicação possui três scripts diferentes que podem ser executados para rodas os testes.

### Testes Unitários

Para rodar os testes unitários, utilize o comando:

```npm run test-unit```

### Testes de Integração

Para rodar os testes de integração, utilize o comando:

```npm run test-int```

Lembrando que para rodar os testes de integração, é necessária a conexão com o banco de dados.

### Todos os testes

Para rodar todos os testes (unitários e de integração), utilize o comando:

```npm run test```