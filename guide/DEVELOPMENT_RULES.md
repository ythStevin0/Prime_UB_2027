    Development Rules — Prime UB

Branching

Use small, focused branches.

Recommended pattern:

feat/...

fix/...

refactor/...

docs/...

chore/...

Commits

Prefer focused commits.

Examples:

feat: add competition registration flow

fix: prevent duplicate payment webhook processing

docs: define authentication architecture

Do not mix unrelated changes in one commit.

Pull Request / Review Checklist

Before merging:

Requirement is clear.

Architecture boundaries are preserved.

No unnecessary dependency added.

Tests added/updated.

Type checking passes.

Linting passes.

Build passes when applicable.

Accessibility considered.

Security considered.

Performance considered.

Documentation updated where necessary.

Database Changes

Every schema change must be migration-based.

Do not manually modify production schema without a documented migration strategy.

Destructive migrations require explicit review.

Environment Variables

Never commit real secrets.

Maintain an example environment file such as:

.env.example

with placeholder values only.

API Changes

For meaningful API changes document:

endpoint

authentication requirements

authorization

input

output

errors

idempotency behavior

rate-limit considerations

UI Changes

For meaningful UI changes consider:

desktop

tablet

mobile

loading state

empty state

error state

disabled state

focus state

reduced motion

accessibility

Performance Review

For pages/components that introduce substantial client-side behavior, consider:

bundle impact

render frequency

network requests

image weight

animation cost

Production Safety

Never run destructive commands against production without explicit confirmation.

Never expose production credentials to the AI agent unnecessarily.