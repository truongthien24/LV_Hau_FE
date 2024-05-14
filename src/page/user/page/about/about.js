import React from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "../../../../assets/icon";

const AboutItem = ({ data }) => {
  return (
    <div className="flex flex-col items-start">
      <h5 className="font-[600] mb-[7px]">{data?.title}</h5>
      <p>{data?.content}</p>
    </div>
  );
};

export const About = () => {
  const { t } = useTranslation();

  return (
    <div className="md:pt-[150px] pb-[20px] min-h-[calc(100vh_-_300px)] flex justify-center">
      <div className="w-[95%] xl:w-[90%] 2xl:w-[70%] px-[25px] py-[20px]">
        <h2 className="font-bold text-[20px] mb-[20px] lg:mb-[30px]">
          GIỚI THIỆU BLACK&CAT
        </h2>
        <div className="grid grid-cols-1 gap-[10px] lg:gap-[20px]">
          <AboutItem
            data={{
              title: "Nguồn nhân lực",
              content:
                "Kết hợp tuyển dụng nguồn nhân lực đầu vào có chất lượng và kế hoạch bồi dưỡng kiến thức, rèn luyện bổ sung các kỹ năng và chuẩn bị đội ngũ kế thừa theo hướng chính qui thông qua các lớp học ngắn hạn, dài hạn; các lớp bồi dưỡng CB-CNV được tổ chức trong nước cũng như ở nước ngoài đều được lãnh đạo FAHASA đặc biệt quan tâm và tạo điều kiện triển khai thực hiện. Chính vì thế, trình độ chuyên môn của đội ngũ CB-CNV ngày càng được nâng cao, đáp ứng nhu cầu ngày càng tăng của công việc cũng như sự phát triển của xã hội đang trên đường hội nhập.",
            }}
          />
          <AboutItem
            data={{
              title: "Về hàng hóa",
              content:
                "Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa – tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...  của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…",
            }}
          />
        </div>
      </div>
    </div>
  );
};
