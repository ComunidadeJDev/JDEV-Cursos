# API JDev Cursos
Api utilizada para criação e manipulação de categorias, cursos e usuários.
## Endpoints
### 🔹 GET /categories
endpoint responsável por retornar todas as categorias cadastradas no banco de dados.
#### Parametros
Nenhum.
### Respostas
##### _200_ - ok.
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
##### _401_ - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
---
### 🔹 GET /categories/:id
endpoint responsável por retornar categoria específica do banco de dados.
#### Parametros
params: id da categoria.
### Respostas
##### _200_ - ok.
esse statusCode indica o retorno da categoria indicada pelo id.
```
{
    "id": 1,
    "title": "javaScript",
    "slug": "javaScript",
    "createdAt": "2023-08-03T07:50:55.000Z",
    "updatedAt": "2023-08-03T07:50:55.000Z"
}
```
##### _401_ - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
##### _404_ - Categoria não encontrada.
O id indicado não pertence a uma categoria.
```
{
    "error": "categoty not found"
}
```
---
### 🔹 POST /categories
endpoint responsável por criar categorias no banco de dados.
#### Parametros
title: titulo da categoria.
```
{
    "title": "PHP"
}
```
### Respostas
##### _201_ - Created.
esse statusCode indica a criação da categoria.
```
{
    "msg": "registered category"
}
```
##### _401_ - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
##### _422_ - Unprocessable Entity
motivos: campo vazio ou inexistente.
```
{
    "error": "invalid name"
}
```
---
### 🔹 PUT /categories
endpoint responsável por atualizar as categorias cadastradas no banco de dados.
#### Parametros
id: id da categoria.

title: novo título da categoria.
```
{
    "id": 3,
    "title": "java with spring"
}
```
### Respostas
##### _200_ - ok.
esse statusCode indica que a categoria foi atualizada.
```
{
    "msg": "category updated"
}
```
##### _401_ - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
##### _404_ - Categoria não encontrada.
O id indicado não pertence a uma categoria.
```
{
    "error": "categoty not found"
}
```
### 🔹 DELETE /categories/:id
endpoint responsável por deletar categorias cadastradas no banco de dados.
#### Parametros
id: id que pertence a categoria.
### Respostas
##### _200_ - ok.
esse statusCode indica que a categoria foi deletada.
```
{
    "msg": "game deleted"
}
```
##### _401_ - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
##### _404_ - categoria não encontrada.
```
{
    "error": "category is not found"
}
```
---
