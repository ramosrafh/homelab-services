# Beszel

Monitoramento de servidores: hub (dashboard web) + agente local.

## Primeiro deploy

```bash
cp .env.example .env
# edite APP_URL no .env
docker network create proxy  # se ainda não existir
docker compose up -d beszel
```

Acesse o `APP_URL`, crie o usuário admin, clique em **Add System** e copie `TOKEN` e `KEY` para o `.env`. Depois:

```bash
docker compose --profile agent up -d
```

Use `/beszel_socket/beszel.sock` como Host/IP ao adicionar o sistema no hub.

## Agentes remotos

Em cada host, rode `henrygd/beszel-agent` com `LISTEN=0.0.0.0:45876` e o `KEY` gerado no hub. Porta 45876/TCP deve ser alcançável pelo hub.
