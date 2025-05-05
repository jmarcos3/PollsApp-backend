Feature: Register on Platform
Como um novo usuário
Quero poder me registrar na plataforma
Para que eu possa acessar as funcionalidades protegidas

Scenario: Dados válidos
    Given: Dado que o usuário inseriu informações válidas (nome, email, senha, etc)
    When: Quando o usuário solicitar o cadastro pela plataforma
    Then: Então o sistema deve cadastrar o usuário com sucesso
    And: E retornar uma mensagem indicando sucesso na criação do usuário

Scenario: Email já cadastrado
    Given: Dado que o usuário inseriu um email que já está em uso
    When: Quando o usuário tentar se cadastrar
    Then: Então o sistema deve retornar uma mensagem de erro de conflito
