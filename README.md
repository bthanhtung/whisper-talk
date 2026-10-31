# Whisper Talk

Blog tản văn về đời sống, quê nhà, phố thị. Jekyll, deploy trên Vercel: https://blog.tungdadev.com

## Viết bài
- Bài mới đặt ở `_posts/YYYY-MM-DD-slug.md`. Front matter mẫu và giọng văn: xem `VAN-PHONG.md`.
- `categories` chỉ dùng slug có trong `_data/categories.yml` (tên hiển thị và mô tả lấy từ đó).
- Ảnh bìa để ở `assets/images/`, tỉ lệ 3:2 là đẹp nhất (thẻ bài cắt theo 3:2).
- `tags: [featured]` đưa bài vào mục "Người đọc hay quay lại" ở trang chủ.

## Chạy thử ở máy
```
docker run --rm -it --platform linux/amd64 -p 4000:4000 \
  -v "$PWD":/srv/jekyll -v wt-bundle:/usr/local/bundle \
  jekyll/jekyll:4.2.2 sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
```
Mở http://localhost:4000

## Giao diện
- `assets/css/whisper.css`: toàn bộ style, biến màu ở `:root` (sáng) và `[data-theme="dark"]` (tối).
- `assets/js/whisper.js`: tìm kiếm không dấu (phím `/`), đổi sáng/tối, cỡ chữ, thanh tiến độ đọc, mở bài ngẫu nhiên.
- Font: Noto Serif Display (tiêu đề), Literata (thân bài), Be Vietnam Pro (giao diện). Đừng đổi sang Playfair Display in nghiêng, font này đặt dấu tiếng Việt bị lệch.

## Đóng góp
Rất hoan nghênh: sửa lỗi chính tả, link hỏng, lỗi giao diện, hiển thị trên điện thoại, chế độ tối, tốc độ tải trang.
Đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết cách chạy thử và những điều cần giữ (giọng văn của bài, font có dấu
tiếng Việt chuẩn). Thấy gì chưa ổn thì [mở issue](https://github.com/bthanhtung/whisper-talk/issues/new/choose) nhé.
Vui lòng theo [Quy tắc ứng xử](CODE_OF_CONDUCT.md); vấn đề bảo mật báo riêng theo [SECURITY.md](SECURITY.md).

## Giấy phép
- Mã nguồn và giao diện (layout, CSS, JavaScript, cấu hình): [GNU GPL v3.0](LICENSE). Giao diện ban đầu dựa trên theme
  Mediumish của WowThemes.net, phần đó giữ giấy phép MIT gốc trong [LICENSES/MIT-mediumish.txt](LICENSES/MIT-mediumish.txt).
- Nội dung bài viết trong `_posts/` và ảnh trong `assets/images/` thuộc bản quyền tác giả. Muốn trích dẫn hay đăng lại,
  vui lòng ghi nguồn và dẫn link về bài gốc.
