import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SlCloudUpload } from "react-icons/sl";
import { IoClose } from "react-icons/io5";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function InfoProduct() {
  const formData = new FormData();
  const { product_id, path } = useParams();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [seller, setSeller] = useState([]);

  const navigate = useNavigate();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [product, setProduct] = useState({
    product_id: "",
    product_name: "",
    seller: "",
    category_id: "",
    price: "",
    amount: "",
    color: "",
    material: "",
    size: "",
    width: "",
    waterproof: "",
    description_display: "",
    description_markdown: "",
    images: [],
  });

  const handleInput = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    document.title = "Thông tin chi tiết";
  });

  useEffect(() => {
    const getInfoProduct = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:9999/settings_product/${product_id}`
        );
        if (response.status === 200) {
          setProduct(response.data.product);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getInfoProduct();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get("http://127.0.0.1:9999/categories")
        .then((res) => {
          setCategories(res.data.record);
        })
        .catch((err) => console.log(err));
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSeller = async () => {
      await axios
        .get("http://127.0.0.1:9999/seller")
        .then((res) => {
          setSeller(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    getSeller();
  }, []);

  function handleEditorChange({ html, text }) {
    // console.log("handleEditorChange: ", html, text);
    setProduct({
      ...product,
      description_markdown: text,
      description_display: html,
    });
  }

  const handleFiles = (event) => {
    const files = event.target.files;
    setSelectedFiles(event.target.files);

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = function (event) {
        setProduct({
          ...product,
          images: (prevImages) => [...prevImages, event.target.result],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (index) => {
    setProduct({
      ...product,
      images: (prevImages) => prevImages.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async () => {
    // await axios
    //   .post("http://127.0.0.1:9999/product", dataSend)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => console.log(e));

    // formData.append("product_id", input?.product_id);
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }

    if (selectedFiles) {
      await axios
        .post("http://127.0.0.1:9999/upload-images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="h-full flex flex-col gap-2 px-10 py-8">
      <div className=" flex flex-col gap-3">
        <h1 className="font-bold text-3xl">Thông tin sản phẩm</h1>

        <div className="flex gap-3 justify-between items-center text-sm">
          <h1 className="text-[#525b75] font-semibold">
            Sản phẩm được đặt trên toàn cửa hàng
          </h1>
          <div className="flex gap-3 ">
            <Button
              variant="secondary"
              className="border-[1px] text-black font-semibold hover:bg-[#e3e6ed]"
              onClick={() => navigate(`/dashboard/${path}`)}
            >
              Trở về trang quản trị
            </Button>
            <Button
              className="bg-[#3874FF] font-semibold hover:bg-[#004dff]"
              onClick={handleSubmit}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Mã sản phẩm</h1>
            <Input
              placeholder="Mã sản phẩm"
              name="product_id"
              value={product?.product_id}
              readOnly={true}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Tên sản phẩm</h1>
            <Input
              placeholder="Tên sản phẩm"
              name="product_name"
              value={product?.product_name}
              onChange={handleInput}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-lg">Giá</h1>
              <Input
                placeholder="$$$"
                type="number"
                name="price"
                value={product?.price}
                onChange={handleInput}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-lg">Số lượng</h1>
              <Input
                placeholder="Số lượng"
                type="number"
                name="amount"
                value={product?.amount}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Thông tin chi tiết</h1>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
              value={product.description_markdown}
              
            />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-lg">Hình ảnh hiển thị</h1>
            <div className="flex flex-wrap gap-3">
              {product?.images.map((image, index) => (
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
          <div className="border-[1px]  flex flex-col justify-center bg-white rounded-lg">
            <img
              src={
                product.images ? product.images[0] : "/Image_not_available.png"
              }
              alt={product?.product_name}
              className="object-cover object-center "
            />
          </div>
          <div className="bg-white rounded-lg px-4 pb-4 flex flex-col gap-2">
            <h1 className="font-semibold text-xl py-4">Xuất xứ</h1>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Loại sản phẩm</h1>
              <Select
                onValueChange={(value) =>
                  setProduct({ ...product, category_id: value })
                }
                defaultValue={product.category_id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn loại sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories?.map((item, index) => (
                      <SelectItem value={item?.category_id} key={index}>
                        {item?.category_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Thương hiệu</h1>
              <Select
                onValueChange={(value) =>
                  setProduct({ ...product, seller: value })
                }
                defaultValue={product.seller}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {seller?.map((item, index) => (
                      <SelectItem value={item?.seller_id} key={index}>
                        {item?.seller_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white rounded-lg px-4 pb-4 flex flex-col gap-2">
            <h1 className="font-semibold text-xl py-4">Chi tiết sản phẩm</h1>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Kích thước</h1>
              <Input value={product.size} onChange={handleInput} name="size" />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Chất liệu</h1>
              <Select
                onValueChange={(value) =>
                  setProduct({ ...product, material: value })
                }
                defaultValue={product?.material}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn chất liệu sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="gold">Vàng</SelectItem>
                    <SelectItem value="silver">Bạc</SelectItem>
                    <SelectItem value="titanium">Titanium</SelectItem>
                    <SelectItem value="alloy">Hợp kim</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Chiều dài</h1>
              <Input
                name="width"
                value={product.width}
                onChange={handleInput}
              />
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Màu sắc</h1>
              <Select
                onValueChange={(value) =>
                  setProduct({ ...product, color: value })
                }
                defaultValue={product?.color}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn màu sắc sản phẩm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="gold">Vàng</SelectItem>
                    <SelectItem value="silver">Bạc</SelectItem>
                    <SelectItem value="bronze">Đồng</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-sm">Khả năng chống nước</h1>
              <Input
                placeholder="Chống nước"
                name="waterproof"
                value={product.waterproof}
                onChange={handleInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
