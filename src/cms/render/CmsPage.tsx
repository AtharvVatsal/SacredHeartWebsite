import type { LoadedPage } from './page'
import { RenderBlocks } from './RenderBlocks'

/** A CMS page as visitors see it, plus a clear banner when an editor is previewing unpublished changes */
export function CmsPage({ loaded }: { loaded: LoadedPage }) {
  return (
    <>
      <RenderBlocks blocks={loaded.document.content} preview={loaded.preview} />
      {loaded.preview && (
        <div role="status" data-cms-preview-banner className="fixed left-3 bottom-3 z-[60] max-w-sm rounded-2xl bg-gray-900/95 px-4 py-3 text-sm text-white shadow-2xl print:hidden">
          <p className="font-semibold">Preview: you are seeing the latest saved draft</p>
          <p className="mt-0.5 text-white/75">Visitors still see the published version{loaded.page._status === 'published' ? '' : ' (this page is not published yet)'}.</p>
          {loaded.issues.length > 0 && (
            <p className="mt-1 text-secondary-300">{loaded.issues.length} section problem(s) must be fixed before publishing.</p>
          )}
          <div className="mt-2 flex gap-3">
            <a href={`/cms/editor/${loaded.page.id}`} className="font-semibold text-secondary-300 underline underline-offset-2">Back to the editor</a>
            <a href={`/cms/exit-preview?path=${encodeURIComponent(loaded.page.path)}`} className="font-semibold text-white underline underline-offset-2">Exit preview</a>
          </div>
        </div>
      )}
    </>
  )
}
