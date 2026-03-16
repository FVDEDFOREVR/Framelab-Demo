# FrameLab Dogfood Notes

This demo now consumes generated FrameLab output for a fixed subset of components:

- `Button`
- `ProductCard`
- `Input`
- `NavItem`
- `Toast`

The source of truth is `src/framelab/demo.fl`. Generated artifacts are written to `src/generated`.

## Build Flow

- `npm run framelab:build` rebuilds the local compiler, compiles `demo.fl`, and refreshes `src/generated` when a sibling `../framelab-compiler` checkout is available
- In CI or deploy environments without that sibling compiler repo, `npm run framelab:build` intentionally falls back to the committed `src/generated` artifacts instead of trying to regenerate them
- `npm run build` runs `framelab:build` first, then runs the normal TypeScript and Vite production build

## Observed Limitations

- `Toast` keeps an intentional `motion enter` declaration. The current compiler emits `RE-UNSUPPORTED-MOTION`, and the demo does not add a custom runtime animation workaround.
- `Input` is emitted as a presentational component, not a native text input. The demo uses it as visual UI, not as a form control.
- Generated intent wrappers currently need a small demo-side reset to avoid default browser button styling.

## Workarounds Kept Explicit

- The demo uses app CSS for host-element reset behavior instead of patching generated files.
- Token names in `demo.fl` stay within the current parser and validation rules rather than relying on shorthand not supported by the language contract.
