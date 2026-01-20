type PlaygroundSnippetProps = {
  id: string;
  title: string;
  description: string;
  language: string;
  author: string;
  likes: number;
};

export function PlaygroundSnippet({ id, title, description, language, author, likes }: PlaygroundSnippetProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        <span className="rounded bg-indigo-500/20 px-2 py-1 text-xs font-medium text-indigo-400">{language}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
        <span>by {author}</span>
        <div className="flex items-center gap-1">
          <span>♥</span>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
}
