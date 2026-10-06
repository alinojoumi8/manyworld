import { useRef, useLayoutEffect } from "react";
import { cityCameraScale, normalizeCityCamera } from "../lib/cityCamera.js";
import { packCityTargets } from "../lib/cityMapTargets.js";

/** Pan the sheet on a mouse drag; touch scrolling and marker clicks retain their ordinary behavior. */
export function CityAtlasViewport({ camera, onCameraChange, disabled, children }) {
  const drag = useRef(null);
  const suppressClickUntil = useRef(0);
  const scale = cityCameraScale(camera);
  const viewport = useRef(null);
  useLayoutEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const arrange = () => {
      const bounds = element.getBoundingClientRect();
      const atlas = element.parentElement;
      const overlays = [...atlas.querySelectorAll('.civic-city__legend, .civic-city__mobile-peek, .civic-city__coordinates')]
        .map(node=>node.getBoundingClientRect()).filter(rect=>rect.width&&rect.height&&rect.top>bounds.top);
      const meta = atlas.querySelector('.civic-city__atlas-meta')?.getBoundingClientRect();
      const top = meta?.height ? Math.max(44, meta.bottom-bounds.top+8) : 44;
      const bottom = Math.min(bounds.bottom, ...overlays.map(rect=>rect.top)) - bounds.top - 8;
      const buttons = [...element.querySelectorAll('.city-atlas-plane button')];
      buttons.forEach(button => { button.style.translate = ''; });
      const targets = buttons.map(button => {
        const rect = button.getBoundingClientRect();
        return {x:rect.x+rect.width/2-bounds.x, y:rect.y+rect.height/2-bounds.y,
          width:rect.width*1.3, height:rect.height*1.3};
      });
      // Leave off-screen markers off-screen when the observer pans the map.
      const visible = buttons.map((button,i)=>({button,target:targets[i]}))
        .filter(({target})=>target.x>=0&&target.x<=bounds.width&&target.y>=0&&target.y<=bounds.height);
      const offsets = packCityTargets(visible.map(row=>({...row.target,y:row.target.y-top})), bounds.width, Math.max(28,bottom-top));
      visible.forEach(({button},i)=>{button.style.translate=`${offsets[i].dx/scale}px ${offsets[i].dy/scale}px`;});
    };
    arrange();
    const observer = new ResizeObserver(arrange);
    observer.observe(element);
    element.parentElement.querySelectorAll('.civic-city__legend, .civic-city__mobile-peek').forEach(node=>observer.observe(node));
    return () => observer.disconnect();
  }, [children, camera.x, camera.y, scale]);
  return <div className="city-atlas-viewport" data-testid="city-atlas-viewport"
    ref={viewport}
    data-camera={`${camera.x},${camera.y},${camera.zoom}`}
    onPointerDown={event => {
      if (disabled || event.button !== 0 || event.pointerType === "touch" || event.target.closest("button")) return;
      const rect = event.currentTarget.getBoundingClientRect();
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY,
        camera, width: rect.width, height: rect.height, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={event => {
      const start = drag.current;
      if (!start || start.id !== event.pointerId) return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (!start.moved && Math.hypot(dx, dy) < 4) return;
      const next = normalizeCityCamera({ ...start.camera,
        x: start.camera.x - dx / start.width / cityCameraScale(start.camera) * 100,
        y: start.camera.y - dy / start.height / cityCameraScale(start.camera) * 100 });
      onCameraChange(next, { replace: start.moved });
      start.moved = true;
    }}
    onPointerUp={event => {
      if (drag.current?.moved) suppressClickUntil.current = performance.now() + 250;
      drag.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }}
    onPointerCancel={() => { drag.current = null; }}
    onLostPointerCapture={() => { drag.current = null; }}
    onClickCapture={event => {
      if (performance.now() < suppressClickUntil.current) { event.stopPropagation(); event.preventDefault(); }
    }}>
    <div className="city-atlas-plane" style={{
      "--city-camera-inverse": 1 / scale,
      transform: `translate(${50 - camera.x * scale}%, ${50 - camera.y * scale}%) scale(${scale})`,
    }}>{children}</div>
  </div>;
}
