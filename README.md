# iMile SLA Regional SP — V5

## Alterações principais
- Mantido o painel regional.
- Adicionadas 2 telas específicas para print:
  1. **Resumo por Base**
     - Total
     - Entregues
     - Não entregues
     - Em rota
     - Todos os demais status com quantidade e percentual
     - Gráfico da distribuição da base
  2. **Motoristas Ofensores**
     - Ranking por pacotes faltantes
     - Total por motorista
     - Entregues
     - Faltam
     - % faltam
     - % entregue
- Gráfico de performance alterado para barras **lado a lado**: Entregue x Não Entregue.
- Gráfico DSP removido.
- Novo gráfico **Baixas por Hora**, usando o campo `Horário de entrega`.
- Removida a faixa que informava o nome do arquivo importado.
- Cabeçalho alterado para `Supervisor`.

## Supervisor por Base
O relatório fornecido não possui uma coluna de Supervisor/Gestor/Responsável.

Para exibir o nome correto automaticamente, abra `app.js` e procure:

```js
const BASE_SUPERVISORS = {
  "DS VLM": "",
  "DS JDP": "",
  ...
};
```

Preencha uma vez, por exemplo:

```js
"DS VLM": "Daniel Coutinho",
```

Ao selecionar a base, o painel e as telas de print mostrarão o supervisor configurado.

## Como usar
1. Extraia o ZIP.
2. Abra `index.html` no Chrome ou Edge.
3. Clique em **Importar Excel**.
4. Escolha o relatório iMile `.xlsx`.
5. Para envio à base:
   - Abra `Resumo por Base` ou `Motoristas Ofensores`.
   - Escolha a base.
   - Clique em **Imprimir / Salvar PDF** ou tire o print da tela.

A leitura do Excel ocorre localmente no navegador.


## V4 — Salvar como imagem
As telas **Resumo por Base** e **Motoristas Ofensores** agora possuem o botão:

`📸 Salvar imagem PNG`

O sistema captura somente a área do relatório, sem menus ou controles, e baixa uma imagem em alta resolução pronta para envio.

## Usar em outros notebooks
Sim. Basta copiar a pasta do projeto ou o arquivo ZIP para outro computador e abrir `index.html` no Chrome ou Edge.

Como esta versão usa bibliotecas via CDN (XLSX, Chart.js e html2canvas), o notebook precisa ter acesso à internet para carregar essas bibliotecas.

Para uma versão totalmente portátil/offline, as bibliotecas podem ser incluídas dentro da própria pasta do projeto.


## V5 — Performance Geral + Supervisores
- Novo card **Performance Geral** = Entregues ÷ Total.
- Faixas de cor:
  - 0,00% a 79,99%: vermelho
  - 80,00% a 92,99%: amarelo
  - 93,00% a 100,00%: verde
- Incorporado o mapa Base → Supervisor fornecido para a Regional SP.
- Ao selecionar uma base, o cabeçalho e as telas de imagem exibem automaticamente o supervisor correspondente.
- Bases fornecidas sem supervisor continuam exibindo `Não definido`.
