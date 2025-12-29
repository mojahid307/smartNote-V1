import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X } from 'lucide-react';
import { Note } from '../App';

interface NoteEditorProps {
  onSave: (title: string, content: string, category?: string) => void;
  onClose: () => void;
  noteToEdit?: Note;
}

export function NoteEditor({ onSave, onClose, noteToEdit }: NoteEditorProps) {
  const [title, setTitle] = useState(noteToEdit?.title || '');
  const [content, setContent] = useState(noteToEdit?.content || '');
  const [category, setCategory] = useState(noteToEdit?.category || 'Personal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSave(title, content, category);
      setTitle('');
      setContent('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
        className="bg-[#ffff45] rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['SF_Pro:Semibold',sans-serif] font-[590]" style={{ fontVariationSettings: "'wdth' 100" }}>{noteToEdit ? 'Edit Note' : 'Create New Note'}</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="rounded-full hover:bg-black/10"
          >
            <X className="size-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm mb-2 text-black font-['SF_Pro:Regular',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="bg-white/50 border-black/20 focus:border-black"
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm mb-2 text-black font-['SF_Pro:Regular',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/50 border-black/20 focus:border-black">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Work">Work</SelectItem>
                <SelectItem value="Ideas">Ideas</SelectItem>
                <SelectItem value="Shopping">Shopping</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm mb-2 text-black font-['SF_Pro:Regular',sans-serif]" style={{ fontVariationSettings: "'wdth' 100" }}>
              Content
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="bg-white/50 border-black/20 focus:border-black"
              rows={8}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-black/20 hover:bg-black/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-black text-[#ffff45] hover:bg-black/90"
            >
              Save Note
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}