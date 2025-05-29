import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function RoleText({ roles = [] }) {
  const roleRef = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;

    const el = roleRef.current;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    roles.forEach((role, index) => {
      const next = roles[(index + 1) % roles.length];

      tl.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onStart: () => {
          // მხოლოდ დასასრულის შემდეგ ვცვლით ტექსტს
          setCurrent(index);
        },
      })
        .set(el, {
          y: 20,
          opacity: 0,
        })
        .to(el, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onStart: () => {
            // ვცვლით ახალ ტექსტზე
            setCurrent((index + 1) % roles.length);
          },
        });
    });

    return () => tl.kill();
  }, [roles]);

  return (
    <div className="flex text-4xl font-bold items-center gap-2">
      <span>My Role:</span>
      <span ref={roleRef}>{roles[current]}</span>
    </div>
  );
}
