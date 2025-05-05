Feature: Login on Platform
Como um usuário registrado
Quero poder fazer login na plataforma com meu email e senha
Para que eu possa acessar funcionalidades protegidas com autenticação

Scenario: Credenciais válidas
    Given: Dado que o usuário inseriu um email e senha corretos
    When: Quando o usuário solicitar o login
    Then: Então o sistema deve gerar e retornar um token JWT válido

Scenario: Credenciais inválidas
    Given: Dado que o usuário inseriu um email ou senha incorretos
    When: Quando o usuário solicitar o login
    Then: Então o sistema deve retornar uma mensagem de erro indicando falha na autenticação
