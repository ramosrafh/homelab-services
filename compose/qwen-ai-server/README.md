# Qwen AI server (llama.cpp + ROCm)

```bash
cp .env.example .env
docker compose --env-file .env up -d
```

Serve `unsloth-qwen3.8-27b-ud-q3_k_xl.gguf` com a imagem ROCm oficial do
`llama.cpp`, aproveitando a RX 7800 XT do desktop. A API OpenAI-compatible
fica na porta `8080`; o firewall do desktop aceita essa porta apenas em `wt0`
(NetBird), nunca pela LAN ou Internet.

Use `ghcr.io/ggml-org/llama.cpp:server-rocm`. Imagens antigas do namespace
`ggerganov` não reconhecem a arquitetura `qwen35` desse GGUF.

## Pré-requisito: modelo

Coloque antes de iniciar:

```bash
sudo mkdir -p /var/lib/ai-models/qwen
cd /var/lib/ai-models/qwen
# baixe aqui `unsloth-qwen3.8-27b-ud-q3_k_xl.gguf`
```

O perfil inicial usa todas as camadas na GPU e contexto de 8192 tokens. O
template de chat é lido automaticamente dos metadados do GGUF. É o ponto de
partida seguro para 16 GB de VRAM. Só aumente
`QWEN_CONTEXT_SIZE` depois de confirmar que a carga e a geração estão estáveis.

## Probar

```bash
curl http://127.0.0.1:8080/v1/models
curl http://<IP-NetBird-do-desk>:8080/v1/models
```

## Notas ROCm

- `HSA_OVERRIDE_GFX_VERSION=11.0.0` é necessário para RDNA3 (7800 XT / gfx1100).
- Não use `--no-mmap`: o mapeamento de arquivo reduz pressão na RAM durante a
  carga do GGUF.
