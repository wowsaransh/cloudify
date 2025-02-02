"use client"

import { useState } from "react"
import { type FileItem, mockData } from "../lib/mockData"
import { FileExplorer } from "../components/ui/FileExplorer"
import { SearchBar } from "../components/ui/SearchBar"
import { Button } from "~/components/ui/button"
import { Upload, ChevronRight } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "~/components/ui/breadcrumb"

export default function GoogleDriveClone() {
  const [currentFolder, setCurrentFolder] = useState<FileItem>(mockData)
  const [breadcrumbs, setBreadcrumbs] = useState<FileItem[]>([mockData])
  const [searchResults, setSearchResults] = useState<FileItem[] | null>(null)

  const handleUpload = () => {
    // Mock upload functionality
    alert("Upload functionality would be implemented here")
  }

  const navigateToFolder = (folder: FileItem) => {
    setCurrentFolder(folder)
    setBreadcrumbs((prev) => {
      const index = prev.findIndex((item) => item.id === folder.id)
      if (index !== -1) {
        return prev.slice(0, index + 1)
      } else {
        return [...prev, folder]
      }
    })
    setSearchResults(null)
  }

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(null)
      return
    }

    const searchRecursive = (items: FileItem[]): FileItem[] => {
      return items.flatMap((item) => {
        if (item.name.toLowerCase().includes(query.toLowerCase())) {
          return [item]
        }
        if (item.children) {
          return searchRecursive(item.children)
        }
        return []
      })
    }

    const results = searchRecursive(mockData.children || [])
    setSearchResults(results)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Cloudify</h1>
          <SearchBar onSearch={handleSearch} />
          <Button onClick={handleUpload} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </Button>
        </div>

        {!searchResults && (
          <Breadcrumb className="mb-6">
            {breadcrumbs.map((item, index) => (
              <BreadcrumbItem key={item.id}>
                <BreadcrumbLink
                  onClick={() => navigateToFolder(item)}
                  className="text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  {item.name}
                </BreadcrumbLink>
                {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 mx-1 text-gray-500" />}
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}

        <FileExplorer items={searchResults || currentFolder.children || []} onFolderClick={navigateToFolder} />
      </div>
    </div>
  )
}

