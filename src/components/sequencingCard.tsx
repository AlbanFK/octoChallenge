import Link from "next/link";

interface SequencingLink {
  title: string;
  link: string;
  description?: string;
}

function SequencingCard({ seq }: { seq: SequencingLink }) {
  return (
    <Link
      href={seq.link}
      className="group rounded-lg text-primary-900 bg-primary-50 border border-transparent px-5 py-4 transition-colors hover:border-primary-300 hover:bg-primary-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      rel="noopener noreferrer"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {seq.title}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">{seq?.description}</p>
    </Link>
  );
}

export default SequencingCard;
