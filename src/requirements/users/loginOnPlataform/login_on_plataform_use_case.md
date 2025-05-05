# Login on Platform Use Case

> ### Caso de sucesso

1. Sistema verifica se o email e a senha correspondem a um usuário existente no banco de dados
2. Caso exista, sistema cria um payload com os dados do usuário (id, email e role)
3. Sistema assina e gera um token JWT com esse payload
4. Sistema retorna o token para o usuário

> ### Exceção - Email ou senha inválidos

1. Sistema não encontra usuário correspondente com as credenciais fornecidas
2. Sistema retorna uma mensagem de erro indicando falha de autenticação
