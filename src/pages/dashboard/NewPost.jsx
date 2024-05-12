import { Input } from "@/components/ui/input";

export default function NewPost() {
  return (
    <div className="h-full flex flex-col gap-2 px-10 py-8">
      <h1 className="font-bold text-3xl">Thêm mới bài viết</h1>
      <div>
        <h1>Tiêu đề bài viết</h1>
        <Input placeholder="Nhập tiêu đề bài viết" />
      </div>
    </div>
  );
}
