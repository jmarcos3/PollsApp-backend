# Get All Polls Use Case

> ### Caso de sucesso

1. Sistema recebe os parâmetros de paginação (`page` e `limit`)
2. Sistema busca todas as enquetes do banco de dados com suas respectivas opções
3. Sistema retorna a lista paginada de enquetes

> ### Exceção - Nenhuma enquete encontrada

1. Caso não existam enquetes cadastradas, o sistema retorna uma lista vazia
2. (Opcional) Pode incluir metadados como `total`, `page`, e `limit` para controle da paginação
