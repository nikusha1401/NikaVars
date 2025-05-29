export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <div className="flex flex-row gap-5 justify-center p-3 bg-black text-sm font-bold">
                <span>Created By NikaVars</span>
                 <span>&copy; {currentYear}  All Rights Reserved</span>
            </div>
        </footer>
    )
}