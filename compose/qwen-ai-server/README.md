# Qwen AI server (llama.cpp + ROCm)

```bash
cp .env.example .env
docker compose --env-file .env up -d
```

Serve os dois GGUFs Qwen com a imagem ROCm oficial do `llama.cpp`, aproveitando
a RX 7800 XT do desktop. A API OpenAI-compatible fica na porta `8080`; o
firewall do desktop aceita essa porta apenas em `wt0` (NetBird), nunca pela LAN
ou Internet.

Use `ghcr.io/ggml-org/llama.cpp:server-rocm`. Imagens antigas do namespace
`ggerganov` não reconhecem a arquitetura `qwen35` desse GGUF.

## Pré-requisito: modelo

Coloque antes de iniciar:

```bash
sudo mkdir -p /var/lib/ai-models/qwen
cd /var/lib/ai-models/qwen
# baixe aqui os dois arquivos:
# - unsloth-qwen3.8-27b-ud-q3_k_xl.gguf
# - unsloth-qwen3.8-27b-ud-q2_k_xl.gguf
```

## Router de modelos

O servidor inicia em modo router e encontra os dois arquivos por
`models.ini`. Os nomes expostos na API são:

- `qwen-q3`: Q3 com 8192 tokens, melhor escolha para agentes e código.
- `qwen-q2`: Q2 com 16384 tokens, útil quando mais contexto vale a perda de
  qualidade.

O router carrega o modelo solicitado na primeira requisição. `--models-max 1`
garante que apenas um esteja residente na RX 7800 XT por vez. Trocar de modelo
recarrega pesos e pode levar alguns segundos; os dois GGUFs continuam no disco.
O template de chat é lido automaticamente dos metadados do GGUF.

## Probar

```bash
# Lista os dois modelos e o estado (loaded/unloaded)
curl http://127.0.0.1:8080/models

# Carrega Q3 explicitamente; a Llama UI ou uma chamada de chat com
# "model": "qwen-q3" também faz essa carga automaticamente.
curl -X POST http://127.0.0.1:8080/models/load \
  -H 'Content-Type: application/json' \
  -d '{"model":"qwen-q3"}'
```

## Notas ROCm

- `HSA_OVERRIDE_GFX_VERSION=11.0.0` é necessário para RDNA3 (7800 XT / gfx1100).
- Não use `--no-mmap`: o mapeamento de arquivo reduz pressão na RAM durante a
  carga do GGUF.
