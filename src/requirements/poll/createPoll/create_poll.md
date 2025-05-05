# Create Poll Use Case

> ### Caso de sucesso

1. Sistema extrai o email e ID do Google do token JWT do usuário autenticado
2. Sistema valida se o usuário existe no banco de dados
3. Sistema gera um ID único para a enquete usando `ulid`
4. Sistema cria a enquete no banco de dados com as informações fornecidas
5. Sistema cria e associa as opções à enquete, retornando seus IDs

> ### Exceção - Usuário não encontrado

1. Sistema não encontra o usuário com o email fornecido no token
2. Lança `NotFoundException` com a mensagem "Usuário não encontrado"

> ### Exceção - Opções inválidas

1. Caso as opções da enquete não sejam válidas (vazias ou mal formadas)
2. Lança um erro (não especificado no código, mas pode ser um `BadRequestException`)
