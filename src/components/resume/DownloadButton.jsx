export default function DownloadButton() {
  return (
    <div className="rounded-full m-auto mt-6 bg-gradient-to-r w-50 from-purple-600 to-indigo-900 pl-5 pr-1.5 py-0.5 transition-transform duration-300 hover:scale-105">
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