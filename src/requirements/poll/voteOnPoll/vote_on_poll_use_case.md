# Vote on Poll Use Case

> ### Caso de sucesso

1. Sistema extrai o email do usuário autenticado via token JWT do Google
2. Sistema busca o usuário no banco de dados pelo email
3. Sistema verifica se a opção informada pertence a uma enquete existente
4. Sistema verifica se o usuário já votou naquela enquete
5. Caso não tenha votado, o sistema registra o voto associando o usuário, a opção e a enquete

> ### Exceção - Usuário não encontrado

1. Sistema não encontra o usuário com o email fornecido no token
2. Lança `NotFoundException` com a mensagem "Usuário não encontrado"

> ### Exceção - Opção inválida

1. Sistema não encontra nenhuma enquete associada ao `optionId` informado
2. Lança `NotFoundException` com a mensagem "Opção não encontrada"

> ### Exceção - Voto duplicado

1. Sistema verifica que o usuário já votou naquela enquete
2. Lança `ConflictException` com a mensagem "Usuário já votou nessa opção"
