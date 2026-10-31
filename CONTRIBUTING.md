# Đóng góp cho Whisper Talk

Cảm ơn bạn đã ghé qua. Whisper Talk là blog tản văn cá nhân viết bằng Jekyll, chạy
tại [blog.tungdadev.com](https://blog.tungdadev.com). Mọi đóng góp đều được hoan
nghênh, nhất là những việc sau:

- Sửa lỗi chính tả, dấu câu, link hỏng trong bài viết.
- Sửa lỗi giao diện, hiển thị trên điện thoại, chế độ tối, khả năng truy cập.
- Cải thiện tốc độ tải trang, tìm kiếm, SEO.

Bài viết mới thì blog chỉ đăng bài của tác giả, nên pull request thêm bài sẽ không
được merge. Nếu bạn có ý tưởng hay câu chuyện muốn chia sẻ, mở một issue để trò chuyện nhé.

## Chạy thử ở máy

Cần Docker:

```bash
git clone https://github.com/bthanhtung/whisper-talk.git && cd whisper-talk
docker run --rm -it --platform linux/amd64 -p 4000:4000 \
  -v "$PWD":/srv/jekyll -v wt-bundle:/usr/local/bundle \
  jekyll/jekyll:4.2.2 sh -c "bundle install && bundle exec jekyll serve --host 0.0.0.0 --force_polling"
```

Mở http://localhost:4000.

## Trước khi mở pull request

- Trang build không lỗi và không có cảnh báo mới trong log Jekyll.
- Xem thử ở cả giao diện sáng và tối, trên màn hình rộng và trên điện thoại.
- Sửa bài viết thì giữ nguyên giọng văn và ý của tác giả. Chỉ sửa lỗi, không viết lại câu.
- Chụp màn hình trước và sau cho thay đổi giao diện.

## Quy ước

- Bài đặt ở `_posts/YYYY-MM-DD-slug.md`, front matter và giọng văn xem `VAN-PHONG.md`.
- `categories` chỉ dùng slug có trong `_data/categories.yml`.
- Ảnh bìa ở `assets/images/`, tỉ lệ 3:2, nén webp hoặc jpg trước khi thêm.
- Style nằm hết ở `assets/css/whisper.css` (biến màu ở `:root` và `[data-theme="dark"]`),
  script ở `assets/js/whisper.js`. Không thêm thư viện JavaScript nặng.
- Font tiêu đề phải đặt dấu tiếng Việt đúng; thử với "Ở đâu đó, người ta vẫn đợi" trước khi đổi font.

## Báo lỗi và đề xuất

Mở issue kèm đường dẫn trang, bạn đã làm gì, thấy gì, và thiết bị, trình duyệt đang dùng.
