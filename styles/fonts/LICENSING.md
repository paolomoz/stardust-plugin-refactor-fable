# Font licensing — REQUIRED BEFORE GOING LIVE

| File | Family / weight | Foundry / source | Status |
|---|---|---|---|
| `3f71f8a0-Metropolis-Regular.woff` | Metropolis 400 | Lifted from hirslanden.ch font delivery (hashed filename = fonts.com/Monotype CDN pattern) | ⚠️ unconfirmed — confirm webfont/embedding license with the brand team |
| `2dcdd0ed-Metropolis-SemiBold.woff` | Metropolis 600 | same | ⚠️ unconfirmed |
| `0b029aff-Metropolis-Bold.woff` | Metropolis 700 | same | ⚠️ unconfirmed |

Note: an open-source "Metropolis" (Unlicense, by Chris Simpson) exists, but these
binaries came from the brand's commercial font CDN — treat as proprietary until
confirmed.

**Remove path** if licensing cannot be confirmed: delete the three `.woff` files
and the three `metropolis` `@font-face` rules at the top of `styles/styles.css`.
All stacks fall back to the metric-matched Arial declared in the same file
(zero-CLS fallback).
