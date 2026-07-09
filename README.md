# Website Factory — Template Repo

Everything needed to spin up a new AI-built website in 30 seconds, with quality
gates the AI physically cannot skip.

## What's inside
| File | Job |
|---|---|
| `CLAUDE.md` | The standing brain: interview rules, stack + service menu, workflow, project log |
| `.claude/settings.json` | Hooks: auto-format every file on write; quality gate on every stop |
| `.claude/hooks/quality-gate.sh` | The enforcer — typecheck, lint, tests must pass or Claude is forced to keep fixing (exit code 2) |
| `.claude/agents/reviewer.md` | Fresh-eyes adversarial reviewer subagent, dispatched after every feature |
| `.github/workflows/quality-gates.yml` | Re-runs all gates on GitHub's servers — the validator outside the AI |
| `design.md` | Your taste, written once, inherited by every site |
| `.env.example` | Where service keys go (Neon/Supabase, Resend, Stripe, Anthropic) |
| `templates/` | 12 website blueprints — the interview offers them as a menu; the agent builds each fresh on the current stack |
| `design-library/` | Style directions, palette library, immersive-3D contract, project ideas backlog |
| `performance.md` | Performance law: Core Web Vitals budgets, JS/image/font limits, verification steps |

## One-time setup
1. Push this folder to GitHub as `website-factory-template`
2. In the repo settings, tick **Template repository**
3. Fill in `design.md` with your taste (10 minutes, once, pays forever)

## Every new website, forever
1. GitHub → "Use this template" → new repo → clone it
2. Open Claude Code in the folder (pick your model with `/model` — Fable included)
3. Type: `New website. Run your interview.`
4. Answer the questions (or "use defaults") and let it build

## How the enforcement works
- CLAUDE.md is guidance the agent follows.
- The Stop hook is physics it can't ignore: when Claude tries to finish, the gate
  script runs typecheck + lint + tests. Any failure exits with code 2, which blocks
  the stop and feeds the errors back — Claude must fix them to finish. A loop guard
  (`stop_hook_active`) prevents infinite retries on genuinely stuck errors.
- GitHub Actions re-runs everything on push, outside the AI entirely.

Three layers: guidance → local enforcement → external verification.
That's the honest meaning of "foolproof."
