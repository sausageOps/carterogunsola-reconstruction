  const size = () => {548      const w = wrap.clientWidth;549      const h = wrap.clientHeight;550      if (!w || !h) return;551      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));552      renderer.setSize(w, h, false);553      camera.aspect = w / h;554      camera.updateProjectionMatrix();555      sync();556      if (reduced) render();557    };558    const ro = new ResizeObserver(size);559    ro.observe(wrap);560    size();561    const inkColor = () => {562      const c = accentHex ?? ink;563      wireMat.color.set(c);564      pointsMat.color.set(c);565      shadedMat.color.set(accentHex ?? 16777215);566    };567    inkColor();568    const themeObs = new MutationObserver(() => {569      resolveInk();570      inkColor();571      if (reduced) render();572    });573    themeObs.observe(document.documentElement, {574      attributes: true,575      attributeFilter: ["data-theme", "class"]576    });577    segs.forEach(578      (s) => s.addEventListener("click", () => applyMode(s.dataset.mode), { signal })579    );580    subjectSegs.forEach(581      (s) => s.addEventListener("click", () => applySubject(s.dataset.subject), { signal })582    );583    sync();584    if (reduced) {585      controls.addEventListener("change", render);586    } else {587      let last = performance.now();588      const loop = (now) => {589        raf = requestAnimationFrame(loop);590        const dt = Math.min(0.1, (now - last) / 1e3);591        last = now;592        tick(dt);593        controls.update();594        render();595      };596      raf = requestAnimationFrame(loop);597    }598    const set = (key, value) => {599      if (key === "spin") {600        P.spin = Number(value);601        controls.autoRotateSpeed = P.spin;602      } else if (key === "pointSize") {603        P.pointSize = Number(value);604        pointsMat.size = P.pointSize;605      } else if (key === "finish") {606        finish = String(value);607        bakeFinish();608      } else if (key === "polish") {609        polish = Number(value);610        bakeFinish();611      } else if (key === "lobes" || key === "sharp") {612        dials[key] = Number(value);613        const sf = SUBJECTS.find((x) => x.id === subject)?.sf;614        if (sf) morphTo(resolve(sf), 0.35);615      } else if (key === "accent") {616        accentHex = String(value).startsWith("var(") ? null : String(value);617        inkColor();618      }619      if (reduced) render();620    };621    const destroy = () => {622      disposed = true;623      ac.abort();624      cancelAnimationFrame(raf);625      ro.disconnect();626      themeObs.disconnect();627      controls.dispose();628      geoms.forEach((g) => g.dispose());629      sfGeo.dispose();630      sampledGeoms.forEach((g) => g.dispose());631      shadedMat.dispose();632      wireMat.dispose();633      pointsMat.dispose();634      baker.dispose();635      renderer.dispose();636      renderer.forceContextLoss();637      renderer.domElement.remove();638      wrap.remove();639    };640    return { destroy, set };641  }642};643experiment.mount(document.querySelector(".stage"));
```

![Image 1](https://assets.carterogunsola.com/cdn-cgi/image/width=720,quality=86,format=auto/lab/threejs-test/poster.jpg)

ThreeJs Scene

3D
Experiment coming soon Loading experiment

Loading model

Lantern Orb Bloom Shell Spike

Shaded Wire Points

[Previous experiment: Heart](https://carterogunsola.com/lab/heart)[0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 / 09](https://carterogunsola.com/lab "Back to Lab")[Next experiment: Dynamic Scrollbar](https://carterogunsola.com/lab/dynamic-scrollbar)

Tune Reset

+Copy

(remainder = shared chrome — fetched 2026-10-29 via r.jina.ai)
