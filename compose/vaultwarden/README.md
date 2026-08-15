# Vaultwarden

```bash
../../bin/homelab-services init vaultwarden
../../bin/homelab-services up vaultwarden
```

Abra `http://vault.rafh.io` pela VPN NetBird. O primeiro usuário é criado pelo
fluxo normal do Vaultwarden. Depois, altere `SIGNUPS_ALLOWED=false` no `.env`
e execute `../../bin/homelab-services up vaultwarden` novamente.

Esta primeira versão usa SQLite, adequado para uma única instância pessoal.
Um backup deve incluir `/srv/homelab/services/vaultwarden`.

Não guarde senhas reais antes de configurar HTTPS com certificado confiável. A
primeira etapa usa HTTP apenas dentro do túnel criptografado do NetBird.
