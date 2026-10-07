// Display-only packing. Canonical map coordinates and evidence stay untouched.
export function packCityTargets(targets, width, height) {
  const placed = [];
  const offsets = targets.map(()=>({dx:0,dy:0}));
  let crowded = false;
  const ordered = targets.map((target,index)=>({target,index})).sort((a,b)=>b.target.width-a.target.width||a.index-b.index);
  ordered.forEach(({target,index}) => {
    if (crowded) return;
    const w = Math.max(28, target.width), h = Math.max(28, target.height);
    const fits = (x, y) => placed.every(p =>
      Math.abs(p.x - x) >= (p.width + w) / 2 + 4 || Math.abs(p.y - y) >= (p.height + h) / 2 + 4);
    let best = null;
    for (let radius = 0; radius <= Math.min(96, Math.hypot(width, height)) && !best; radius += 12) {
      const steps = radius ? Math.ceil(2 * Math.PI * radius / 12) : 1;
      for (let i = 0; i < steps; i++) {
        const angle = i * 2 * Math.PI / steps;
        const x = Math.max(w / 2 + 2, Math.min(width - w / 2 - 2, target.x + radius * Math.cos(angle)));
        const y = Math.max(h / 2 + 2, Math.min(height - h / 2 - 2, target.y + radius * Math.sin(angle)));
        if (fits(x, y)) { best = {x, y, width:w, height:h}; break; }
      }
    }
    // At extreme density the keyboard explorer remains available. Do not
    // silently drop an object or pretend it moved in the scientific world.
    if (!best) crowded = true;
    best ||= {x:target.x, y:target.y, width:w, height:h};
    placed.push(best);
    offsets[index] = {dx:best.x-target.x, dy:best.y-target.y};
  });
  if (crowded) {
    // A shelf layout avoids fragmentation when a large cohort shares one
    // anchor. Apply it only if the entire cohort fits; otherwise retain anchors.
    let x=2, y=2, rowHeight=0;
    const shelf = new Array(targets.length);
    for (const {target,index} of ordered) {
      const w=Math.max(28,target.width), h=Math.max(28,target.height);
      if (x+w>width-2) {x=2;y+=rowHeight+4;rowHeight=0;}
      if (w>width-4||y+h>height-2) return offsets;
      shelf[index]={dx:x+w/2-target.x,dy:y+h/2-target.y};
      x+=w+4;rowHeight=Math.max(rowHeight,h);
    }
    return shelf;
  }
  return offsets;
}
