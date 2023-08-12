# API JDev Cursos
Api utilizada para criação e manipulação de categorias, cursos e usuários.
## Endpoints
### 🔹 GET /categories
endpoint responsável por retornar todas as categorias cadastradas no banco de dados.
#### Parametros
Nenhum.
### Respostas
##### _200 - ok!_
esse statusCode indica o retorno de todas as categorias.
```
[
    {
        "id": 1,
        "title": "javaScript",
        "slug": "javaScript",
        "createdAt": "2023-08-09T17:01:37.000Z",
        "updatedAt": "2023-08-09T17:01:37.000Z"
    },
    {
        "id": 2,
        "title": "PHP",
        "slug": "PHP",
        "createdAt": "2023-08-12T00:50:08.000Z",
        "updatedAt": "2023-08-12T00:50:08.000Z"
    }
]
```
##### 404 - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
