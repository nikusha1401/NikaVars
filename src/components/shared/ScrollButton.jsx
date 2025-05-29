import { useScrollSmoother } from "../../contexts/ScrollSmootherContext"

export default function ScrollButton({ text, buttonClass, idSelector}) {
    const smoother = useScrollSmoother();

    return (
        <button
            className={buttonClass}
            onClick={() => smoother?.scrollTo(idSelector, true, "top")}
        >
            {text}
        </button>
    )
}