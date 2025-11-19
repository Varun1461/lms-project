import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
<footer className="w-full bg-black/40 backdrop-blur-md text-white py-4 px-6 sm:px-14 flex flex-col sm:flex-row items-center justify-between fixed bottom-0 left-0">
      {/* Copyright Section */}
      <section className="text-sm text-center sm:text-left">
        © {currentYear} | All rights reserved
      </section>

      {/* Social Media Icons */}
      <section className="flex items-center gap-4">
        <div className="group">
          <a
            href="#"
            aria-label="Facebook"
            className="text-white transition-all group-hover:text-blue-500 group-hover:scale-110"
          >
            <BsFacebook size={16} />
          </a>
        </div>

        <div className="group">
          <a
            href="https://www.instagram.com/varun_494_"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white transition-all group-hover:text-pink-500 group-hover:scale-110"
          >
            <BsInstagram size={16} />
          </a>
        </div>

        <div className="group">
          <a
            href="https://www.linkedin.com/in/varun-waman-3379b4259"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white transition-all group-hover:text-blue-600 group-hover:scale-110"
          >
            <BsLinkedin size={16} />
          </a>
        </div>

        <div className="group">
          <a
            href="#"
            aria-label="Twitter"
            className="text-white transition-all group-hover:text-blue-400 group-hover:scale-110"
          >
            <BsTwitter size={16} />
          </a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
