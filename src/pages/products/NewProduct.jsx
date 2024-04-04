import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SlCloudUpload } from "react-icons/sl";
import { IoClose  } from "react-icons/io5";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";

export default function NewProduct() {
  useEffect(() => {
    document.title = 'Thêm mới sản phẩm'
  })
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange: ", html, text);
  }
  const [images, setImages] = useState([]);

  const handleFiles = (event) => {
    const files = event.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setImages((prevImages) => [...prevImages, event.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="h-full flex flex-col gap-2 px-10 py-8">
      <div className=" flex flex-col gap-3">
        <h1 className="font-bold text-3xl">Thêm mới sản phẩm</h1>

        <div className="flex gap-3 justify-between items-center text-sm">
          <h1 className="text-[#525b75] font-semibold">
            Sản phẩm được đặt trên toàn cửa hàng
          </h1>
          <div className="flex gap-3 ">
            <Button
              variant="secondary"
              className="border-[1px] text-black font-semibold hover:bg-[#e3e6ed]"
            >
              Huỷ bỏ
            </Button>
            <Button className="bg-[#3874FF] font-semibold hover:bg-[#004dff]">
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Tên sản phẩm</h1>
            <Input placeholder="Tên sản phẩm" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Thông tin chi tiết</h1>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-lg">Giá</h1>
              <Input placeholder="$$$" />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-lg">Số lượng</h1>
              <Input placeholder="Số lượng" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Hình ảnh hiển thị</h1>
            <div className="flex flex-wrap gap-3">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image ${index}`}
                    className="w-24 h-24 object-cover border-[1px] p-2"
                  />
                  <IoClose 
                    className="absolute top-0 right-0 bg-[#cbd0dd] rounded-full cursor-pointer"
                    onClick={() => handleDelete(index)}
                    size={18}
                  />
                 
                </div>
              ))}
            </div>
            <div className="h-40 outline-dashed outline-[#9fa6bc] outline-[1px] flex gap-3 ">
              <label
                htmlFor="file-upload"
                className="flex-1 flex justify-center items-center gap-2 w-full cursor-pointer"
              >
                <SlCloudUpload size={30} color="#9fa6bc" />
                <h1 className="text-[#9fa6bc] hover:text-blue-600 text-lg">
                  Thêm hình ảnh
                </h1>
              </label>
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-3 mt-4">
          <div className="bg-white rounded-lg px-4 pb-4 flex flex-col gap-2">
            <h1 className="font-semibold text-xl py-4">Xuất xứ</h1>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Loại sản phẩm</h1>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Nhà cung cấp</h1>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white rounded-lg px-4 pb-4 flex flex-col gap-2">
            <h1 className="font-semibold text-xl py-4">Chi tiết sản phẩm</h1>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Kích thước</h1>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Chất liệu</h1>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Chiều dài</h1>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Khả năng chống nước</h1>
              <Input placeholder="Chống nước" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
