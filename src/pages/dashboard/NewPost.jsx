import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

export default function NewPost() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreviewUrl(imageUrl);
    }
  };

  const handleReset = () => {
    setImagePreviewUrl("");
  };

  useEffect(() => {
    document.title = "Thêm mới bài viết";
  });
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  return (
    <div className="h-full flex flex-col gap-2 px-10 py-8">
      <h1 className="font-bold text-3xl">Thêm mới bài viết</h1>
      <div>
        <h1>Tiêu đề bài viết</h1>
        <Input placeholder="Nhập tiêu đề bài viết" />
      </div>
      <div>
        <h1>Banner</h1>
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreviewUrl && (
            <div>
              <h2>Ảnh xem trước:</h2>
              <img
                src={imagePreviewUrl}
                alt="Image Preview"
                className="w-full h-[300px] object-cover object-center"
              />
              <button onClick={handleReset}>Reset</button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1>Content</h1>
        <MdEditor
          style={{ height: "400px" }}
          renderHTML={(text) => mdParser.render(text)}
          //onChange={handleEditorChange}
          view={{ menu: true, md: true, html: false }}
        />
      </div>

      <div>
        <h1>Tác giả</h1>
        <Input placeholder="Nhập tên tác giả" />
      </div>
    </div>
  );
}
