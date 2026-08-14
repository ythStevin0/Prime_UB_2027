AGENTS.md — Prime UB AI Engineering Constitution

1. Purpose

This file defines the mandatory working rules for AI coding agents operating in this repository.

The agent must treat this file as an engineering constitution. If another instruction conflicts with this file, stop and surface the conflict instead of silently choosing one.

2. Current Project State

This repository is currently in the discovery and architecture phase.

Important:

Do not assume the final product requirements are already locked.

Do not invent business requirements.

Do not prematurely implement microservices.

Do not make irreversible architecture decisions without documenting them.

The UI/UX Pro Max skill ecosystem is installed under .agents/skills/.

3. Core Working Principles

Inspect before modifying.

Plan before implementing.

Prefer simple architecture over unnecessary complexity.

Keep business logic out of controllers/routes.

Keep infrastructure concerns out of domain logic.

Make security, performance, accessibility, and maintainability first-class concerns.

Prefer measurable decisions over assumptions.

Avoid premature optimization, but design clear performance boundaries from the beginning.

Do not add dependencies without a concrete reason.

Do not change unrelated code while implementing a task.

4. Mandatory Workflow

For non-trivial tasks:

Discovery
→ Requirements
→ Architecture
→ Plan
→ Implementation
→ Tests
→ Verification
→ Documentation

Before coding, identify:

affected modules

data flow

dependencies

security implications

performance implications

failure modes

required tests

For architecture-changing work, create or update an ADR in docs/adr/.

5. Architecture Rules

Use a modular architecture.

Default conceptual flow:

Presentation
→ Application / Use Cases
→ Domain
→ Infrastructure

Rules:

Controllers/routes handle transport concerns.

Controllers must not contain business logic.

Use cases/application services orchestrate workflows.

Domain logic enforces business invariants.

Repositories abstract persistence where appropriate.

Infrastructure implements database, storage, payment, email, queue, and external-service integrations.

External providers must not leak deeply into domain logic.

Cross-module dependencies must be explicit.

Do not introduce a microservice merely because a module exists.

6. Database Rules

Never fetch large datasets without pagination or an explicit reason.

Avoid N+1 queries.

Add indexes based on actual query patterns.

Do not add indexes blindly.

Use transactions when multiple writes must be atomic.

Define uniqueness and foreign-key constraints at the database level where appropriate.

Never expose raw database errors to end users.

Do not put large uploaded files directly into relational database rows unless explicitly justified.

7. Authentication and Authorization

Authentication and authorization are separate concerns.

The system must distinguish:

identity

session

authentication

authorization

role

permission

resource ownership

Never trust authorization decisions made only by the client.

Every protected server operation must validate authorization server-side.

Do not log:

passwords

session secrets

access tokens

payment secrets

private keys

sensitive personal data

8. Payment Rules

Payment status from the browser is never the authoritative source.

Payment confirmation must be based on a verified provider callback/webhook or equivalent server-side verification.

Payment processing must consider:

idempotency

duplicate webhooks

retries

signature verification

transaction consistency

failure states

reconciliation

Never mark an order as paid solely because the frontend reports success.

9. Submission and File Upload Rules

Competition submissions must separate:

submission metadata

file metadata

object storage

Validate:

file type

file size

ownership

competition eligibility

submission window

authorization

Do not trust MIME type or filename alone.

Large or expensive processing should be moved to background jobs where appropriate.

10. Performance Rules

Performance must be considered across:

Frontend:

JavaScript bundle

rendering

images

fonts

animations

network requests

Backend:

runtime

API latency

concurrency

external APIs

background jobs

Database:

query latency

indexes

N+1

connection pooling

locks

pagination

Use:

server rendering where appropriate

client components only when needed

lazy loading

responsive images

caching when justified

queues for non-critical expensive work

Prefer animation properties such as transform and opacity.

Do not optimize based on guesses. Measure bottlenecks first.

11. UI/UX Rules

The project uses the installed UI/UX Pro Max ecosystem as a design reasoning tool.

Before creating major UI:

Understand the user goal.

Establish a coherent visual direction.

Define reusable design tokens.

Define component states.

Consider accessibility.

Consider responsive behavior.

Define motion intentionally.

Consider React/client-side performance.

Motion must communicate:

hierarchy

transition

feedback

spatial relationships

interaction

Do not animate everything.

Do not blindly copy components from external component libraries. Components must conform to the project's design system.

12. Accessibility

Target accessible interfaces.

Consider:

keyboard navigation

focus states

semantic HTML

labels

contrast

reduced motion

screen-reader behavior

form validation feedback

Interactive elements must remain usable without relying exclusively on hover.

13. Error Handling

Errors must be:

predictable

observable

safe

user-appropriate

Never expose:

stack traces

database details

secrets

internal service topology

Use structured error handling and stable error semantics.

14. Observability

Production-critical operations should be observable.

Prefer:

structured logs

request correlation IDs

error tracking

metrics

health checks

audit logs for sensitive administrative actions

Never add logging that leaks secrets.

15. Testing

Every meaningful feature should have appropriate tests.

Consider:

unit tests for domain/business rules

integration tests for persistence and external boundaries

API tests

end-to-end tests for critical user journeys

Critical journeys include, when implemented:

authentication

competition registration

submission

checkout

payment confirmation

administrative operations

16. Dependency Rules

Before adding a dependency:

Explain why it is needed.

Check whether the existing stack already solves the problem.

Consider bundle size and maintenance cost.

Consider security and license implications.

Do not add libraries simply because they are popular.

17. AI Agent Behavior

The agent must:

state assumptions

identify uncertainty

avoid pretending a decision is final

preserve existing working behavior

report files changed

report tests executed

report known limitations

If requirements are ambiguous and the ambiguity can materially change architecture, stop and ask for clarification.

If a safe assumption can be made without architectural impact, document it and proceed.

18. Definition of Done

A task is not done merely because code compiles.

Done means:

implementation matches the requirement

architecture boundaries remain intact

tests are added/updated where appropriate

lint/type checks pass where applicable

relevant build checks pass

security implications were considered

performance implications were considered

documentation is updated when necessary

no unrelated changes were introduced

19. Forbidden Shortcuts

Never:

hardcode secrets

disable security checks just to make tests pass

bypass authorization

trust client payment status

commit .env secrets

silently swallow important errors

delete tests to make CI green

create duplicate business logic in multiple layers

introduce microservices without justification