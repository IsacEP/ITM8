import { useEffect, useState } from "react";
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const TiptapPage = () => {
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    setEditor(
      useEditor({
        extensions: [StarterKit],
        content: "<p>Hello World!</p>",
      })
    );
  }, []);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <>
      <EditorContent editor={editor} className="tiptap-editor" />
      <FloatingMenu editor={editor} className="tiptap-menu">
        This is the floating menu
      </FloatingMenu>
      <BubbleMenu editor={editor} className="tiptap-menu">
        This is the bubble menu
      </BubbleMenu>
    </>
  );
};

export default TiptapPage;
