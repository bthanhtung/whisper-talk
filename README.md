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
