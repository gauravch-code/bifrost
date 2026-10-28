import { CodeEditor } from "@/components/ui/codeEditor";
import CollapsibleBox from "./collapsibleBox";

// Pretty-prints a JSON body and falls back to the raw text (SSE streams, truncated previews).
function formatBody(body: string): string {
	try {
		return JSON.stringify(JSON.parse(body), null, 2);
	} catch {
		return body;
	}
}

interface PassthroughBodyBoxProps {
	title: string;
	body: string;
	testId: string;
	/** The stored body was cut to fit the row's size bound, so it may not be valid JSON. */
	truncated?: boolean;
}

/** A passthrough request or response body exactly as it crossed the wire, read-only. */
export default function PassthroughBodyBox({ title, body, testId, truncated }: PassthroughBodyBoxProps) {
	const formatted = formatBody(body);
	return (
		<div data-testid={testId}>
			{truncated && (
				<div
					className="mb-2 rounded-sm border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
					data-testid={`${testId}-truncated-notice`}
				>
					Truncated: this body was cut to fit the stored size limit, so it may not be valid JSON.
				</div>
			)}
			<CollapsibleBox title={title} onCopy={() => formatted}>
				<CodeEditor
					className="z-0 w-full"
					shouldAdjustInitialHeight={true}
					maxHeight={450}
					wrap={true}
					code={formatted}
					lang="json"
					readonly={true}
					options={{
						collapsibleBlocks: true,
						showVerticalScrollbar: true,
						scrollBeyondLastLine: false,
						lineNumbers: "off",
						alwaysConsumeMouseWheel: false,
					}}
				/>
			</CollapsibleBox>
		</div>
	);
}