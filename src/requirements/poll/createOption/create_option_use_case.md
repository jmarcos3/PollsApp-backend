# Create Option Use Case

> ### Caso de sucesso

1. Sistema extrai o email e ID do Google do token JWT do usuário autenticado
2. Sistema valida se o usuário existe no banco de dados
3. Sistema cria a nova opção e a associa à enquete especificada
4. Sistema retorna a confirmação da criação da opção

> ### Exceção - Usuário não encontrado

1. Sistema não encontra o usuário com o email fornecido no token
2. Lança `NotFoundException` com a mensagem "Usuário não encontrado"

> ### Exceção - Opção inválida

1. Caso os dados da opção não sejam válidos (exemplo: opção vazia ou mal formada)
2. Lança um erro de validação, como `BadRequestException`
