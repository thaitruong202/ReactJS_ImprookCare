import React from 'react';

function TestPdf() {
  const downloadPDF = async () => {
    const response = await fetch('http://localhost:2024/IMPROOK_CARE/api/public/generate-pdf/', {
      method: 'POST',
    });

    if (response.ok) {
      const blob = await response.blob(); // Chuyển phản hồi thành Blob
      const url = window.URL.createObjectURL(blob); // Tạo URL từ Blob

      // Tạo liên kết ẩn để kích hoạt tải xuống
      const link = document.createElement('a');
      link.href = url;
      link.download = 'test.pdf'; // Tên tệp khi tải xuống
      document.body.appendChild(link);

      // Kích hoạt tải xuống
      link.click();

      // Xóa liên kết sau khi tải xuống để không làm rối DOM
      document.body.removeChild(link);

      // Giải phóng URL Blob để tránh rò rỉ bộ nhớ
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Failed to download PDF');
    }
  };

  return (
    <div style={{ marginTop: '10rem' }}>
      <button onClick={downloadPDF}>Tải PDF</button>
    </div>
  );
}

export default TestPdf;
