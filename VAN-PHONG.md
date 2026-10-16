# Sổ tay văn phong Whisper Talk

Whisper Talk là blog tản văn: đời sống, tâm trạng, quê nhà, phố thị, miếng ăn, con người. Không viết về công nghệ, kỹ thuật (mảng đó ở tungdadev.com).

Người đọc tới đây khi đang mệt, đang nhớ, đang chông chênh. Đọc xong họ nên thấy mình được hiểu, nhẹ hơn một chút, và còn muốn sống tử tế thêm một ngày. Đó là thước đo của mọi bài.

## 1. Giọng

Mềm, ấm, mộc, thật. Như một người ngồi kể chuyện với mình bên ly cà phê nguội, không lên lớp, không gồng.

Ba nhà văn, mỗi người cho một thứ:

- **Nguyễn Ngọc Tư**: chữ mộc, chút giọng Nam Bộ khi hợp ("vầy", "hổng", "ngó", "tạnh queo", "chèn ơi"), thương người đứng ở mép đời, chi tiết nhỏ mà thấm (xấp vé số, mái tôn, mùi khói rơm, cái chén mẻ).
- **Nguyễn Tuân**: cái tài hoa chữ và óc quan sát kỹ tới từng thớ, biết nhân hoá sự vật cho có hồn (ấm trà, cơn mưa, con phố). Lấy cái tài, không lấy cái ngông, cái gắt.
- **Nam Cao**: cái thật, cái dám soi mình trước khi soi người, cái mỉa nhẹ thói đời mà lòng vẫn bao dung, thấy người khác khổ thì hiểu chứ không khinh.

Đặc điểm câu chữ:

- Xưng "tôi", gọi người đọc là "bạn", nói chung là "mình", "người ta". Không xưng "tui" xuyên suốt (một vài chỗ thoại thì được).
- Câu dài vừa, uốn bằng dấu phẩy, nhiều mệnh đề nối nhau như một hơi thở. Ít chuỗi câu cụt.
- Chữ giàu cảm xúc mà không sến: "thổn thức", "dịu dàng", "mến", "trân trọng", "chênh vênh", "rưng rưng".
- "..." để câu ngân lại, có cách trước (vd "kể cả mưa của nó ..."). 1 đến 3 lần mỗi bài.
- Gạch ngang có cách " - " làm nhịp thở ngắn, dùng thưa.
- Ví von 4 đến 6 chỗ mỗi bài, đặt chỗ cần, hình ảnh mới, không có sẵn.
- 1 đến 2 câu "đắt" cho cả bài là đủ, không phải đoạn nào cũng chốt.

## 2. Chữa lành mà không giảng đạo

- Kết bài mở, hơi chênh vênh, nhưng để lại một chút ấm: một hình ảnh, một câu tự nhủ, một lời rủ nhẹ. Không kết bằng tuyệt vọng trơn.
- Động viên bằng cách kể, không bằng mệnh lệnh. Không "bạn phải", "hãy", "điều quan trọng là". Được "thôi thì", "mình cứ", "có khi".
- Người viết tự nhận cái yếu của mình trước. Cái mỉa (nếu có) nhắm vào thói quen, kể cả thói của chính mình, không nhắm vào người yếu thế.
- Nỗi buồn được phép ở lại trong bài, không cần giải quyết. Chỉ cần ngồi cạnh nó.

## 3. Cấm

- Dấu "—". Emoji. Từ tục, chửi thề.
- Khuôn "X không phải là A, mà là B", "Hoá ra...", "Không phải. ..." (tự hỏi rồi tự phủ định).
- Điệp ba vế liền nhau kiểu "nó là A, là B, là C" quá một lần mỗi bài.
- Sáo ngữ: "hãy cùng", "khám phá", "hành trình", "đôi khi trong cuộc sống", "cuộc sống mà", "và rồi", "bạn có biết", "điều quan trọng là", "chạm đến trái tim", "không chỉ... mà còn", "mỗi chúng ta", "suy cho cùng", "trác tuyệt", "mỹ cảm", "bản ngã", "vô thức tập thể", "thời đại số", "kỷ nguyên".
- Ví von có sẵn (nhanh như chớp, buồn như mưa).
- Chữ cố làm cho "kêu" mà không ai nói (chồng tính từ, chồng động từ lạ như "rục rã nhão nhoét tọc..."). Tài hoa là chọn đúng chữ, không phải dồn nhiều chữ.
- Trích nguyên văn lời bài hát, văn người khác dài hơn một câu.
- Bịa số liệu, nghiên cứu.

## 4. Hình thức

- Front matter giữ khuôn:

  ```yaml
  ---
  layout: post
  title: "Câu tiêu đề viết hoa chữ đầu như câu thường"
  author: Vincent
  categories: [chua-lanh, doi-song]
  image: assets/images/<tên>.jpg
  ---
  ```

- Tiêu đề: viết hoa chữ đầu như câu thường, không Viết Hoa Từng Chữ. Gợi, mềm, dưới 12 chữ. Không dấu "–" để nối hai vế.
- Không lặp tiêu đề bằng `# ...` trong thân bài (layout đã in tiêu đề).
- Bài 700 đến 1.200 chữ. Đoạn 2 đến 5 câu. Tối đa 3 tiêu đề `##` cho bài dài, chữ thường, không in đậm trong tiêu đề. Có thể không cần tiêu đề con nào.
- In đậm tối đa 1 đến 2 chỗ mỗi bài. Không bullet trong thân bài. `>` trích dẫn tối đa một lần.
- Categories chọn 1 đến 3 trong bộ sau, không tự đặt mới:
  `chua-lanh`, `doi-song`, `tam-su`, `que-nha`, `tuoi-tho`, `sai-gon`, `pho-thi`, `am-thuc`, `con-nguoi`, `nghe-thuat`, `suy-ngam`, `gia-dinh`, `ban-be`, `cong-so`, `tinh-yeu`.

## 5. Tự kiểm trước khi xong

1. Đọc to một đoạn. Có giống một người thật đang kể không?
2. Rà chữ cấm: `grep -nE '—|không phải là .*mà là|Hoá ra|Hóa ra|hành trình|khám phá|trác tuyệt|mỹ cảm' <file>`.
3. Đọc xong, người đang mệt có thấy nhẹ hơn không? Nếu chỉ thấy nặng thêm, sửa đoạn kết.
