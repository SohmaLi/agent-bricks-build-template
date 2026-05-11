# ARI MODE — Closed-Loop Fidelity System for Figma → Bricks Builder

## 1. Objective

Upgrade frontend fidelity from:

* Approximate Rendering (~80%)
  to:
* Runtime-Verified Pixel Fidelity (~100%)

by replacing manual human feedback with an automated runtime verification loop.

The system no longer assumes generated layout is correct.
Instead, every build must pass runtime inspection before completion.

---

# 2. Core Architecture

The system has transitioned from:

Generate → Trust

to:

Generate → Render → Inspect → Compare → Correct → Re-render

This creates a fully closed-loop fidelity pipeline.

---

# 3. ARI (Automated Runtime Inspector)

ARI is a headless browser inspection layer built with Playwright.

Its responsibility is to:

* render the real frontend
* inspect actual browser runtime behavior
* extract computed layout data
* detect visual/layout mismatches automatically

ARI acts as the system’s “runtime eyes”.

---

# 4. Runtime Audit Engine

After rendering, the inspector extracts:

* Computed Styles
* Bounding Boxes
* Typography Metrics
* Flex/Grid Runtime State
* Spacing Metrics
* Overflow/Wrapping State

and serializes everything into structured Audit JSON.

This replaces screenshot-based guessing with deterministic runtime data.

---

# 5. Diff & Patch Logic

The AI compares:

Figma Source of Truth
vs
Runtime Audit JSON

If mismatches are detected:

* incorrect gap
* unexpected wrapping
* typography drift
* inherited spacing
* alignment shift
* box model inconsistencies

the AI automatically:

1. calculates correction deltas
2. patches Bricks JSON
3. rebuilds the section
4. reruns inspection

This loop repeats automatically (max retry limit configurable).

---

# 6. Execution Flow

## Phase 1 — Build

AI generates and pushes the initial Bricks structure from Figma data.

---

## Phase 2 — Runtime Inspection

AI executes:

`node .agents/scripts/bricks-inspector.js [URL] [SectionID]`

Generated outputs:

* Screenshot artifacts
* Runtime Audit JSON
* Layout diagnostics

---

## Phase 3 — Logical Audit

AI validates runtime behavior including:

### Box Model

* padding
* margin
* width/height
* border-box consistency

### Layout Engine

* flex wrapping
* alignment
* gap behavior
* overflow issues

### Typography

* font-size
* line-height
* letter-spacing
* font inheritance

### Responsive Logic

* shrink behavior
* auto-layout consistency
* browser constraint handling

---

## Phase 4 — Auto-Correction

If runtime mismatches exist:
* AI patches layout rules
* rebuilds automatically
* reruns inspection

until:
* layout converges
  or
* retry limit is reached

---

# 7. Key Technical Shift

Previous system:
* Structural Validation
* Tree Verification
* Screenshot Guessing

Current system:
* Runtime Verification
* Computed-Style Auditing
* Deterministic Layout Inspection

The system no longer validates “structure”.
It validates actual browser-rendered reality.

---

# 8. Expected Outcomes

## Automation
* Fully autonomous verification pipeline
* No manual screenshot feedback required

## Fidelity
* Runtime-verified pixel accuracy
* Computed-style-based validation

## Stability
* Elimination of recurring layout drift issues
* Reduced CSS inheritance bugs
* Reduced browser-specific inconsistencies

---

# 9. Final Conclusion

The architecture has evolved from **“Generate & Trust”** to **“Generate, Inspect, Verify & Self-Correct”**.
This fundamentally changes the AI’s role: from a passive code generator into an active runtime-aware rendering system.
