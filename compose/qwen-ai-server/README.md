# Qwen AI server (llama.cpp + ROCm)

```bash
../../bin/homelab-services init qwen-ai-server
../../bin/homelab-services up qwen-ai-server
```

Serve o modelo Unsloth Qwen3.6 35B A3B via llama.cpp compilado para AMD ROCm
(`server-rocm`), aproveitando a GPU RX 7800 XT do desktop. Não passa por Caddy;
os pares NetBird acessam direto na porta `8080`.

## Pré-requisito: modelo

Coloque antes de iniciar:

```bash
sudo mkdir -p /var/lib/ai-models/qwen
cd /var/lib/ai-models/qwen
# descarga aquí `unsloth-qwen3.6-35b-a3b-q6_k-mtp.gguf`
```

Ajuste `QWEN_MODELS_DIR` no `.env` se os modelos estão em outro lugar.

## Probar

```bash
curl http://127.0.0.1:8080/v1/models
curl http://<IP-mesh-desk>:8080/v1/models   # desde outro pares via NetBird
```

## Notas ROCm

- `HSA_OVERRIDE_GFX_VERSION=11.0.0` é necessário para RDNA3 (7800 XT / gfx1100).
- Contexto `-c 131072` e quantização `--kv-cache-type q8_0`.