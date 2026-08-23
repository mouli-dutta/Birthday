# Customization Guide

How to add your own photos and background music to the birthday site.

---

## Adding Custom Images

All images live in the `assets/` folder. Replace the placeholder SVGs/PNGs with your own photos (`.jpg`, `.png`, or `.webp`).

### Image Reference Table

| File in `index.html` | Used On | Description |
|---|---|---|
| `assets/mom-01.svg` | Page 1, Page 6, Page 8 | Main photo of Mom (circle frame, hero frame, final background) |
| `assets/mom-02.svg` | Page 2 | Left memory photo |
| `assets/mom-03.svg` | Page 2 | Right memory photo |
| `assets/mom-04.svg` | Page 3 | Polaroid labeled "Sunshine" |
| `assets/memory-01.svg` | Page 3 | Polaroid labeled "Home" |
| `assets/memory-02.svg` | Page 3 | Polaroid labeled "A Memory" |
| `assets/family-01.svg` | Page 3 | Polaroid labeled "Always" |
| `assets/flower.png` | Page 5 | Bouquet image |
| `assets/cake.png` | Page 7 | Birthday cake image |
| `assets/bkg1.png` | Odd pages (1,3,5,7) | Background image |
| `assets/bkg2.png` | Even pages (2,4,6,8) | Background image |

### Steps

1. **Prepare your photos** — crop/resize to roughly square or 4:3 for best results.
2. **Name them** to match the filenames above, **or** update the `src` attribute in `index.html`.
3. **Drop them** into the `assets/` folder, replacing the existing files.

### Example: Replacing with your own photos

**Option A — Keep the same filenames:**

Rename your photo to `mom-01.svg` (or `.jpg`/`.png`) and place it in `assets/`. If using a different extension, update the `src` in `index.html`:

```html
<!-- Before -->
<img src="assets/mom-01.svg" alt="Mom" />

<!-- After (using .jpg) -->
<img src="assets/mom-01.jpg" alt="Mom" />
```

**Option B — Use your own filenames:**

Place your photo (e.g. `my-photo.jpg`) in `assets/` and update every `src` that references it:

```html
<img src="assets/my-photo.jpg" alt="Mom" />
```

### Tips

- **Page 1 circle frame** — a square photo works best since it's displayed in a circle.
- **Page 3 polaroids** — portrait-oriented photos look best in the polaroid frames.
- **Page 5 bouquet** — a transparent PNG looks best (no white background).
- **Page 7 cake** — a transparent PNG looks best.
- **Backgrounds** — use large images (1920×1080 or bigger) for `bkg1.png` and `bkg2.png`.

---

## Adding Background Music

The site has a music toggle button (♪) in the top-right corner.

### Steps

1. **Get an `.mp3` file** of your chosen song.
2. **Create** the `audio/` folder if it doesn't exist:
   ```
   Birthday/
   ├── audio/
   │   └── birthday-music.mp3
   ```
3. **Name the file** `birthday-music.mp3` and place it in the `audio/` folder.
4. That's it — the music button will now play your song.

### Using a different filename

If your file is named differently (e.g. `happy-birthday.mp3`), update line 19 in `index.html`:

```html
<!-- Before -->
<source src="audio/birthday-music.mp3" type="audio/mpeg" />

<!-- After -->
<source src="audio/happy-birthday.mp3" type="audio/mpeg" />
```

### Notes

- Music will **not autoplay** — the user must click the ♪ button to start it.
- The music **loops** automatically.
- Supported formats: `.mp3` (recommended), `.ogg`, `.wav`.
