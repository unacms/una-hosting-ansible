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
- `templates/` — Jinja2 templates (same paths under `/srv/una` as legacy deploy)

## Tags

| Tag | Used by |
|-----|---------|
| `bootstrap` | deploy |
| `files` | deploy, edit, enable-ssl |
| `env` | deploy, edit, enable-ssl |
| `compose` | deploy, edit, enable-ssl |
| `ssl` | enable-ssl (HTTP prelude before files) |

## Worker env

- `U_ANSIBLE_REPO` — git URL (required)
- `U_ANSIBLE_BRANCH` — branch (default `main`)
- `U_ANSIBLE_CHECKOUT` — checkout dir on host (default `/var/lib/una-ansible`)

Secrets are written by the worker to `/srv/una/.ansible-extra-vars.json` (mode 0600)
and passed with `-e @...`, then removed after the run.
