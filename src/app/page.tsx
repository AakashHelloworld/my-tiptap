"use client"
import "./style.css"
import React, { useState } from "react"
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorProvider, useCurrentEditor } from '@tiptap/react'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import { Toggle } from "@/components/ui/toggle"
import { HexColorPicker } from "react-colorful";
import { Bold, Italic, Underline, Code, Link , AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Code2, MessageSquareQuote, Minus, Undo2Icon, Redo2Icon, WrapText, Highlighter, Paintbrush} from "lucide-react"
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import CharacterCount from '@tiptap/extension-character-count'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MenuBar = () => {
  const [onColorOpen, setOnColorOpen] = useState(false);
  const [onHighlightOpen, setOnHighlightOpen] = useState(false);
  const { editor } = useCurrentEditor()
  // console.log(editor)
  const [color, setColor] = useState("#000000");
  const [highlight, setHighlight] = useState("#000000");


  if (!editor) {
    return null
  }

  return (
    <div className="flex items-center flex-col justify-center w-full">
      <div className={`w-full flex justify-between`}>
        <div>
        <Toggle
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <Undo2Icon className="w-4" />
        </Toggle>
        <Toggle
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <Redo2Icon className="w-4"  />
        </Toggle>
        </div>
        <div>
        <p className="text-sm"><span className="font-bold text-[red]">{editor.storage.characterCount.characters()}</span> characters </p>
        <p className="text-sm"><span className="font-bold text-[red]">{editor.storage.characterCount.words()}</span> words</p>
        </div>
      </div>

      <div className="flex gap-2 justify-center flex-wrap mb-4 border-b-2 pb-1">
        <Toggle
          pressed={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          <Bold className="w-4" />
        </Toggle>
        <Toggle
          pressed={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          <Italic className="w-4"/>
        </Toggle>
        <Toggle
          pressed={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
        >
          <Underline className="w-4"/>
        </Toggle>

        <Select value={`${editor.getAttributes('heading').level ? editor.getAttributes('heading').level : 6}`} onValueChange={(value : string) => {
          const level = parseInt(value)
          console.log(level)
          editor.chain().focus().setHeading({level: level as 1 | 2 | 3 | 4 | 5 | 6}).run()}} >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Heading"  />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="6" className="text-sm">Smaller</SelectItem>
          <SelectItem value="5" className="text-sm">Small</SelectItem>
          <SelectItem value="4" className="text-md">Medium</SelectItem>
          <SelectItem value="3" className="text-lg">Large</SelectItem>
          <SelectItem value="2" className="text-xl">Larger</SelectItem>
          <SelectItem value="1" className="text-2xl">Extra Large</SelectItem>
        </SelectContent>
      </Select>

      <Select value={editor.getAttributes('textStyle').fontFamily ? editor.getAttributes('textStyle').fontFamily : 'sans-serif'} onValueChange={(value : string) => {
        console.log(editor.getAttributes('font-family'))
          editor.chain().focus().setFontFamily(value).run()
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Font Family"  />
        </SelectTrigger>
        <SelectContent>
          <SelectItem  value="sans-serif" className="text-sm font-[sans]">Sans-Serif</SelectItem>
          <SelectItem value="serif" className="text-sm font-serif">Serif</SelectItem>
          <SelectItem value="monospace" className="text-sm font-[monospace]">Monospace</SelectItem>
          <SelectItem value="cursive" className="text-sm font-[cursive]">Cursive</SelectItem>
          <SelectItem value="fantasy" className="text-sm font-[fantasy]">Fantasy</SelectItem>
          <SelectItem value="system-ui" className="text-sm font-[system-ui]">System UI</SelectItem>
          <SelectItem value="emoji" className="text-sm font-[emoji]">Emoji</SelectItem>
        </SelectContent>
      </Select>



        <Toggle
          pressed={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft className="w-4"/>
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter className="w-4"/>
        </Toggle>

        <Toggle
          pressed={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight className="w-4"/>
        </Toggle>
        
        <Toggle
          pressed={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4"/>
        </Toggle>
        <Toggle
          pressed={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4"/>
        </Toggle>
        <Toggle
          pressed={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
         <Code2 className="w-4"/>
        </Toggle>
        <Toggle
          pressed={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <MessageSquareQuote className="w-4"/>
        </Toggle>
        <Toggle
          pressed={editor.isActive('horizontalRule')}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="w-4"/>
        </Toggle>
        <Toggle  onClick={() => editor.chain().focus().setHardBreak().run()}>
        <WrapText className="w-4"/>
        </Toggle>
        <Popover open={onColorOpen} > 
          <PopoverTrigger> <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-10 px-3`} onClick={() => setOnColorOpen(!onColorOpen)} ><Paintbrush className="w-4"/></button></PopoverTrigger>
          <PopoverContent  className="flex justify-center items-center w-fit" onPointerDownOutside={() => setOnColorOpen(false)}>
            <HexColorPicker  color={color} onChange={(color)=>{
              setColor(color)
            editor.chain().focus().setColor(color).run();
          }} />
          </PopoverContent>
        </Popover>

        <Popover open={onHighlightOpen} > 
          <PopoverTrigger> <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground bg-transparent h-10 px-3`} onClick={() => setOnHighlightOpen(!onHighlightOpen)} ><Highlighter className="w-4"/></button></PopoverTrigger>
          <PopoverContent  className="flex justify-center items-center w-fit" onPointerDownOutside={() => setOnHighlightOpen(false)}>
            <HexColorPicker  color={highlight} onChange={(color)=>{
              setHighlight(color)
            editor.chain().focus().toggleHighlight({ color: color }).run();
          }} />
          </PopoverContent>
        </Popover>

        {/* <Toggle
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        >
          Purple
        </Toggle> */}
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Highlight.configure({ multicolor: true }),
  TextStyle,
  FontFamily.configure({
    types: ['textStyle'],
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    heading: {
      levels: [1, 2, 3, 4, 5, 6],
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    codeBlock: {
      languageClassPrefix: 'javascript',
    }
  }),
  CharacterCount.configure(),
]

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

export default () => {
  return (
    <div className="w-full h-min-screen border p-4 rounded  flex justify-center flex-col items-center">
      <div className="w-[90vw] sm:w-[80vw] h-min-screen border rounded p-4 m-4 flex justify-center flex-col items-center">
        <EditorProvider onUpdate={(editor) => {
          console.log(editor.editor.getHTML())
        }} slotBefore={<MenuBar />} extensions={extensions} content={content}></EditorProvider>
    </div>
    </div>
  )
}