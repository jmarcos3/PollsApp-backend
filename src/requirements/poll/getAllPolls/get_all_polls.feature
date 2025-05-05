Feature: Get All Polls
Como um usuário autenticado
Quero visualizar todas as enquetes cadastradas
Para que eu possa votar ou acompanhar os resultados

Scenario: Recuperar enquetes com sucesso
    Given: Dado que existem enquetes cadastradas na plataforma
    When: Quando o usuário requisitar a lista de enquetes com a página e limite definidos
    Then: Então o sistema deve retornar as enquetes com suas opções correspondentes

Scenario: Nenhuma enquete cadastrada
    Given: Dado que não existem enquetes na plataforma
    When: Quando o usuário requisitar a lista de enquetes
    Then: Então o sistema deve retornar uma lista vazia
