import { care } from "@/content/home";

/** Seção 6 — Como posso ajudar. O 3D recua e vira apoio visual. */
export function Care() {
  return (
    <section
      id="tratamentos"
      data-scene={care.scene}
      aria-labelledby="care-title"
      className="relative py-28 md:py-36"
    >
      <div className="container-x">
        <div data-reveal className="max-w-[36rem]">
          <p data-reveal-item className="eyebrow tick text-accent">
            {care.eyebrow}
          </p>
          <h2 id="care-title" data-reveal-item className="display mt-6 text-balance text-[clamp(2rem,4.4vw,3.75rem)] text-white">
            {care.title}
          </h2>
          <p data-reveal-item className="mt-6 text-lg leading-relaxed text-on-dark text-pretty">
            {care.lead}
          </p>
        </div>

        <ol
          data-reveal
          className="mt-14 max-w-[44rem] rounded-[1.6rem] border border-white/10 bg-navy-900/70 px-6 backdrop-blur-xl sm:px-8 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
        >
          {care.items.map((item, i) => (
            <li
              data-reveal-item
              key={item.title}
              className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-white/10 py-7 last:border-b-0 sm:grid-cols-[4.5rem_1fr] lg:py-8 lg:last:border-b"
            >
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="grid gap-2 md:grid-cols-[14rem_1fr] md:gap-8">
                <h3 className="font-display text-lg font-semibold tracking-tight text-white md:text-xl">{item.title}</h3>
                <p className="leading-relaxed text-on-dark">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
