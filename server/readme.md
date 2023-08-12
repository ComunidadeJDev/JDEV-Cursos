# API JDev Cursos
Api utilizada para criação e manipulação de categorias, cursos e usuários.
## Endpoints
### 🔹 GET /categories
endpoint responsável por retornar todas as categorias cadastradas no banco de dados.
#### Parametros
Nenhum.
### Respostas
  * **_200_** - ok.
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
* **_401_** - Falha na autenticação.
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
* **_200_** - ok.
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
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - Categoria não encontrada.
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
* **_201_** - Created.
esse statusCode indica a criação da categoria.
```
{
    "msg": "registered category"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_422_** - Unprocessable Entity
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
* **_200_** - ok.
esse statusCode indica que a categoria foi atualizada.
```
{
    "msg": "category updated"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - Categoria não encontrada.
O id indicado não pertence a uma categoria.
```
{
    "error": "categoty not found"
}
```
---
### 🔹 DELETE /categories/:id
endpoint responsável por deletar categorias cadastradas no banco de dados.
#### Parametros
id: id que pertence a categoria.
### Respostas
* **_200_** - ok.
esse statusCode indica que a categoria foi deletada.
```
{
    "msg": "game deleted"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - categoria não encontrada.
```
{
    "error": "category is not found"
}
```
---
### 🔹 GET /courses
endpoint responsável por retornar todas os cursos cadastrados no banco de dados.
#### Parametros
Nenhum.
### Respostas
* **_200_** - ok.
esse statusCode indica o retorno de todos os cursos.
```
[
    {
        "id": 2,
        "title": "javaScript para iniciantes",
        "subTitle": "O melhor caminho para aprender javaScript",
        "description": "varias aulas completas com uma didatica incrível para que vc possa aprender de verdade",
        "image": "http://drive.google.com/jdev/javascript",
        "creator": "Gabriel Rodrigues",
        "assessments": 15,
        "releaseYear": "22/03/2020",
        "amountHours": "15h",
        "downloadableResouces": 20,
        "amountExercises": 45,
        "certificate": true,
        "lifetimeAccess": false,
        "price": 200,
        "language": "pt-br",
        "categoryName": "javaScript",
        "createdAt": "2023-08-03T08:06:59.000Z",
        "updatedAt": "2023-08-03T21:24:51.000Z",
        "categoryId": 1
    }
]
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
---
### 🔹 GET /courses/:id
endpoint responsável por retornar um curso específico cadastrado no banco de dados.
#### Parametros
id: id referente ao curso desejado.
### Respostas
* **_200_** - ok.
esse statusCode indica o retorno do curso referente ao id passado.
```
[
    {
        "id": 2,
        "title": "javaScript para iniciantes",
        "subTitle": "O melhor caminho para aprender javaScript",
        "description": "varias aulas completas com uma didatica incrível para que vc possa aprender de verdade",
        "image": "http://drive.google.com/jdev/javascript",
        "creator": "Gabriel Rodrigues",
        "assessments": 15,
        "releaseYear": "22/03/2020",
        "amountHours": "15h",
        "downloadableResouces": 20,
        "amountExercises": 45,
        "certificate": true,
        "lifetimeAccess": false,
        "price": 200,
        "language": "pt-br",
        "categoryName": "javaScript",
        "createdAt": "2023-08-03T08:06:59.000Z",
        "updatedAt": "2023-08-03T21:24:51.000Z",
        "categoryId": 1
    }
]
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_400_** - Bad Request.
Motivos: id inválido, não numerico, não existente ou nulo.
```
{
    "error": "id invalid."
}
```
* **_404_** - Not found.
Motivos: nenhum curso encontrado com o id indicado.
```
{
    "error": "course not found."
}
```
---
### 🔹 GET /courses/search/:category
endpoint responsável por retornar todos os cursos que pertencem a uma categoria cadastrada no banco de dados.
#### Parametros
cateogory: id da categoria desejada ( não o nome ).
### Respostas
  * **_200_** - ok.
esse statusCode indica o retorno de todos os cursos referentes a uma categoria.

* **_400_** - bad request.
Motivos: id inválido, não numerico, não existente ou nulo.
```
{
    "error": "invalid category id"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_404_** - Not found.
Motivos: nenhuma categoria encontrada com o id indicado.
```
{
    "error": "category not found."
}
```
---
### 🔹 POST /courses
endpoint responsável por criar cursos no banco de dados.
#### Parametros
title, subtitle, description, image, creator, assessments, releaseYear, amountHours, downloadableResouces, amountExercises, certificate, lifetimeAccess,
price, language, categoryId.
```
{
    "title": "PHP na veia",
    "subTitle": "Aprenda de uma vez por todas PHP",
    "description": "varias aulas completas com uma didatica incrível para que vc possa aprender de verdade",
    "image": "http://drive.google.com/jdev/PHP",
    "creator": "Gabriel Rodrigues",
    "assessments": 15.000,
    "releaseYear": "22/03/2020",
    "amountHours": "15h",
    "downloadableResouces": 20,
    "amountExercises": 45,
    "certificate": true,
    "lifetimeAccess": false,
    "price": 200.00,
    "language": "pt-br",
    "categoryId": 1
}
```
### Respostas
  * **_200_** - ok.
esse statusCode indica a criação do curso.
```
{
     "msg": "course created!"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_400_** - Missing required fields.
Motivos: Campos em branco ou nulos.
```
{
    "error": "Missing required fields: certificate, lifetimeAccess, amountHours"
}
```
* **_404_** - Not found.
Motivos: nenhuma categoria encontrada com o id indicado.
```
{
    "error": "category not found."
}
```
---
### 🔹 PUT /courses
endpoint responsável por atualizar cursos no banco de dados.
#### Parametros
title, subtitle, description, image, creator, assessments, releaseYear, amountHours, downloadableResouces, amountExercises, certificate, lifetimeAccess,
price, language, categoryId.

` é necessário enviar todos os campos na requisição, mesmo os que não vão ser atualizados `

```
{
    "title": "PHP na veia",
    "subTitle": "Aprenda de uma vez por todas PHP",
    "description": "varias aulas completas com uma didatica incrível para que vc possa aprender de verdade",
    "image": "http://drive.google.com/jdev/PHP",
    "creator": "Gabriel Rodrigues",
    "assessments": 15.000,
    "releaseYear": "22/03/2020",
    "amountHours": "15h",
    "downloadableResouces": 20,
    "amountExercises": 45,
    "certificate": true,
    "lifetimeAccess": false,
    "price": 200.00,
    "language": "pt-br",
    "categoryId": 1
}
```
### Respostas
  * **_200_** - ok.
esse statusCode indica a atualização do curso.
```
{
     "msg": "course updated!"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_400_** - bad request.
Motivos: id inválido, não numerico, não existente ou nulo.
```
{
    "error": "invalid id"
}
```
* **_404_** - Course is not found.
Motivos: nenhum curso encontrado com o id indicado.
```
{
    "error": "course is not found."
}
```
* **_404_** - Categoty is not found.
Motivos: nenhuma categoria encontrado com o id indicado.
```
{
    "error": "category is not found."
}
```
---
### 🔹 DELETE /course/:id
endpoint responsável por deletar no banco de dados.
#### Parametros
id: id referente ao curso desejado.
### Respostas
  * **_200_** - ok.
esse statusCode indica a exclusão do curso.
```
{
    "msg": "course deleted"
}
```
* **_401_** - Falha na autenticação.
Motivos: Token inválido, Token expirado.
```
{
    "error": "invalid Token"
}
```
* **_400_** - bad request.
Motivos: id inválido, não numerico, não existente ou nulo.
```
{
    "error": "invalid id"
}
```
