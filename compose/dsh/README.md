# DeepSeek Harness (dsh)

Harness de agentes (`dsh`) rodando como stack no servidor. A Web UI escuta
somente em `127.0.0.1:3080` e é acessada pelo Caddy através do NetBird. O modelo
Qwen roda no desktop com ROCm e é consumido pelo servidor através da API.

```bash
../../bin/homelab-services init dsh
../../bin/homelab-services up dsh
```

## Pré-requisito: modelo ativo

O Qwen precisa estar ativo no desktop primeiro:

```bash
curl http://<IP-NetBird-do-desk>:8080/v1/models
```

O router do desktop expõe `qwen-q3` (16384 tokens) e `qwen-q2` (65536 tokens).
Defina `DSH_LLM_MODEL` com um deles e `DSH_LLM_BASE_URL` com o IP NetBird do
desktop no `.env`. Ao trocar esse valor, reinicie somente a stack `dsh`; o
router recarrega o modelo solicitado na GPU.

A stack registra os dois modelos no provider `local-qwen`. O valor de
`DSH_LLM_MODEL` é usado somente como escolha inicial; uma troca feita pelo
seletor de modelos do DSH fica persistida em
`/srv/homelab/services/dsh/state/settings.json`.

## Uso

- Web UI: `https://dsh.rafh.io` pela VPN NetBird. A porta 3080 permanece presa
  a `127.0.0.1`; somente o Caddy a alcança.
- O `dsh` está em *dev preview*.
- O harness apenas consome a API; a GPU continua no desktop.

## Notas

- Estado e workspace ficam em `/srv/homelab/services/dsh`, fora do repositório.
- O primeiro início baixa o DSH e pode levar alguns minutos. O cache do `npx`
  fica persistido em `/srv/homelab/services/dsh/npm-cache`, então os próximos
  inícios são rápidos.
