# Auth Login Use Case

> ### Caso de sucesso

1. Sistema remove o prefixo "Bearer" do token de autorização
2. Sistema verifica a assinatura e expiração do token JWT usando o `JwtService`
3. Sistema busca o usuário no banco de dados a partir do email contido no payload do token
4. Sistema retorna as informações do usuário e o payload decodificado

> ### Exceção - Token inválido ou expirado

1. Sistema tenta verificar o token
2. Caso a verificação falhe, lança `UnauthorizedException` com a mensagem "Token inválido ou expirado"

> ### Exceção - Usuário não encontrado

1. Token é válido, mas o sistema não encontra o usuário no banco com o email informado
2. Sistema lança `UnauthorizedException` com a mensagem "Usuário não encontrado"
