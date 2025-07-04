document.addEventListener('DOMContentLoaded', () => {
    // WeChat Popup Functionality
    const wechatBtn = document.getElementById('wechat-btn');
    const wechatPopup = document.getElementById('wechat-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    const downloadBtn = document.querySelector('.download-btn');
    const qrCodeImage = document.querySelector('.popup-content img');

    // Open WeChat popup when clicking the WeChat button
    wechatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        wechatPopup.style.display = 'flex';
    });

    // Close popup when clicking the close button
    closePopupBtn.addEventListener('click', () => {
        wechatPopup.style.display = 'none';
    });

    // Close popup when clicking outside
    wechatPopup.addEventListener('click', (e) => {
        if (e.target === wechatPopup) {
            wechatPopup.style.display = 'none';
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wechatPopup.style.display === 'flex') {
            wechatPopup.style.display = 'none';
        }
    });

    // Download QR Code image
    downloadBtn.addEventListener('click', async () => {
        try {
            // Get the image URL from the img element
            const imageUrl = qrCodeImage.src;
            
            // Fetch the image
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            
            // Create a blob URL
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Create temporary link and trigger download
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'wechat_qr_code.jpg';
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Không thể tải hình ảnh. Vui lòng thử lại sau.');
        }
    });

    // --- Chức năng Lưu danh bạ (vCard) ---
    const saveContactBtn = document.getElementById('save-contact-btn');
    if (saveContactBtn) {
        saveContactBtn.addEventListener('click', function() {
            const name = "Nguyen Minh Hai";
            const phone = "+84946660939";
            const email = "hainguyen@toanthanh.vn";
            const address = "87B Bui Thi Xuan Street, Pham Ngu Lao Ward, District 1, Ho Chi Minh City, Vietnam";
            const website = "https://toanthanh.vn/";
            const company = "TOAN THANH SOLAR ENERGY CO.,LTD";
            const title = "Chief Executive Officer (CEO)";

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
                        text: 'Đây là danh thiếp kỹ thuật số của Nguyen Minh Hai. Rất tiện lợi!',
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

