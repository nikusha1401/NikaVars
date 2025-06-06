import { useScrollSmoother } from "../../contexts/ScrollSmootherContext";

export default function ScrollButton({
  text,
  buttonClass,
  idSelector,
  ref,
  onMouseEnter,
  onMouseLeave,
  onScroll,
}) {
  const smoother = useScrollSmoother();

  const handleClick = () => {
    onScroll?.();
    smoother?.scrollTo(idSelector, true, "top");
  };

  return (
    <button
      ref={ref}
      className={buttonClass}
      onClick={handleClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {text}
    </button>
  );
}
