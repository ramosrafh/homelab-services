# homelab-services

Stacks Docker Compose do `server`.

O Docker e o Caddy são gerenciados pelo `nixconfig`. Cada stack publica apenas
em `127.0.0.1`; o Caddy nativo é o ponto de acesso, pela VPN NetBird.

## Pré-requisitos

```bash
findmnt /srv/homelab
docker info --format 'root={{.DockerRootDir}} driver={{.Driver}}'
```

O primeiro comando deve mostrar o SSD externo e o segundo deve mostrar
`root=/srv/homelab/docker`. Se o volume não estiver montado, não inicie stacks.

## Operação

```bash
./bin/homelab-services init uptime-kuma
./bin/homelab-services up uptime-kuma
./bin/homelab-services status
./bin/homelab-services logs uptime-kuma
./bin/homelab-services down uptime-kuma
```

Stacks disponíveis agora: `beszel`, `uptime-kuma` e `vaultwarden`.

Dados persistentes e segredos ficam fora deste repositório:

```text
/srv/homelab/services/beszel
/srv/homelab/services/uptime-kuma
/srv/homelab/services/vaultwarden
```

Immich e Nextcloud entram na próxima etapa, junto do plano de backup. Seus
dados ficarão em `/srv/homelab/media`.

## Endereços privados

Com NetBird ativo e a configuração NixOS aplicada:

```text
http://home.rafh.io
http://beszel.rafh.io
http://uptime.rafh.io
http://vault.rafh.io
```

Esses endereços são HTTP apenas dentro da VPN por enquanto. TLS com desafio DNS
entra depois, junto de SOPS para os tokens necessários.

Arquivos `.env` são locais e ignorados pelo Git. Comece sempre em
`.env.example`; não versione tokens, senhas ou bancos de dados.
