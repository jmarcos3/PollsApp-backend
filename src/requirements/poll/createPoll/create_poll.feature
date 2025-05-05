Feature: Create Poll
Como um usuário autenticado
Quero criar uma nova enquete
Para que eu possa coletar votos sobre determinado tema

Scenario: Criar enquete com sucesso
    Given: Dado que o usuário está autenticado via Google
    And: E o usuário tem permissão para criar enquetes
    When: Quando o usuário enviar os dados da enquete com opções válidas
    Then: Então o sistema deve criar a enquete e associar as opções a ela
    And: E o sistema deve retornar o ID da enquete criada

Scenario: Usuário não encontrado
    Given: Dado que o token JWT contém um email não associado a nenhum usuário
    When: Quando o sistema tentar buscar o usuário
    Then: Então o sistema deve retornar um erro informando que o usuário não foi encontrado

Scenario: Dados da enquete inválidos
    Given: Dado que os dados da enquete não contêm opções válidas
    When: Quando o sistema tentar criar a enquete
    Then: Então o sistema deve retornar um erro informando que as opções são inválidas
