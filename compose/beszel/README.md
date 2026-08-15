# Beszel

```bash
../../bin/homelab-services init beszel
../../bin/homelab-services up beszel
```

Abra `http://beszel.rafh.io`, crie o usuário administrador e, em **Add
System**, copie `TOKEN` e `KEY` para o `.env`. Em seguida:

```bash
../../bin/homelab-services agent beszel
```

Use `/beszel_socket/beszel.sock` como Host/IP ao adicionar o sistema local.
