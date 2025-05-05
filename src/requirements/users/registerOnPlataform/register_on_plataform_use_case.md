# Register on Platform Use Case

> ### Caso de sucesso

1. Sistema verifica se o email já está cadastrado
2. Caso não esteja, sistema cria o novo usuário na base de dados
3. Sistema retorna uma mensagem de sucesso indicando que o usuário foi criado

> ### Exceção - Email já cadastrado

1. Sistema retorna uma exceção (ConflictException)
2. Mensagem de erro retornada: "Usuário já está criado no sistema" (USER_ERRORS.alreadyCreated)
