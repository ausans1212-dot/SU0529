export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-neutral-900 mt-12 py-12 px-6 flex flex-col items-center justify-center text-neutral-500 font-sans text-xs md:text-sm">
      <p>&copy; {new Date().getFullYear()} MOMO SU. All rights reserved.</p>
    </footer>
  );
}
