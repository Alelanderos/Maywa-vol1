
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Block {
  id: string;
  type: 'text' | 'checklist' | 'smartField';
  content: string;
  checked?: boolean;
  fieldType?: string;
}

interface BlockEditorProps {
  initialBlocks?: Block[];
}

export function BlockEditor({ initialBlocks = [] }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks.length > 0 ? initialBlocks : [
    { id: "1", type: "text", content: "Start typing here..." }
  ]);
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  const handleContentChange = (id: string, newContent: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content: newContent } : block
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, block: Block, index: number) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newId = Date.now().toString();
      const newBlocks = [...blocks];
      newBlocks.splice(index + 1, 0, { id: newId, type: 'text', content: '' });
      setBlocks(newBlocks);
      setFocusedBlockId(newId);
    }
  };

  const handleCheckboxChange = (id: string) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, checked: !block.checked } : block
    ));
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'text':
        return (
          <div 
            key={block.id}
            className="notion-block p-2 rounded-md mb-1"
          >
            <div
              className="block-content-editable p-1 min-h-[24px]"
              contentEditable
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => handleContentChange(block.id, e.currentTarget.textContent || '')}
              suppressContentEditableWarning={true}
            >
              {block.content}
            </div>
          </div>
        );
      case 'checklist':
        return (
          <div 
            key={block.id}
            className="notion-block p-2 rounded-md mb-1 flex items-start"
          >
            <input
              type="checkbox"
              checked={block.checked}
              onChange={() => handleCheckboxChange(block.id)}
              className="mr-2 mt-1"
            />
            <div
              className="block-content-editable p-1 min-h-[24px] flex-1"
              contentEditable
              onFocus={() => setFocusedBlockId(block.id)}
              onBlur={() => setFocusedBlockId(null)}
              onKeyDown={(e) => handleKeyDown(e, block, index)}
              onInput={(e) => handleContentChange(block.id, e.currentTarget.textContent || '')}
              suppressContentEditableWarning={true}
            >
              {block.content}
            </div>
          </div>
        );
      case 'smartField':
        return (
          <div 
            key={block.id}
            className="notion-block p-2 rounded-md mb-1"
          >
            <div className="flex items-center">
              <span className="text-sm text-purple-700 font-medium mr-2">{block.fieldType}:</span>
              <div
                className="block-content-editable p-1 min-h-[24px] flex-1 border-b border-dashed border-purple-300"
                contentEditable
                onFocus={() => setFocusedBlockId(block.id)}
                onBlur={() => setFocusedBlockId(null)}
                onKeyDown={(e) => handleKeyDown(e, block, index)}
                onInput={(e) => handleContentChange(block.id, e.currentTarget.textContent || '')}
                suppressContentEditableWarning={true}
              >
                {block.content}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const addBlock = (type: Block['type'], fieldType?: string) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: '',
      ...(type === 'checklist' ? { checked: false } : {}),
      ...(fieldType ? { fieldType } : {})
    };
    
    setBlocks([...blocks, newBlock]);
    setFocusedBlockId(newBlock.id);
  };

  return (
    <Card className="block-editor">
      <CardContent className="pt-6">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => addBlock('text')}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            + Text
          </button>
          <button
            onClick={() => addBlock('checklist')}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            + Checklist
          </button>
          <button
            onClick={() => addBlock('smartField', 'Sanitary permit expiration')}
            className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
          >
            + Smart Field
          </button>
        </div>
        
        <div className="min-h-[200px]">
          {blocks.map(renderBlock)}
        </div>
      </CardContent>
    </Card>
  );
}

export default BlockEditor;
