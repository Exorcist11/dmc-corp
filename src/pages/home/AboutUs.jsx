
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  useEffect(() => {
    document.title = "Về chúng tôi - DMC-Corp";
  });
  const navigate = useNavigate();
  const explore = [
    { name: "Best seller", img: "/public/explore-1.jpg", path: "best-seller" },
    { name: "Quà tặng", img: "/public/explore-2.png", path: "gift" },
    { name: "Blog", img: "/public/explore-3.jpg", path: "blog" },
  ];

  const store = [
    { img: "/public/store-1.jpg" },
    { img: "/public/store-2.jpg" },
    { img: "/public/store-3.jpg" },
    { img: "/public/store-4.jpg" },
    { img: "/public/store-5.jpg" },
  ];

  return (
    <div className="flex flex-col">
      <div className="relative items-center justify-center text-white">
        <img
          src="/public/Banner-AboutUs.jpg"
          alt=""
          className="h-screen w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end p-40 gap-3 text-center">
          <h1 className="text-5xl font-bold">
            Chào bạn, chúng tôi là Devil May Cry
          </h1>
          <p className="">
            Chúng tôi biến sản phẩm phụ kiện không thể thiếu trở thành những
            biểu tượng tinh thần đầy cảm hứng, để thúc đẩy thế hệ trẻ Việt Nam
            không ngừng tiến lên phía trước
          </p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-1/2 flex flex-col text-center justify-center px-10 gap-2">
          <h1 className="font-bold uppercase text-4xl">
            Điều gì tạo nên Devil May Cry?
          </h1>
          <p className="text-left">
            <h1 className="font-semibold">CHUẨN</h1> Mang trong mình niềm đam mê
            với trang sức thủ công, Helios không ngừng lắng nghe và hoàn thiện
            mình qua từng ngày, từ đó đem tới cho khách hàng trải nghiệm, dịch
            vụ và sản phẩm CHUẨN cam kết.
          </p>
          <p className="text-left">
            <h1 className="font-semibold">CHẤT</h1> Khác so với nhiều thương
            hiệu trên thị trường, chúng tôi lấy cảm hứng từ mọi khía cạnh trong
            cuộc sống, kết hợp chúng với tư duy táo bạo để tạo nên những sản
            phẩm độc đáo, mang phong cách mạnh mẽ và chất ngầu.
          </p>
        </div>
        <div className="col-span-2 w-1/2">
          <img
            src="/public/AboutUs-2.jpg"
            alt=""
            className="object-cover object-center h-[500px] w-full"
          />
        </div>
      </div>

      <div className="flex w-full">
        <div className="col-span-2 w-1/2">
          <img
            src="/public/AboutUs-3.jpg"
            alt=""
            className="object-cover object-center h-[500px] w-full"
          />
        </div>
        <div className="w-1/2 flex flex-col text-center justify-center px-10 gap-2">
          <h1 className="font-bold uppercase text-4xl">Devil May Cry</h1>
          <p>
            Với những sản phẩm được thiết kế bằng nhiệt huyết, khát khao và khối
            óc đầy sáng tạo của đội ngũ chính những người trẻ Việt Nam, chúng
            tôi tin rằng tinh thần “Why not” ấy sẽ luôn đồng hành và truyền cảm
            hứng cho bạn mỗi ngày.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 px-12 py-10">
        <div className="grid grid-cols-3 space-x-4 py-10 w-full bg-[#ecebea] h-[400px]">
          <div className="flex flex-col items-start gap-4 justify-center px-12 border-r border-black">
            <img src="/public/slogan1.png" alt="" />
            <h1 className="uppercase font-semibold text-3xl">
              Dám nghĩ dám làm
            </h1>
            <p className="text-sm font-medium">
              Với khát khao trở thành người đồng hành của các bạn, chúng tôi tin
              rằng chính mình phải có đủ can đảm để vượt qua thách thức, dám
              nghĩ, dám dẫn đầu và khác biệt.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 justify-center px-12 border-r border-black">
            <img src="/public/slogan3.png" alt="" />
            <h1 className="uppercase font-semibold text-3xl">
              BẮT ĐẦU VÀ KẾT THÚC BẰNG KHÁCH HÀNG
            </h1>
            <p className="text-sm font-medium">
              Tương lai với chúng tôi là những sản phẩm vươn tầm thế giới, là
              thế hệ trẻ Việt Nam đầy tự tin để theo đuổi đam mê của mình, là
              &quot;Why not?&quot; trở thành triết lí của tất cả mọi người.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 justify-center px-12">
            <img src="/public/slogan2.png" alt="" />
            <h1 className="uppercase font-semibold text-3xl">
              TRUYỀN CẢM HỨNG
            </h1>
            <p className="text-sm font-medium">
              Với tinh thần của những chiến binh, chúng tôi luôn chiến đấu với
              chính bản thân mình mỗi ngày để đem lại những trải nghiệm “WOW”
              nhất cho người trẻ Việt Nam.
            </p>
          </div>
        </div>
        <div className="uppercase flex flex-col gap-5 font-bold text-4xl items-center text-center">
          <h1>Hệ thống cửa hàng của Devil May Cry</h1>
          <div className="grid grid-cols-5 gap-2">
            {store.map((item, index) => (
              <img
                key={index}
                src={item.img}
                className="object-cover object-center"
              />
            ))}
          </div>
          <p>
            THIẾT KẾ ĐỘC NHẤT, CHẾ TÁC THỦ CÔNG, MỖI TÁC PHẨM LÀ MỘT CÂU CHUYỆN
            RIÊNG BIỆT.
          </p>
          <h1 className="text-base font-medium">
            Hãy để phụ kiện là điểm nhấn cuối cùng cho outfit của bạn!
          </h1>
        </div>

        <div className="flex flex-col my-14 gap-5">
          <h1 className="uppercase font-bold text-3xl">More to explore</h1>
          <div className="grid grid-cols-3  gap-4 h-[400px]">
            {explore?.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/${item.path}`)}
                className=" rounded-xl group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-full">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.img}
                    alt=""
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>

                <div className="absolute inset-0 flex flex-col  items-start uppercase text-white justify-end px-9 text-center transition-all duration-500 mb-5">
                  <h1 className="font-dmserif text-xl font-bold ">
                    {item.name}
                  </h1>
                  <p className="mb-3 text-sm font-medium italic underline transition-opacity duration-300">
                    Shop now
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center flex justify-center items-center px-44 w-full  h-[200px] font-medium text-xl">
          <div className=" py-20">
            Tâm huyết với những chế tác được tạo ra từ đôi bàn tay thuần Việt,
            DMC mong muốn khẳng định giá trị của chúng với cộng đồng quốc tế,
            đưa mặt hàng vươn ra thế giới một cách mạnh mẽ và đầy tự hào.
          </div>
        </div>
      </div>
    </div>
  );
}
