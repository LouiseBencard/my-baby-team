"""Extract ONLY the figure marks from the Melo logo — the two parents,
the heart, and the two dots. Removes BOTH the moss-green background AND the
thin rounded-square frame around the figures.

Approach: flood-fill from the icon corners (which are inside the rounded
outline ring but outside the figures) to mark the central area, then
threshold-mask the figures using connected components implemented as
a BFS-based labeling (no scipy needed)."""

from PIL import Image, ImageDraw
import numpy as np
import os
from collections import deque

SRC = "/sessions/gracious-lucid-hopper/mnt/my-baby-team/public/melo-app-icon-new.png"
OUT_DIR = "/sessions/gracious-lucid-hopper/mnt/outputs/melo-pitch"
os.makedirs(OUT_DIR, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
lum = (0.299 * r + 0.587 * g + 0.114 * b).astype(np.int32)
H, W = lum.shape
print(f"Source: {W}×{H}")

# Step 1 — binary mask of "bright" pixels (the figures + outline frame).
BRIGHT_THRESHOLD = 130   # tune: figure sage is brighter than this, moss isn't
bright = lum > BRIGHT_THRESHOLD

# Step 2 — connected components labeling via BFS (4-connectivity)
labels = np.zeros((H, W), dtype=np.int32)
next_label = 1
sizes = {}
touches_edge = {}

for y in range(H):
    for x in range(W):
        if bright[y, x] and labels[y, x] == 0:
            # BFS flood-fill
            queue = deque([(y, x)])
            labels[y, x] = next_label
            size = 0
            edge = False
            while queue:
                cy, cx = queue.popleft()
                size += 1
                if cy == 0 or cy == H - 1 or cx == 0 or cx == W - 1:
                    edge = True
                for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < H and 0 <= nx < W and bright[ny, nx] and labels[ny, nx] == 0:
                        labels[ny, nx] = next_label
                        queue.append((ny, nx))
            sizes[next_label] = size
            touches_edge[next_label] = edge
            next_label += 1

n_components = next_label - 1
print(f"Found {n_components} bright components")

# Rank components by size
ranked = sorted(sizes.items(), key=lambda kv: -kv[1])
for lbl, sz in ranked[:8]:
    edge_str = "EDGE" if touches_edge[lbl] else "    "
    print(f"  label {lbl}: {sz:>8} px  {edge_str}")

# Step 3 — identify which components are figures vs. frame.
# The frame is a thin rounded outline that runs around the perimeter — it
# touches (or hugs) the edges of the image OR is the OUTERMOST connected
# component. The figures sit centrally.
#
# Strategy: drop any component that either touches the edge OR is the
# largest "frame-shaped" one (high perimeter relative to area).
#
# Practical heuristic for THIS logo: the outline is a thin ring, so its area
# is small relative to its bounding box. The figures are filled-ish shapes.
# But simplest robust filter: anything that touches the image edge is frame.
# Plus we drop the largest component IF it's a ring (its bbox covers >70% of
# the image area).

def bbox_of(lbl):
    ys, xs = np.where(labels == lbl)
    return ys.min(), xs.min(), ys.max(), xs.max()

keep = np.zeros((H, W), dtype=bool)
for lbl, sz in sizes.items():
    if sz < 100:               # tiny noise → drop
        continue
    if touches_edge[lbl]:      # touches image border → drop
        continue
    y0, x0, y1, x1 = bbox_of(lbl)
    bbox_w, bbox_h = x1 - x0 + 1, y1 - y0 + 1
    # Frame test: if a component's bbox covers > 60% of the icon (very large)
    # AND it has low fill ratio (it's a ring), drop it.
    bbox_area = bbox_w * bbox_h
    fill_ratio = sz / bbox_area
    bbox_relative = bbox_area / (H * W)
    is_frame = bbox_relative > 0.55 and fill_ratio < 0.40
    if is_frame:
        print(f"  → dropping frame-like component {lbl}: bbox={bbox_relative:.0%}, fill={fill_ratio:.0%}")
        continue
    keep |= (labels == lbl)

# Step 4 — build the output: keep only the figure pixels, alpha-ramp the edges
LOW, HIGH = 110.0, 180.0
alpha_soft = np.clip((lum.astype(np.float32) - LOW) / (HIGH - LOW) * 255.0, 0, 255)
alpha = np.where(keep, alpha_soft, 0).astype(np.uint8)

# Output with original colors preserved (the sage-cream of the figures)
out = arr.copy()
out[..., 3] = alpha

# Trim transparent border tightly
mark = Image.fromarray(out, "RGBA")
bbox = mark.getbbox()
if bbox:
    mark = mark.crop(bbox)
    # Add a tiny margin so anti-aliased edges aren't clipped
    margin = 12
    new = Image.new("RGBA", (mark.size[0] + 2*margin, mark.size[1] + 2*margin), (0,0,0,0))
    new.paste(mark, (margin, margin), mark)
    mark = new
print(f"Final mark size: {mark.size}")

mark.save(os.path.join(OUT_DIR, "melo-mark-figures.png"), "PNG")

# Color variants — recolor the figure pixels for use on different backgrounds
def recolor(src, rgb):
    a = np.array(src).astype(np.float32)
    a[..., 0] = rgb[0]
    a[..., 1] = rgb[1]
    a[..., 2] = rgb[2]
    return Image.fromarray(a.astype(np.uint8), "RGBA")

# Cream version (for placement on dark backgrounds)
recolor(mark, (246, 241, 231)).save(os.path.join(OUT_DIR, "melo-mark-cream.png"), "PNG")
# Moss version (for placement on light backgrounds)
recolor(mark, (38, 66, 54)).save(os.path.join(OUT_DIR, "melo-mark-moss.png"), "PNG")
# Clay version (for mom-context use)
recolor(mark, (197, 123, 87)).save(os.path.join(OUT_DIR, "melo-mark-clay.png"), "PNG")
# Sage version (for dad-context use)
recolor(mark, (122, 156, 130)).save(os.path.join(OUT_DIR, "melo-mark-sage.png"), "PNG")

print("\nGenerated:")
for f in ["melo-mark-figures.png", "melo-mark-cream.png", "melo-mark-moss.png",
          "melo-mark-clay.png", "melo-mark-sage.png"]:
    p = os.path.join(OUT_DIR, f)
    print(f"  {f}  ({os.path.getsize(p)} bytes)")
