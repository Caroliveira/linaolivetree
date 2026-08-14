import { SwatchGroup } from './SwatchGroup';
import { GuidanceList } from './GuidanceList';
import {
  palette,
  principles,
  avoid,
  imagery,
  voices,
  productPillars,
} from './BrandContent.utils';

export const BrandContent = () => {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        <section className="relative overflow-hidden rounded-7xl border border-olive/10 bg-white px-8 py-12 shadow-xl md:px-14 md:py-16">
          <div className="absolute inset-0 grid-paper opacity-30" />
          <div className="absolute -right-16 top-0 h-56 w-56 rounded-full bg-terracotta/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-olive/10 blur-3xl" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex rounded-full bg-terracotta/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                Internal Brand Reference
              </div>
              <div className="space-y-4">
                <h1 className="max-w-4xl text-5xl font-serif leading-[0.92] md:text-7xl">
                  Stories, paper,
                  <span className="italic text-terracotta"> and planted futures.</span>
                </h1>
                <h2 className="max-w-2xl text-xl leading-relaxed text-olive/70">
                  A live reference page for the Lina Olivetree visual language, voice, and core promises. This route is intentionally unlinked and meant as a working studio wall for future design decisions.
                </h2>
              </div>
            </div>

            <div className="washi-tape hand-drawn-border bg-cream p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Brand Essence</p>
              <p className="text-2xl font-serif italic text-olive">
                Calm, literary, nature-rooted illustrated products with a clear reforestation promise, expressed through tactile paper-inspired design and a personal studio voice.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <div className="rounded-4xl bg-olive p-10 text-cream shadow-xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">Approved Promise</p>
              <p className="text-3xl font-serif italic">Every 5 items sold helps fund the planting of 1 tree in Brazil.</p>
            </div>
            <div className="rounded-4xl border border-olive/10 bg-white p-8 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Personality</p>
              <div className="flex flex-wrap gap-3">
                {['Warm', 'Reflective', 'Artistic', 'Grounded', 'Honest'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-olive/10 bg-olive/5 px-4 py-2 text-sm font-medium uppercase tracking-[0.16em] text-olive"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-4xl border border-olive/10 bg-white p-8 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Voice</p>
              <ul className="space-y-3 text-lg text-olive/80">
                {voices.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-4xl border border-olive/10 bg-white p-8 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Product Pillars</p>
              <ul className="space-y-3 text-lg text-olive/80">
                {productPillars.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-olive/10 bg-white p-8 shadow-sm">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Hero Shot Direction</p>
              <p className="max-w-4xl text-xl leading-relaxed text-olive/80">
                A sunlit handmade still life with one hero product on warm paper, linen, or a working studio surface, surrounded by subtle botanical elements, sketch tools, paper scraps, or notebook details. The product stays central; the mood should suggest story, process, and care rather than a polished magazine spread.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-[2.5rem] border border-olive/10 bg-white p-8 shadow-xl md:p-12">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Typography</p>
              <h2 className="text-4xl font-serif italic">Use the type system intentionally</h2>
            </div>
            <p className="max-w-xl text-sm uppercase tracking-[0.16em] text-olive/40">
              If only two fonts are used, prefer Cormorant Garamond and Inter. Keep Shadows Into Light as an accent, not dense interface text.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-4xl bg-cream p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-olive/35">Headings</p>
              <p className="font-serif text-5xl leading-none text-olive">Cormorant Garamond</p>
              <p className="mt-4 text-lg text-olive/70">Editorial, literary, elegant, and best used to carry emotional tone.</p>
            </div>
            <div className="rounded-4xl bg-cream p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-olive/35">Body And UI</p>
              <p className="text-3xl font-semibold uppercase tracking-[0.14em] text-olive">Inter</p>
              <p className="mt-4 text-lg text-olive/70">Clear, calm, and supportive. This should do most of the practical work.</p>
            </div>
            <div className="rounded-4xl bg-cream p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-olive/35">Accent</p>
              <p className="font-hand text-4xl text-terracotta">Shadows Into Light</p>
              <p className="mt-4 text-lg text-olive/70">Use for selected notes, labels, or intimate moments where a handwritten touch adds warmth.</p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Color Palette</p>
            <h2 className="text-4xl font-serif italic">Most brand work should rely on the primary four colors</h2>
          </div>
          <SwatchGroup title="Primary" items={palette.primary} />
          <SwatchGroup title="Supporting" items={palette.supporting} />
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <GuidanceList title="Always" items={principles} />
          <GuidanceList title="Never" items={avoid} />
        </section>

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-6xl bg-terracotta p-10 text-cream shadow-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">Imagery</p>
            <ul className="space-y-4 text-lg">
              {imagery.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="washi-tape hand-drawn-border bg-white p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Approved UI Copy</p>
              <p className="text-3xl font-serif italic text-olive">Stories, paper, and planted futures.</p>
            </div>
            <div className="washi-tape hand-drawn-border bg-white p-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Tone Check</p>
              <p className="text-lg leading-relaxed text-olive/75">
                Warm, reflective, artistic, grounded, and honest should feel visible in both layout and language.
              </p>
            </div>
            <div className="rounded-4xl border border-olive/10 bg-white p-8 md:col-span-2">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Visual Language</p>
              <p className="text-xl leading-relaxed text-olive/80">
                Blend literary calm with tactile stationery cues. Use paper textures, soft borders, visible layers, and scrapbook details carefully. Favor warmth, texture, and charm over polished editorial restraint.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive/40">Sketchbook Logic</p>
            <h2 className="text-4xl font-serif italic">Markdown Extensions for Journal</h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <code className="bg-terracotta/10 text-terracotta px-2 py-1 rounded text-sm font-mono tracking-tighter">|</code>
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-olive/40">Quote trigger</span>
              </div>
              <blockquote className="border-l-4 border-terracotta pl-6 italic text-2xl text-olive font-serif leading-relaxed">
                The forest is a long story, written in the language of leaves and light.
              </blockquote>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <code className="bg-terracotta/10 text-terracotta px-2 py-1 rounded text-sm font-mono tracking-tighter">&gt;</code>
                <span className="text-sm font-semibold uppercase tracking-[0.16em] text-olive/40">Note trigger</span>
              </div>
              <div className="washi-tape mt-4 mx-auto w-fit max-w-[90%] md:max-w-md">
                <div className="post-it rotate-1 text-center py-6 px-10">
                  <p className="text-lg font-mono tracking-[0.2em] text-olive/80">
                    Remember to sketch the new olive seedlings by the north path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
