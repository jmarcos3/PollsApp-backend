Feature: Login with Google
Como um usuário com conta Google
Quero poder me autenticar na plataforma com minha conta Google
Para que eu possa acessar o sistema sem criar uma conta manualmente

Scenario: Usuário já existe na base de dados
    Given: Dado que o token do Google é válido e contém informações do usuário
    And: E o email do usuário já está cadastrado no sistema
    When: Quando o usuário fizer login com o Google
    Then: Então o sistema deve atualizar o usuário com as novas informações do Google
    And: E retornar uma mensagem indicando sucesso na atualização

Scenario: Usuário não existe na base de dados
    Given: Dado que o token do Google é válido e contém informações do usuário
    And: E o email do usuário não está cadastrado no sistema
    When: Quando o usuário fizer login com o Google
    Then: Então o sistema deve criar um novo usuário com os dados do Google
    And: E retornar uma mensagem indicando sucesso na criação
