import gsap from "gsap";
import { useRef } from "react";
import { Transition } from "react-transition-group";

export default function Overlay({ active }) {
  const nodeRef = useRef(null);

    const onEnter = () => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
    );
  };

  const onExit = () => {
    gsap.fromTo(
      nodeRef.current,
      { opacity: 1, scale: 1 },
      { opacity: 0, duration: 0.1, ease: "power2.out" }
    );
  };

  return (
    <Transition
      nodeRef={nodeRef}
      onEnter={onEnter}
      onExit={onExit}
      timeout={100}
      in={active}
      mountOnEnter
      unmountOnExit
      
    >
      <div ref={nodeRef} className="overlay-texture"></div>
    </Transition>
  );
}
