import React, { useRef } from "react";
import gsap from "gsap";

const Tech = React.memo(function Tech({
  tech,
  width,
  onClick,
  target = "_blank",
}) {
  const ref = useRef(null);

  const handlePointer = (scale) => (e) => {
    if (e.pointerType !== "mouse") return;
    gsap.killTweensOf(ref.current);
    gsap.to(ref.current, { scale, duration: 0.5, ease: "power2.out" });
  };

  const { name, href } = typeof tech === "string" ? { name: tech } : tech || {};
  const isLink = href && typeof href === "string";

  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      ref={ref}
      className="group flex flex-col items-center cursor-pointer tech-logo"
      style={{ width }}
      onPointerEnter={handlePointer(1.2)}
      onPointerLeave={handlePointer(1)}
      {...(isLink ? { href, target, rel: "noopener noreferrer" } : {})}
      {...(onClick && { onClick })}
    >
      <img
        className="w-full h-full"
        src={`/assets/logos/${name}.svg`}
        alt={name}
        title={name}
      />
      <div className="transform transition-opacity duration-500 opacity-0 group-hover:opacity-100 text-nowrap">
        <span className="text-center">{name}</span>
      </div>
    </Wrapper>
  );
});

export default Tech;
