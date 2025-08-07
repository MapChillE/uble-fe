"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
function Card(_a) {
  var title = _a.title,
    children = _a.children,
    href = _a.href;
  return (
    <a
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
      href={"".concat(
        href,
        '?utm_source=create-turbo&utm_medium=with-tailwind&utm_campaign=create-turbo"'
      )}
      rel="noopener noreferrer"
      target="_blank"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{children}</p>
    </a>
  );
}
