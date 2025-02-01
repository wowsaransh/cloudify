export type FileType = "folder" | "document" | "image" | "video" | "audio"

export interface FileItem {
  id: string
  name: string
  type: FileType
  size?: string
  children?: FileItem[]
}

export const mockData: FileItem = {
  id: "root",
  name: "My Drive",
  type: "folder",
  children: [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      children: [
        { id: "2", name: "Resume.pdf", type: "document", size: "1.2 MB" },
        { id: "3", name: "Notes.txt", type: "document", size: "4 KB" },
      ],
    },
    {
      id: "4",
      name: "Images",
      type: "folder",
      children: [
        { id: "5", name: "Vacation.jpg", type: "image", size: "3.5 MB" },
        { id: "6", name: "Family.png", type: "image", size: "2.1 MB" },
      ],
    },
    {
      id: "7",
      name: "Videos",
      type: "folder",
      children: [{ id: "8", name: "Tutorial.mp4", type: "video", size: "45 MB" }],
    },
    { id: "9", name: "Project.zip", type: "document", size: "10.5 MB" },
  ],
}

