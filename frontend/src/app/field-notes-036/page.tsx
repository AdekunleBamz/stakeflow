import { TopicCard, TopicHero } from "@/components/field-notes-036";

const notes = [
  {
    title: "Validator reliability checklist",
    summary: "Key signals to monitor daily: uptime drift, missed blocks, and reward variance.",
    tag: "Operations",
  },
  {
    title: "Liquidity exit planning",
    summary: "Model exit routes, target slippage bounds, and queue sensitivity before moving size.",
    tag: "Liquidity",
  },
  {
    title: "Delegation diversification",
    summary: "Split stake across operators to reduce correlated downtime and governance concentration.",
    tag: "Risk",
  },
];

export default function FieldNotes036Page() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <TopicHero
          eyebrow="Field Notes"
          title="Field Notes 036"
          subtitle="A compact brief on staking operations, risk management, and reward discipline."
        />

        <section className="grid gap-6 md:grid-cols-2">
          {notes.map((note) => (
            <TopicCard key={note.title} {...note} />
          ))}
        </section>
      </div>
    </div>
  );
}
