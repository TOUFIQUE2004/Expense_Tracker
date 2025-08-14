const Footer = () => {
  return (
      <footer
          className="w-full py-4 text-center"
          style={{
            backgroundColor: "var(--color-footer-bg)", // from global.css
            color: "var(--color-footer-text)",         // from global.css
          }}
      >
        <p className="text-sm">
          Created by{" "}
          <span
              className="font-semibold"
              style={{ color: "var(--color-footer-text-light)" }}
          >
          MD TOUFIQUE SHEIKH
        </span>
        </p>
      </footer>
  );
};

export default Footer;
