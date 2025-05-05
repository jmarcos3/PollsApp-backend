# Login with Google Use Case

> ### Caso de sucesso - Usuário já cadastrado

1. Sistema extrai as informações do usuário a partir do token JWT do Google
2. Sistema verifica se o usuário já existe no banco de dados
3. Caso o email já exista, sistema atualiza os dados do usuário com base nas informações do Google
4. Sistema retorna uma mensagem de sucesso indicando que o usuário foi atualizado (`USER_SUCESSFULL.sucessfullUpdated`)

> ### Caso de sucesso - Novo usuário

1. Sistema extrai as informações do usuário a partir do token JWT do Google
2. Sistema verifica que o email ainda não está cadastrado
3. Sistema cria um novo usuário no banco com as informações fornecidas pelo Google
4. Sistema retorna uma mensagem de sucesso indicando que o usuário foi criado (`USER_SUCESSFULL.sucessfullCreated`)
