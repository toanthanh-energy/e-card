document.addEventListener('DOMContentLoaded', () => {
    // --- Chức năng Lưu danh bạ (vCard) ---
    const saveContactBtn = document.getElementById('save-contact-btn');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', function() {
            const name = "Lê Thanh Hải";
            const phone = "+84981682535";
            const email = "thanhhai.name@gmail.com";
            const address = "3/37/2 Tổ 1 P. Cửa Nam, TP Nam Định";
            const website = "https://ECard.vn/";
            const company = "Lê Hải ECard";
            const title = "Sáng lập Danh thiếp eCard.vn";

            // Tạo nội dung file vCard
            const vCardContent = `BEGIN:VCARD
VERSION:3.0
FN:${name}
N:${name.split(' ').pop()};${name.split(' ').slice(0, -1).join(' ')};;;
TEL;TYPE=CELL:${phone}
EMAIL;TYPE=INTERNET:${email}
ADR;TYPE=WORK:;;${address}
ORG:${company}
TITLE:${title}
URL:${website}
END:VCARD`;

            // Tạo blob từ nội dung vCard
            const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            // Tạo một thẻ <a> ẩn để tải file
            const a = document.createElement('a');
            a.href = url;
            a.download = `${name.replace(/\s/g, '_')}.vcf`; // Tên file sẽ được tải xuống
            document.body.appendChild(a);
            a.click();

            // Dọn dẹp
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert('Đang tải tệp vCard để thêm vào danh bạ...');
        });
    }

    // --- Chức năng Chia sẻ (Web Share API) ---
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: document.title,
                        text: 'Đây là danh thiếp kỹ thuật số của Lê Thanh Hải. Rất tiện lợi!',
                        url: window.location.href // Chia sẻ URL hiện tại của trang
                    });
                    console.log('Chia sẻ thành công');
                } catch (error) {
                    console.error('Lỗi khi chia sẻ:', error);
                    // Fallback nếu có lỗi hoặc người dùng hủy
                    alert('Không thể chia sẻ. Vui lòng thử sao chép liên kết thủ công.');
                }
            } else {
                // Fallback cho trình duyệt không hỗ trợ Web Share API
                alert('Trình duyệt của bạn không hỗ trợ tính năng chia sẻ. Vui lòng sao chép liên kết thủ công:\n' + window.location.href);
                // Hoặc bạn có thể implement một modal chia sẻ tùy chỉnh tại đây
            }
        });
    }

    // --- Xử lý icon yêu thích (Star) ---
    const favoriteIcon = document.querySelector('.favorite-icon');
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', () => {
            // Đây là một ví dụ đơn giản, bạn có thể lưu trạng thái này vào Local Storage
            // hoặc gửi lên server nếu có backend.
            favoriteIcon.classList.toggle('active'); // Thêm/bỏ class 'active' để thay đổi màu hoặc trạng thái
            if (favoriteIcon.classList.contains('active')) {
                alert('Đã thêm vào mục yêu thích (chức năng giả định).');
            } else {
                alert('Đã xóa khỏi mục yêu thích (chức năng giả định).');
            }
        });
    }
});