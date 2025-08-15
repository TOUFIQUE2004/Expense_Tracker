const Footer = () => {
    return (
        <footer
            className="w-full py-6 text-center md:text-left"
            style={{
                backgroundColor: "var(--color-footer-bg)",
                color: "var(--color-footer-text)",
            }}
        >
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Expense Tracker. Created by{" "}
                    <span
                        className="font-semibold"
                        style={{ color: "var(--color-footer-text-light)" }}
                    >
            MD TOUFIQUE SHEIKH
          </span>
                    . All rights reserved.
                </p>
                <nav className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                    <a
                        href="https://github.com/TOUFIQUE2004/Expense_Tracker"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link hover:text-[var(--color-footer-text-light)] transition-colors"
                    >
                        GitHub
                    </a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;