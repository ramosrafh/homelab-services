# DeepSeek Harness (dsh)

Harness de agentes (`dsh`) rodando como stack no servidor. Expose uma Web UI en
`127.0.0.1:3080` (port aerial a Caddy, netBird), pero a IA come dela **no es
local**: aponta ao modelo ROCm que corre no desktop (Qwen via llama.cpp).

```bash
../../bin/homelab-services init dsh
../../bin/homelab-services up dsh
```

## Pré-requisito: modelo ativo

O Qwen precisa estar ativo no desktop primeiro:

```bash
curl http://<IP-NetBird-do-desk>:8080/v1/models
```

Anote o id devolto (ex: `unsloth-qwen3.6-35b-a3b-q6_k-mtp`) e ajuste
`DSH_LLM_MODEL` (e `DSH_LLM_BASE_URL` co IP mesh do desk) no `.env`.

## Uso

- Web UI local: `http://127.0.0.1:3080` (via Caddy: `http://harness.rafh.io` se
  config rearado).
- `dsh` está em *dev preview*: na primeira corrida registra p/providers/plugins y
  config pror.
- O harness apenas do consumo via API; a GPU sigue no desktop, o server não a
  requiere.

## Notas

- Stack só serve do harness UI; arquivo de estado em
  `/srv/homelab/services/dsh` (fuera do repo).
- Como corre via `npx @deepseek-ai/dsh`, o container baixa os deps na primeira
  execução. Para um deploy fixo conviene un Dockerfile que haga build previo.