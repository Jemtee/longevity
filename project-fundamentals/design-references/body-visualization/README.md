# Body Visualization Design References

This folder contains inspiration images for the 3D body visualization component.

## Key Inspiration Sources

### Neko Health (https://nekohealth.com/)
Swedish health scanning company with premium, minimal Scandinavian design:
- Clean white/cream backgrounds with subtle gradients
- Body scanning visualizations with clinical precision
- Warm, approachable health tech aesthetic
- Premium feel without being cold
- Subtle animations and transitions

### Superpower (https://superpower.com/)
Health optimization platform:
- Dark mode with vibrant accent colors
- Data-rich dashboards with clear hierarchy
- Body/health visualizations
- Modern, tech-forward design language
- Clean typography and generous whitespace

---

## Target Aesthetic

Based on the reference images, the desired look includes:

### Visual Style
1. **Polygon/Low-poly mesh** - Visible triangular faces forming body surface
2. **Glowing wireframe lines** - Cyan/blue color (#00d4ff to #0066ff)
3. **Vertex highlights** - Bright points at mesh intersections
4. **Inner glow/subsurface** - Semi-transparent fill showing depth
5. **Dark background** - Deep blue/black (#050510 to #0a1628)
6. **Ground reflection/glow** - Subtle light pool beneath feet

### Color Palette
- Primary: `#00d4ff` (cyan)
- Secondary: `#0066ff` (blue)
- Highlights: `#ffffff` (white vertices)
- Background: `#050510` to `#0a1628`
- Glow: `#00ffff` with additive blending

### Effects
- Subtle breathing animation
- Pulsing glow intensity
- Ambient floating particles
- Vignette overlay
- Optional: scan lines, data streams

### Variations Noted
- Some references show internal anatomy (organs, skeleton, circulatory)
- Some show pure wireframe, others have solid fill
- Density of mesh varies (sparse vs dense grid)
- Some include motion blur / energy trails

## Reference Images

Save inspiration images to this folder:
- `ref-01-polygon-body.png`
- `ref-02-wireframe-anatomy.png`
- `ref-03-grid-body.png`
- `ref-04-low-poly-mesh.png`
- `ref-05-body-scan.png`
- `ref-06-particle-body.png`
- `ref-07-glowing-figure.png`
- `ref-08-detailed-wireframe.png`

## Implementation Notes

Current implementation uses:
- GLTF model from Sketchfab (21k vertices)
- React Three Fiber for rendering
- Wireframe + edges + vertex points layers
- Additive blending for glow effects

Future enhancements:
- Post-processing bloom effect
- Custom shader for edge glow
- Animated vertex pulsing
- Layer switching (organs, skeleton, etc.)
