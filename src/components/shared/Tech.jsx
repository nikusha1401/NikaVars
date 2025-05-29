import React, { useRef } from "react";
import gsap from "gsap";

const Tech = React.memo(function Tech({ tech, width, onClick, target = "_blank" }) {
  const techRef = useRef(null);

  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    gsap.killTweensOf(techRef.current);
    gsap.to(techRef.current, { scale: 1.2, duration: 0.5, ease: "power2.out" });
  };

  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    gsap.killTweensOf(techRef.current);
    gsap.to(techRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
  };

  const techObj = typeof tech === "string" ? { name: tech } : tech;
  const { name, href } = techObj;

  const hasHref = href && typeof href === "string";
  const Wrapper = hasHref ? "a" : "div";

  const wrapperProps = {
    className: "group flex flex-col items-center cursor-pointer tech-logo",
    style: { width },
    ref: techRef,
    onPointerEnter,
    onPointerLeave,
    ...(hasHref ? { href, target, rel: "noopener noreferrer" } : {}),
    ...(onClick ? { onClick } : {}),
  };

  return (
    <Wrapper {...wrapperProps}>
      <img
        className="w-full h-full"
        src={`/assets/logos/${name}.svg`}
        alt={name}
        title={name}
        loading="lazy"
      />
      <div className="transform transition-opacity text-nowrap duration-500 opacity-0 group-hover:opacity-100">
        <span className="text-center">{name}</span>
      </div>
    </Wrapper>
  );
});

export default Tech;
