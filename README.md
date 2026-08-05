# Ansible playbooks for UNA host configuration (ansible-pull)

This directory is intended to be the **root** of a dedicated git repository
referenced by the worker via `U_ANSIBLE_REPO`.

## Layout

- `local.yml` — playbook run by `ansible-pull`
- `roles/bootstrap` — swap, docker, certbot, directories (`--tags bootstrap`)
- `roles/ssl_prelude` — HTTP stack before SSL cutover (`--tags ssl`)
- `roles/files` — template configs / neo / compose files (`--tags files`)
- `roles/env` — `/srv/una/.env` and `.sec_*` secrets (`--tags env`)
- `roles/compose` — docker-compose down / pull / up (`--tags compose`)
- `roles/pull_timer` — systemd timer (`--tags timer`)
- `templates/` — Jinja2 templates (same paths under `/srv/una` as legacy deploy)

## Tags

| Tag | Used by |
|-----|---------|
| `bootstrap` | deploy |
| `files` | deploy, edit, enable-ssl, timer (on repo change) |
| `env` | deploy, edit, enable-ssl, timer (on repo change) |
| `compose` | deploy, edit, enable-ssl, timer (on repo change) |
| `ssl` | enable-ssl (HTTP prelude before files) |
| `timer` | deploy, edit, enable-ssl (install/update systemd timer) |

## Systemd timer

After deploy, `una-ansible-pull.timer` runs periodically to keep the deployment synced with the repository.

1. Cheap `git fetch` / checkout of the ansible repo
2. If HEAD is unchanged since last apply → exit immediately
3. If HEAD changed → full apply with tags `files,env,compose,timer` (compose restart included)

Wrapper: `/usr/local/sbin/una-ansible-pull`  
Extra vars: `/srv/una/.ansible-extra-vars.json` (mode 0600)

```bash
systemctl status una-ansible-pull.timer
journalctl -u una-ansible-pull.service -f
```

## Worker env

- `U_ANSIBLE_REPO` — git URL (required)
- `U_ANSIBLE_BRANCH` — branch (default `main`)
- `U_ANSIBLE_CHECKOUT` — checkout dir on host (default `/var/lib/una-ansible`)
