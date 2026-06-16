import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Background.css";

// ------------------- useMediaQuery (unchanged) -------------------
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") return window.matchMedia(query).matches;
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
};

// ------------------- Responsive droplet generator -------------------
const generateDropletsForWidth = (width) => {
  // Determine total droplets and size distribution based on screen width
  let largeCount, mediumCount, smallCount;

  if (width <= 374) {
    largeCount = 2;
    mediumCount = 3;
    smallCount = 4;
  } else if (width <= 424) {
    largeCount = 2;
    mediumCount = 4;
    smallCount = 6;
  } else if (width <= 767) {
    largeCount = 3;
    mediumCount = 5;
    smallCount = 8;
  } else if (width <= 1023) {
    largeCount = 3;
    mediumCount = 7;
    smallCount = 10;
  } else if (width <= 1439) {
    largeCount = 4;
    mediumCount = 8;
    smallCount = 12;
  } else if (width <= 1919) {
    largeCount = 4;
    mediumCount = 10;
    smallCount = 14;
  } else {
    largeCount = 5;
    mediumCount = 12;
    smallCount = 15;
  }

  // Size ranges in vw (% of viewport width)
  const largeSize = (min, max) =>
    Math.floor((Math.random() * (max - min) + min) * width) / 100;
  const mediumSize = (min, max) =>
    Math.floor((Math.random() * (max - min) + min) * width) / 100;
  const smallSize = (min, max) =>
    Math.floor((Math.random() * (max - min) + min) * width) / 100;

  const droplets = [];
  let id = 1;

  const addDrops = (count, sizeFn) => {
    for (let i = 0; i < count; i++) {
      droplets.push({
        id: id++,
        top: "0%", // will be set after placement
        left: "0%",
        size: sizeFn(),
        rot: Math.floor(Math.random() * 30 - 15),
        blur: Math.random() * 0.2,
      });
    }
  };

  // Generate droplets with size classes
  addDrops(largeCount, () => largeSize(5, 7));
  addDrops(mediumCount, () => mediumSize(2.5, 4.5));
  addDrops(smallCount, () => smallSize(1, 2));

  // Randomise order so sizes are mixed
  droplets.sort(() => Math.random() - 0.5);
  // Reassign ids after shuffling to keep them sequential
  droplets.forEach((d, idx) => (d.id = idx + 1));

  // ---- Collision‑free placement (using pixel centres) ----
  const placed = [];
  const viewW = width;
  const viewH = (width * 9) / 16; // assume 16:9 aspect ratio for placement
  const getPixelCenter = (drop) => ({
    x: (parseFloat(drop.left) / 100) * viewW,
    y: (parseFloat(drop.top) / 100) * viewH,
  });

  const maxAttempts = 60;
  for (const drop of droplets) {
    let placedSuccess = false;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const top = Math.floor(Math.random() * 88) + 6; // 6‑94% to keep away from edges
      const left = Math.floor(Math.random() * 88) + 6;
      drop.top = `${top}%`;
      drop.left = `${left}%`;

      const cCenter = getPixelCenter(drop);
      const cRadius = drop.size / 2;
      let overlap = false;
      for (const p of placed) {
        const pCenter = getPixelCenter(p);
        const pRadius = p.size / 2;
        const dist = Math.hypot(cCenter.x - pCenter.x, cCenter.y - pCenter.y);
        if (dist < (cRadius + pRadius) * 0.8) {
          overlap = true;
          break;
        }
      }
      if (!overlap) {
        placed.push(drop);
        placedSuccess = true;
        break;
      }
    }
    // If still not placed, force a random spot (rare)
    if (!placedSuccess) {
      drop.top = `${Math.floor(Math.random() * 88) + 6}%`;
      drop.left = `${Math.floor(Math.random() * 88) + 6}%`;
      placed.push(drop);
    }
  }

  return placed;
};

// ------------------- Merge helpers -------------------
const MAX_DROP_SIZE = (width) => width * 0.08; // 8% of viewport width
const MERGE_DISTANCE_FACTOR = 0.85;

const mergeSize = (size1, size2, maxSize) => {
  const area1 = Math.PI * Math.pow(size1 / 2, 2);
  const area2 = Math.PI * Math.pow(size2 / 2, 2);
  const totalArea = area1 + area2;
  const newRadius = Math.sqrt(totalArea / Math.PI);
  return Math.min(Math.round(newRadius * 2), maxSize);
};

// ------------------- Component -------------------
const Background = () => {
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  // Generate responsive droplets once on mount
  const [droplets, setDroplets] = useState(() => {
    if (typeof window === "undefined") return [];
    const width = window.innerWidth;
    return generateDropletsForWidth(width).map((d) => ({
      ...d,
      px: (parseFloat(d.left) / 100) * width,
      py: (parseFloat(d.top) / 100) * ((width * 9) / 16), // height based on 16:9 ratio
      mergingOut: false,
    }));
  });

  const containerRef = useRef(null);
  const dragState = useRef({
    draggingId: null,
    offsetX: 0,
    offsetY: 0,
  });

  // Clean up merged-out droplets
  useEffect(() => {
    const timer = setInterval(() => {
      setDroplets((prev) => prev.filter((d) => !d.mergingOut));
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const currentMaxSize =
    typeof window !== "undefined" ? MAX_DROP_SIZE(window.innerWidth) : 200;

  // ----- Pointer handlers (only active on desktop) -----
  const handlePointerDown = useCallback(
    (e, dropId) => {
      if (!isDesktop) return;
      e.stopPropagation();
      const drop = droplets.find((d) => d.id === dropId);
      if (!drop || drop.mergingOut) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      dragState.current = {
        draggingId: dropId,
        offsetX: clientX - drop.px,
        offsetY: clientY - drop.py,
      };

      containerRef.current.setPointerCapture(e.pointerId);
    },
    [droplets, isDesktop],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDesktop) return;
      const { draggingId, offsetX, offsetY } = dragState.current;
      if (draggingId === null) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const newPx = clientX - offsetX;
      const newPy = clientY - offsetY;

      setDroplets((prev) => {
        const dragged = prev.find((d) => d.id === draggingId);
        if (!dragged) return prev;

        const updated = prev.map((drop) => {
          if (drop.id === draggingId || drop.mergingOut) return drop;
          const dx = newPx - drop.px;
          const dy = newPy - drop.py;
          const dist = Math.hypot(dx, dy);
          const minDist =
            ((dragged.size + drop.size) / 2) * MERGE_DISTANCE_FACTOR;
          if (dist < minDist) {
            // Merge instantly
            const newSize = mergeSize(dragged.size, drop.size, currentMaxSize);
            dragged.size = newSize;
            drop.mergingOut = true;
          }
          return drop;
        });

        return updated.map((drop) =>
          drop.id === draggingId ? { ...drop, px: newPx, py: newPy } : drop,
        );
      });
    },
    [isDesktop, currentMaxSize],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDesktop) return;
    dragState.current.draggingId = null;
  }, [isDesktop]);

  return (
    <div
      ref={containerRef}
      className="background-container"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{ touchAction: isDesktop ? "none" : "auto" }}
    >
      <div className="bg-orb top-orb" />
      <div className="bg-orb bottom-orb" />
      <div className="bg-noise" />

      <AnimatePresence>
        {droplets.map((drop) => {
          const isSmall = drop.size < 20;
          return (
            <motion.div
              key={drop.id}
              className={`water-droplet-3d ${isDesktop ? "interactive" : ""}`}
              style={{
                left: drop.px - drop.size / 2,
                top: drop.py - drop.size / 2,
                width: drop.size,
                height: drop.size * (isSmall ? 0.88 : 0.96),
                opacity: isSmall ? 0.72 : 1,
                filter: `blur(${drop.blur}px)`,
                pointerEvents: isDesktop ? "auto" : "none",
              }}
              onPointerDown={(e) => handlePointerDown(e, drop.id)}
              initial={drop.mergingOut ? { scale: 1, opacity: 1 } : false}
              animate={
                drop.mergingOut
                  ? { scale: 0, opacity: 0, transition: { duration: 0.25 } }
                  : { scale: 1, opacity: 1 }
              }
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
              whileHover={isDesktop ? { scale: 1.06 } : {}}
              whileTap={isDesktop ? { cursor: "grabbing" } : {}}
            >
              <div className="drop-core" />
              <div className="drop-rim" />
              <div className="drop-highlight drop-highlight-1" />
              <div className="drop-highlight drop-highlight-2" />
              <div className="drop-caustic" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Background;
