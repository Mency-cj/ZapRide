import {
  FiArrowRight,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiTwitter,
} from "react-icons/fi";

export default function Footer() {
  return (
    <>
      <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ZapRide
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Your Ride Just a Zap Away.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="p-2 rounded-xl border border-white bg-black text-white dark:border-white hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <FiFacebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="p-2 rounded-xl border border-gray-300  bg-black  text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <FiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="p-2 rounded-xl border border-gray-300  bg-black  text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="p-2 rounded-xl border border-gray-300  bg-black  text-white dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <FiTwitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    className="hover:text-gray-900 dark:hover:text-white"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-gray-900 dark:hover:text-white"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-gray-900 dark:hover:text-white"
                    href="#"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-gray-900 dark:hover:text-white"
                    href="#"
                  >
                    Drive & Earn
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-gray-900 dark:hover:text-white"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase">
                Contact
              </h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <FiPhone className="h-4 w-4" /> <span>+91-XXXXXXXXXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <FiMail className="h-4 w-4" />
                  <span>support@zapride.com</span>
                </li>
              </ul>
              <div className="mt-5">
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-stretch rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden"
                >
                  <input
                    type="email"
                    placeholder="Get updates in your inbox"
                    className="w-full bg-transparent px-3 py-2 text-sm outline-none"
                  />
                  <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                    Subscribe <FiArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
            <p>© 2025 ZapRide. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-gray-700 dark:hover:text-gray-200"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
