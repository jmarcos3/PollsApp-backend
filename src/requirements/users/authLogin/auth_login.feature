Feature: Auth Login
Como um usuário autenticado
Quero validar meu token JWT
Para que o sistema possa me identificar e autorizar ações

Scenario: Token válido
    Given: Dado que o usuário envia um token JWT válido
    When: Quando o sistema verificar a assinatura e a expiração do token
    Then: Então o sistema deve retornar as informações do usuário associado ao token

Scenario: Token inválido ou expirado
    Given: Dado que o usuário envia um token JWT inválido ou expirado
    When: Quando o sistema tentar verificar a assinatura do token
    Then: Então o sistema deve retornar um erro de autenticação

Scenario: Token válido, mas usuário não encontrado
    Given: Dado que o token JWT é válido
    And: E o email no token não pertence a nenhum usuário no banco de dados
    When: Quando o sistema tentar buscar o usuário
    Then: Então o sistema deve retornar um erro de autenticação
