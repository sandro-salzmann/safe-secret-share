export const Header = () => {
  return (
    <nav className="flex justify-between">
      <h1 className="p-6 text-xl font-bold text-emerald-800">
        <a href="/">Encrypted Password Share</a>
      </h1>
      <h1 className="p-6 text-xl font-light text-purple-800">
        <a
          href={import.meta.env.VITE_GITHUB_REPO_URL}
          className="flex items-center gap-1.5"
        >
          Open Source
          <span className="material-symbols-rounded light">code</span>
        </a>
      </h1>
    </nav>
  );
};
