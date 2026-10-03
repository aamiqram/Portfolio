import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { primaryTech } from "@/content/tech";
import { site } from "@/content/site";
import TechBadge from "@/components/ui/TechBadge";
import Portrait from "@/components/ui/Portrait";

/**
 * Personal introduction.
 *
 * This replaces the former "Primary stack" band rather than adding a section
 * to the page, so the homepage keeps its original length while introducing the
 * person rather than opening with a list of technologies. The education and
 * training dates live in `content/journey.ts` and are drawn as a timeline
 * further down the page, so they are not restated here.
 *
 * The portrait sits in a narrow column against a wider text column, so the
 * composition is deliberately asymmetric. The technology row is carried over
 * from the band this replaced and stays secondary to the writing.
 *
 * Nothing here is invented. The framing comes from the site owner's own
 * earlier self-description, corrected to match the current facts: the role is
 * Frontend Developer rather than "MERN Stack Developer", the degree and the
 * training programme are both still running, and there is no employment,
 * client or open-source history implied anywhere in the copy.
 */
export default function Profile() {
  return (
    <section
      aria-labelledby="profile-heading"
      className="relative border-b border-line bg-surface"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent"
      />

      <div className="mx-auto w-full max-w-[100rem] px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-xs lg:max-w-none">
            <Portrait
              ratio="4 / 5"
              sizes="(min-width: 1024px) 20rem, (min-width: 640px) 40vw, 72vw"
            />
            <p className="mt-4 font-mono text-xs text-fg-muted">
              {site.name} — {site.role}
            </p>
          </div>

          <div className="min-w-0">
            <p className="label text-accent-text">{"// Who is behind this"}</p>
            <h2 id="profile-heading" className="heading-section mt-3 text-fg">
              The person behind the interface
            </h2>

            <div className="measure mt-6 space-y-4 text-base leading-relaxed text-fg-secondary">
              <p>
                My name is Abu Abdullah Md Iqram. I am a frontend developer in
                Chattogram, and most of my work sits in the layer people do not
                usually photograph: the API behind a screen, the data model under
                that, and whether either of them still makes sense when a real
                person with a real order tries to use it.
              </p>
              <p>
                I did not come to this by a straight route. I started a BSc in
                Mathematics at Chittagong College in 2023, and picked up
                programming alongside it because I wanted to see whether the
                thing I was studying could be made to do anything. What kept me
                in it was not the theory but the moment an idea stops being a
                screen and becomes something a person can actually use.
              </p>
              <p>
                The part I enjoy most is the seam between the interface and the
                data. A checkout that has to survive a failed request. An order
                that is only allowed to become <em>paid</em> when the payment
                gateway says so. An inventory record that two people editing at
                once cannot corrupt. None of that is visible in a screenshot,
                and all of it decides whether the product is real.
              </p>
              <p>
                So I build the whole thing rather than the front of it. The work
                in this portfolio is mostly commerce — marketplaces, catalogues,
                checkout, delivery rules — with one native Android application in
                there because I wanted to understand a platform that does not
                hide the hard parts. I am still early in my career and I say so
                throughout this site, but I am ready to take a feature end to
                end and to keep learning in that layer.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-accent-text"
              >
                More about me
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/tech-stack"
                className="group inline-flex items-center gap-1.5 text-sm text-fg-secondary transition-colors hover:text-accent-text"
              >
                Full stack inventory
                <ArrowRight
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="label text-fg-muted">Primary stack</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {primaryTech.map((item) => (
                  <li
                    key={item.key}
                    className="transition-transform duration-300 ease-expo hover:-translate-y-0.5"
                  >
                    <TechBadge item={item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}