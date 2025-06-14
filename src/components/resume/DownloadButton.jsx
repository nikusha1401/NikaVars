import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function DownloadButton() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "none", 
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", 
        once: true,
      },
    });
  }, []);

    const handlePointer = (scale) => (e) => {
    if (e.pointerType !== "mouse") return;
    gsap.killTweensOf(containerRef.current);
    gsap.to(containerRef.current, { scale, duration: 0.8, ease: "power2.out" });
  };

  return (
    <div
      ref={containerRef}
      className="rounded-full m-auto mt-6 bg-gradient-to-r w-50 from-purple-600 to-indigo-900 pl-5 pr-1.5 py-0.5"
         onPointerEnter={handlePointer(1.05)}
      onPointerLeave={handlePointer(1)}
    >
      <a
        href="/assets/nika-varsimashvili-resume.pdf"
        download
        className="flex flex-row items-center justify-between w-full"
      >
        <span className="relative z-10 text-lg font-bold text-white">
          Download CV
        </span>
        <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-800 p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white animate-bounce-smooth"
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
          >
            <path d="M10 3a1 1 0 011 1v8.586l2.293-2.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586V4a1 1 0 011-1z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
