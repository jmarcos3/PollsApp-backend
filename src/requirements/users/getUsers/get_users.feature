Feature: Get Users
Como um administrador
Quero poder visualizar a lista de usuários cadastrados
Para que eu possa gerenciar e acompanhar os usuários da plataforma

Scenario: Requisição bem-sucedida
    Given: Dado que o usuário autenticado tem permissão
    When: Quando o usuário solicitar a listagem de usuários
    Then: Então o sistema deve retornar uma lista com todos os usuários cadastrados
