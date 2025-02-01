"use client"

import type { FileItem } from "../../lib/mockData"
import { Folder, File, Image, Video, Music } from "lucide-react"

interface FileExplorerProps {
  items: FileItem[]
  onFolderClick: (folder: FileItem) => void
}

export function FileExplorer({ items, onFolderClick }: FileExplorerProps) {
  const getIcon = (type: FileItem["type"]) => {
    switch (type) {
      case "folder":
        return <Folder className="w-5 h-5 text-yellow-400" />
      case "document":
        return <File className="w-5 h-5 text-blue-400" />
      case "image":
        return <Image className="w-5 h-5 text-green-400" />
      case "video":
        return <Video className="w-5 h-5 text-red-400" />
      case "audio":
        return <Music className="w-5 h-5 text-purple-400" />
    }
  }

  const getReadableType = (type: FileItem["type"]) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-semibold">
        <div className="col-span-6">Name</div>
        <div className="col-span-3">Type</div>
        <div className="col-span-3">Size</div>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="group">
            <div className="grid grid-cols-12 gap-4 py-3 px-4 hover:bg-gray-700 cursor-pointer">
              <div className="col-span-6 flex items-center space-x-2">
                {getIcon(item.type)}
                {item.type === "folder" ? (
                  <span className="text-gray-200 group-hover:text-white" onClick={() => onFolderClick(item)}>
                    {item.name}
                  </span>
                ) : (
                  <a href={`#file-${item.id}`} className="text-gray-200 group-hover:text-white hover:underline">
                    {item.name}
                  </a>
                )}
              </div>
              <div className="col-span-3 flex items-center text-gray-400">{getReadableType(item.type)}</div>
              <div className="col-span-3 flex items-center text-gray-400">
                {item.size || (item.type === "folder" ? "--" : "0 B")}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

