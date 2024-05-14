import { useEffect, useState } from "react";
import { MdStar } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ReviewProduct() {
  const [rating, setRating] = useState(null);
  const [content, setContent] = useState(null);
  const [hover, setHover] = useState(null);
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [param] = useSearchParams();

  useEffect(() => {
    const getProduct = async () => {
      await axios
        .get(
          `http://127.0.0.1:9999/detail_review/${param.get(
            "order"
          )}/${param.get("product")}`
        )
        .then((res) => setProduct(res.data.record));
    };
    getProduct();
  }, [param.get("order"), param.get("product")]);

  const judge = (hover) => {
    switch (hover) {
      case 1:
        return "Tệ";
      case 2:
        return "Không hài lòng";
      case 3:
        return "Bình thường";
      case 4:
        return "Hài lòng";
      case 5:
        return "Tuyệt vời";
      default:
        return null;
    }
  };
  const review = {
    order_id: param.get("order"),
    product_id: param.get("product"),
    title: judge(rating),
    content: content,
    rate: rating,
    name: name,
  };
  const handleReview = async () => {
    await axios
      .post(`http://127.0.0.1:9999/review_product`, review)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1>Đánh giá sản phẩm</h1>
        <Button onClick={handleReview}>Đánh giá</Button>
      </div>
      <div>
        <div className="border cursor-pointer">
          <div className="flex gap-4 p-1">
            <img
              className="w-28 h-28 object-cover object-center"
              src={product.image}
            />
            <div className="w-4/5">
              <div className="flex justify-between items-center">
                <h1 className="font-medium">{product.product_name}</h1>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-sm">{}</h1>
                <h1 className="text-sm">{}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className="font-semibold">Chất lượng sản phẩm: </div>
        <div className="flex items-center">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <div>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <MdStar
                    size={30}
                    className="cursor-pointer"
                    color={
                      currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </div>
              </label>
            );
          })}
        </div>
        <div className="text-[#ffc107]">{judge(rating)}</div>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold">Đánh giá chi tiết:</h1>
        <Textarea
          placeholder="Hãy chia sẻ nhận xét của bạn"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold">Tên hiển thị:</h1>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên hiển thị"
        />
      </div>
    </div>
  );
}
