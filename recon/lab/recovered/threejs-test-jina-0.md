Title: ThreeJs Scene :: Lab :: Carter Ogunsola

URL Source: https://carterogunsola.com/lab/threejs-test

Markdown Content:
UT::11:52MDT FPS::52 ONLINE::67 LCP::1.7s CARTER::HERE PRESENCE::ON LISTENING::Booking::Q1’27

[C Motion](https://carterogunsola.com/)::ThreeJs Scene

*   [A b o u t](https://carterogunsola.com/about)
*   [L a b](https://carterogunsola.com/lab)
*   [W r i t i n g](https://carterogunsola.com/writing)
*   [S t u d i o](https://carterogunsola.com/studio)
*   [C o n t a c t](https://carterogunsola.com/contact)

⌘K

# ThreeJs Scene — Lab experiment

Notes Code

3D

A vanilla Three.js scene, pared to the basis: a renderer on a canvas, a camera, orbit controls, a render loop. On the stage, a loaded glTF model or a superformula that morphs between four shapes, each drawn as surface, mesh or vertices, in one of four finishes baked from a lit sphere.

Dependencies

[three.js r0.185 :: renderer, GLTFLoader, OrbitControls](https://threejs.org/)

## A model in a room you can turn

Drag anywhere and the model swings around; let go and it keeps drifting on its own. It’s floating in a plain monochrome studio with no visible lights, just a model catching a soft key from the upper left. Nothing here is doing much, and that’s the point. This is the smallest honest Three.js scene, the one you’d start any project from, with a little interaction bolted on so it isn’t a still life.

## The parts every scene needs

Strip a Three.js scene to its frame and it’s always the same short list, and this experiment is just those parts wired together:

*   a **renderer** that owns a `<canvas>` (here transparent, so the stage shows through), pixel ratio capped at 2 so retina screens don’t render 4× the pixels;
*   a **scene** to hold things and a **camera** to look through;
*   a **light**, or in our case a matcap standing in for one (more below);
*   a **loader** that pulls a `.glb` off a CDN and drops it in;
*   **controls** so you can orbit;
*   a **loop** that reads the controls and re-renders each frame.

The load does one extra courtesy: it measures the model’s bounding box, scales the longest side to a fixed size, and recenters it on the origin, so any model you point it at arrives framed instead of tiny or off in a corner.

## The same geometry, three ways

The Shaded / Wire / Points switch draws one geometry three different ways, which is the quickest way to see what a loaded model actually is:

*   **Shaded** is the surface, lit by the matcap.
*   **Wire** is a `MeshBasicMaterial` with `wireframe: true`, so you see the triangles the surface is built from.
*   **Points** is a `THREE.Points` cloud sampled evenly across that surface (via `MeshSurfaceSampler`), so it stays dense even on the big flat faces where the raw vertices are miles apart.

## One equation, four shapes

The subject switch is where this stops being a loader demo. Lantern is the model. The other four are the same eleven lines of math with different numbers in them: Gielis’s superformula, a superellipse swept around another superellipse. Feed it `m=4, n=2` and you get a sphere. Push `n1` under 1 and the lobes pinch into a star. Split the two rings apart and you get a vessel.

Each shape is sampled on a 120 by 72 grid, which is 8,833 vertices, coarse enough that Wire reads as a mesh instead of a gray wash, fine enough that Shaded has no facets. The radius goes to infinity wherever a lobe pinches to nothing, so it is clamped at 6 before it can blow the bounding box apart, and every subject is normalized to the same size on the way out. A morph between two shapes of different scale reads as a zoom, not a change of shape.

One hack worth naming: where the lobe count is not a multiple of four the radius at `-PI` and `+PI` genuinely differ, which leaves a crack down one side. The last column of the grid is copied from the first to close it. That trades a hair of asymmetry for a watertight surface, and nobody has ever spotted the asymmetry.

## The morph, and the swap it can’t do

Because every shape rides the _same_ grid, with the same vertex count and the same winding, a switch is a lerp: hold the shape you left in one buffer, the shape you asked for in another, and walk the position attribute between them over 0.9s on an expo.out curve. The mesh, the wireframe and the point cloud share that one buffer, so all three morph at once, whichever is on screen.

Normals are recomputed every frame of the morph. That’s the expensive part, and it is unavoidable: the surface really is new each frame, and a matcap reads normals. At this vertex count it costs about a millisecond, which is fine for the second it lasts. The bounding sphere gets recomputed with them, or the frustum cull clips a shape that just grew.

The model is the exception. A lantern has nothing in common with an equation, vertex for vertex, so there is no honest morph between them. Instead the outgoing subject scales down to a point over 0.35s and the incoming one blooms out of it.

## Four finishes, baked at boot

A matcap is a photograph of a lit sphere, sampled by view-space normal. One 256px image carries a whole light rig, and the price is that the light never moves with the camera. So rather than download one, take the photograph: at boot a unit sphere sits in a unit ortho frustum under `RoomEnvironment` and two lights, gets rendered once into a 256px target, and that target is the matcap. It behaves exactly like a downloaded one.

Two things come free. Roughness and metalness become dials instead of pixels, so Polish can re-bake the finish in a frame. And the finishes are ours. The big public matcap libraries on GitHub carry no license file at all.

*   **Studio** is the default: roughness 0.52, no metal, the key up and to the left.
*   **Chrome** is roughness 0.06 at full metal, so the room does the work.
*   **Wax** is roughness 0.95 with sheen, which kills every highlight.
*   **Ink** paints the sphere near-black at roughness 0.22, so the body goes dark and the edge stays bright. On the spiked shapes it is the best of the four.

The bake writes into a render target whose texture is tagged sRGB. Miss that and the matcap comes back linear, which reads as a flat, muddy gray, and it takes a while to work out why.

## Monochrome on purpose

The model ships with full PBR materials, and we throw them away. Every mesh gets its material replaced with a `MeshMatcapMaterial` reading a small grayscale sphere drawn on a 2D canvas, so the whole thing renders in soft monochrome with no light rig at all and stays on brand no matter what the source textures were. It’s also the cheapest possible shading. Want the real thing back? Delete the override and give the meshes a `MeshStandardMaterial` under an environment map, and the model’s own materials return.

## Make it yours

*   **`MODEL`** — the glTF URL. Any single-file `.glb` on a CORS-friendly host drops straight in; the fit-to-box handles the rest.
*   **Accent** — defaults to `--ink`. The wireframe and the point cloud take it as their ink, and the shaded pass multiplies its matcap by it, so one swatch recolors all three modes.
*   **`FINISHES`** — a row per finish: a label plus the sphere’s material. Add a row and it joins the switch; there is no texture to ship.
*   **Polish** — shifts the loaded finish, rougher below 0 and smoother and more metallic above it. Each nudge re-bakes the sphere, which costs one frame.
*   **`SUBJECTS`** — one row per subject: a label, and the eight superformula numbers (or `null` for the loaded model). Add a row and it appears in the switch.
*   **`SEG_U` / `SEG_V`** — the sampling grid, 120 by 72. Raising it smooths Shaded and turns Wire into a wash; every subject shares it, which is what makes the morph possible.
*   **Lobes** — adds to the loaded subject’s own lobe count, live in the config panel, neutral at 0. It holds across a switch, so a shape you dial in survives the next subject.
*   **Sharp** — scales the two exponents that decide how hard each lob
